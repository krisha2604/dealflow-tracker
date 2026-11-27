import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import { summaryRequestSchema } from "@/lib/validation";

const DEFAULT_MODEL = "claude-sonnet-5-5";

export const dynamic = "force-dynamic";

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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Add ANTHROPIC_API_KEY on the server to generate summaries. The rest of the tracker still works.",
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

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL,
      max_tokens: 600,
      system: [
        "You prepare a three-bullet investment brief for a venture partnership.",
        "Use only the facts in the user message. Do not invent revenue, customers, or valuations.",
        "If the notes are empty, say so in the notes field.",
        'Reply with JSON only, no markdown: {"what":"...","notes":"...","next":"..."}',
        "what: one sentence on what the company does.",
        "notes: one sentence on the key points in the notes.",
        "next: one concrete suggested next step for the current stage.",
        "Keep each field under 40 words.",
      ].join(" "),
      messages: [
        {
          role: "user",
          content: [
            `Company: ${startup.name}`,
            `Sector: ${startup.sector ?? "Unknown"}`,
            `Stage: ${startup.stage}`,
            `Location: ${startup.location ?? "Unknown"}`,
            `Website: ${startup.website ?? "None"}`,
            `One-liner: ${startup.one_liner ?? "None"}`,
            "",
            "Notes:",
            noteBlock,
          ].join("\n"),
        },
      ],
    });

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();
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
          "The summary service did not respond. Check the API key and ANTHROPIC_MODEL, then try again.",
      },
      { status: 502 },
    );
  }
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
