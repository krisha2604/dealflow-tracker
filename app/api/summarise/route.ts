import { NextResponse } from "next/server";

import { summaryRequestSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const parsed = summaryRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Send the startup details and its notes." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Add GEMINI_API_KEY on the server to generate summaries. The rest of the tracker still works.",
      },
      { status: 503 },
    );
  }

  const { startup, notes } = parsed.data;
  const noteBlock =
    notes.length === 0
      ? "No notes have been logged."
      : notes
          .map((note, index) => `${index + 1}. (${note.created_at}) ${note.body}`)
          .join("\n");

  const systemPrompt = [
    "You prepare a three-bullet investment brief for a venture partnership.",
    "Use only the facts in the user message. Do not invent revenue, customers, or valuations.",
    "If the notes are empty, say so in the notes field.",
    'Reply with JSON only, no markdown: {"what":"...","notes":"...","next":"..."}',
    "what: one sentence on what the company does.",
    "notes: one sentence on the key points in the notes.",
    "next: one concrete suggested next step for the current stage.",
    "Keep each field under 40 words.",
  ].join(" ");

  const userPrompt = [
    `Company: ${startup.name}`,
    `Sector: ${startup.sector ?? "Unknown"}`,
    `Stage: ${startup.stage}`,
    `Location: ${startup.location ?? "Unknown"}`,
    `Website: ${startup.website ?? "None"}`,
    `One-liner: ${startup.one_liner ?? "None"}`,
    "",
    "Notes:",
    noteBlock,
  ].join("\n");

  try {
    const models = await listUsableModels(apiKey);
    if (models.length === 0) {
      return NextResponse.json(
        {
          error:
            "No Gemini model is available for this key right now. Check GEMINI_API_KEY.",
        },
        { status: 502 },
      );
    }

    const text = await generateWithFallback(
      apiKey,
      models,
      systemPrompt,
      userPrompt,
    );

    if (text === null) {
      return NextResponse.json(
        {
          error:
            "The summary service is busy right now. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    const summary = parseBrief(text);
    if (!summary) {
      return NextResponse.json(
        { error: "The model returned an unexpected format. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("summarise failed", error);
    return NextResponse.json(
      {
        error:
          "The summary service did not respond. Check GEMINI_API_KEY, then try again.",
      },
      { status: 502 },
    );
  }
}

// Models that returned "no quota" or "not found" are remembered so later
// requests skip them. Resets whenever the server restarts.
const skippedModels = new Set<string>();
let cachedModels: string[] = [];

// Asks Google which text models this key can call, so no name is hardcoded.
// Prefers non-lite "flash" models, newest first, then lite ones.
async function listUsableModels(apiKey: string): Promise<string[]> {
  if (cachedModels.length === 0) {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models?pageSize=200",
      {
        headers: { "x-goog-api-key": apiKey },
        signal: AbortSignal.timeout(6000),
      },
    );

    if (!response.ok) {
      console.error(
        "list models failed",
        response.status,
        await response.text(),
      );
      return [];
    }

    const data = (await response.json()) as {
      models?: { name?: string; supportedGenerationMethods?: string[] }[];
    };

    const names = (data.models ?? [])
      .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => (m.name ?? "").replace(/^models\//, ""))
      .filter((name) => name.includes("flash") || name.includes("lite"))
      .filter(
        (name) =>
          !/image|tts|audio|live|embedding|robotics|computer|learnlm|gemma|vision|imagen|veo/.test(
            name,
          ),
      );

    const score = (name: string) =>
      (name.includes("lite") ? 2 : 0) + (name.includes("latest") ? 0 : 1);

    names.sort((a, b) => {
      const diff = score(a) - score(b);
      if (diff !== 0) return diff;
      return b.localeCompare(a, undefined, { numeric: true });
    });

    cachedModels = names;
  }

  return cachedModels.filter((name) => !skippedModels.has(name)).slice(0, 8);
}

// Tries models in order until one answers. A 503 (busy) gets one quick retry.
// A 429 (no quota), 404 or any other error skips to the next model at once.
async function generateWithFallback(
  apiKey: string,
  models: string[],
  systemPrompt: string,
  userPrompt: string,
): Promise<string | null> {
  const deadline = Date.now() + 55000;

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      if (Date.now() > deadline) return null;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemPrompt }] },
              contents: [{ role: "user", parts: [{ text: userPrompt }] }],
              generationConfig: {
                maxOutputTokens: 2000,
                responseMimeType: "application/json",
              },
            }),
            signal: AbortSignal.timeout(25000),
          },
        );

        if (response.ok) {
          const data = (await response.json()) as {
            candidates?: { content?: { parts?: { text?: string }[] } }[];
          };
          const text = (data.candidates?.[0]?.content?.parts ?? [])
            .map((part) => part.text ?? "")
            .join("\n")
            .trim();
          console.log("gemini ok", model);
          return text;
        }

        const detail = await response.text();
        console.error("gemini failed", model, response.status, detail.slice(0, 300));

        if (response.status === 503 && attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          continue;
        }

        if (response.status === 429 || response.status === 404) {
          skippedModels.add(model);
        }
        break;
      } catch (error) {
        console.error("gemini request error", model, error);
        break;
      }
    }
  }
  return null;
}

function parseBrief(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced?.[1]?.trim() ?? text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    const value = JSON.parse(candidate.slice(start, end + 1)) as {
      what?: unknown;
      notes?: unknown;
      next?: unknown;
    };
    if (
      typeof value.what !== "string" ||
      typeof value.notes !== "string" ||
      typeof value.next !== "string"
    ) {
      return null;
    }
    return {
      what: value.what.trim(),
      notes: value.notes.trim(),
      next: value.next.trim(),
    };
  } catch {
    return null;
  }
}
