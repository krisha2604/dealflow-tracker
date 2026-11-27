import type { Note, Startup } from "@/lib/types";

/**
 * Fictional sample book used only when Supabase env vars are missing.
 * Keep it aligned with supabase/seed.sql.
 */
export const demoStartups: Startup[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Lumen Pantry",
    sector: "Consumer",
    stage: "Sourced",
    one_liner:
      "Prepared meals portioned for night-shift workers, sold through hospital cafeterias.",
    website: "https://lumenpantry.example",
    location: "Austin, TX",
    created_at: "2026-11-18T15:00:00.000Z",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Sable Route",
    sector: "SaaS",
    stage: "Sourced",
    one_liner:
      "Scheduling and dispatch for specialty contractors who still run jobs out of a group text.",
    website: "https://sableroute.example",
    location: "Denver, CO",
    created_at: "2026-11-04T15:00:00.000Z",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Northline",
    sector: "Fintech",
    stage: "Screening",
    one_liner:
      "Treasury for creator businesses that get paid across five platforms and have no finance lead.",
    website: "https://northline.example",
    location: "New York, NY",
    created_at: "2026-10-22T15:00:00.000Z",
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    name: "Pinion Labs",
    sector: "Deep tech",
    stage: "Screening",
    one_liner:
      "Formation equipment for solid-state battery pilot lines. Sells the tool, not the cell.",
    website: "https://pinionlabs.example",
    location: "Pittsburgh, PA",
    created_at: "2026-10-09T15:00:00.000Z",
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    name: "Harborline",
    sector: "SaaS",
    stage: "Diligence",
    one_liner:
      "A shared inbox that turns charter-party email into a task list for ship brokers.",
    website: "https://harborline.example",
    location: "Seattle, WA",
    created_at: "2026-09-16T15:00:00.000Z",
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    name: "Kindred Counter",
    sector: "Consumer",
    stage: "Diligence",
    one_liner:
      "A neighborhood grocery membership. Members pay monthly, and the store buys against that commitment.",
    website: "https://kindredcounter.example",
    location: "Portland, OR",
    created_at: "2026-09-02T15:00:00.000Z",
  },
  {
    id: "77777777-7777-4777-8777-777777777777",
    name: "Kepler Foundry",
    sector: "Deep tech",
    stage: "Term Sheet",
    one_liner:
      "Compact equipment that lets regional hospitals produce medical isotopes on site.",
    website: "https://keplerfoundry.example",
    location: "Cambridge, UK",
    created_at: "2026-08-11T15:00:00.000Z",
  },
  {
    id: "88888888-8888-4888-8888-888888888888",
    name: "Clearwater Books",
    sector: "Fintech",
    stage: "Term Sheet",
    one_liner:
      "Multi-entity bookkeeping for holding companies and small family offices.",
    website: "https://clearwaterbooks.example",
    location: "London, UK",
    created_at: "2026-07-28T15:00:00.000Z",
  },
  {
    id: "99999999-9999-4999-8999-999999999999",
    name: "Moss & Meter",
    sector: "Consumer",
    stage: "Passed",
    one_liner:
      "Refillable skincare sold direct, with a handsome bottle and a subscription for the refill.",
    website: "https://mossandmeter.example",
    location: "Los Angeles, CA",
    created_at: "2026-06-19T15:00:00.000Z",
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    name: "Atlas Relay",
    sector: "SaaS",
    stage: "Passed",
    one_liner:
      "An internal wiki that drafts itself from Slack threads and design docs.",
    website: "https://atlasrelay.example",
    location: "San Francisco, CA",
    created_at: "2026-05-07T15:00:00.000Z",
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    name: "Ledger & Loom",
    sector: "Fintech",
    stage: "Invested",
    one_liner:
      "Invoice financing for independent clinics, underwritten against payer mix rather than a personal guarantee.",
    website: "https://ledgerandloom.example",
    location: "Chicago, IL",
    created_at: "2026-03-16T15:00:00.000Z",
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    name: "Brineworks",
    sector: "Deep tech",
    stage: "Invested",
    one_liner:
      "Desalination membranes cast from kelp-derived polymers, aimed at small coastal plants.",
    website: "https://brineworks.example",
    location: "San Diego, CA",
    created_at: "2026-02-03T15:00:00.000Z",
  },
];

export const demoNotes: Note[] = [
  note(
    "33333333-3333-4333-8333-333333333333",
    "d1000001-0000-4000-8000-000000000001",
    "2026-11-06T18:00:00.000Z",
    "Volume arrived. About $2.1M a month across 40 creators, and the take rate is not settled. Worth a second meeting, not a partner memo yet.",
  ),
  note(
    "33333333-3333-4333-8333-333333333333",
    "d1000002-0000-4000-8000-000000000002",
    "2026-10-29T18:00:00.000Z",
    "Asked for 90 days of transaction volume before we spend a full diligence day. She said the export is a week of work.",
  ),
  note(
    "33333333-3333-4333-8333-333333333333",
    "d1000003-0000-4000-8000-000000000003",
    "2026-10-23T18:00:00.000Z",
    "Screening memo. Founder was head of finance at a mid-size talent agency. Design partners include three management companies. Revenue is still a pilot fee.",
  ),
  note(
    "44444444-4444-4444-8444-444444444444",
    "d1000004-0000-4000-8000-000000000004",
    "2026-11-01T18:00:00.000Z",
    "Open question: is this a tool company or a science project with a purchase order? Ask for the pilot statement of work.",
  ),
  note(
    "44444444-4444-4444-8444-444444444444",
    "d1000005-0000-4000-8000-000000000005",
    "2026-10-21T18:00:00.000Z",
    "Demo was the machine, not a slide. Formation time on their coupon cells beat the lab baseline. We did not see a customer cell.",
  ),
  note(
    "44444444-4444-4444-8444-444444444444",
    "d1000006-0000-4000-8000-000000000006",
    "2026-10-10T18:00:00.000Z",
    "Intro from a battery advisor. Two signed pilots with university labs, one verbal with an automotive supplier. The sales cycle is long on purpose.",
  ),
  note(
    "55555555-5555-4555-8555-555555555555",
    "d1000007-0000-4000-8000-000000000007",
    "2026-11-12T18:00:00.000Z",
    "Reference call with a Piraeus broker was warm. The risk is a horizontal helpdesk shipping a maritime template. She had a clear answer and a feature they will not copy.",
  ),
  note(
    "55555555-5555-4555-8555-555555555555",
    "d1000008-0000-4000-8000-000000000008",
    "2026-10-02T18:00:00.000Z",
    "Retention ask. Logo retention is 92% over two quarters. The sample is small, and several logos are friends of the founder.",
  ),
  note(
    "55555555-5555-4555-8555-555555555555",
    "d1000009-0000-4000-8000-000000000009",
    "2026-09-18T18:00:00.000Z",
    "Intro call with the COO. 40 brokers on a paid pilot, $18k ACV, annual contracts. The product is a shared inbox with maritime templates.",
  ),
  note(
    "66666666-6666-4666-8666-666666666666",
    "d1000010-0000-4000-8000-000000000010",
    "2026-10-30T18:00:00.000Z",
    "Concern for diligence: the expansion playbook is still the founder on the floor. We want a store-lead hiring plan before a partner meeting.",
  ),
  note(
    "66666666-6666-4666-8666-666666666666",
    "d1000011-0000-4000-8000-000000000011",
    "2026-09-25T18:00:00.000Z",
    "Contribution margin turns positive at store two after month five. The founder was a buyer at a regional grocer.",
  ),
  note(
    "66666666-6666-4666-8666-666666666666",
    "d1000012-0000-4000-8000-000000000012",
    "2026-09-04T18:00:00.000Z",
    "Store walk in Portland. $79 a month, three stores, a fourth planned for spring. Shelves were full at 6pm, which is the point.",
  ),
  note(
    "77777777-7777-4777-8777-777777777777",
    "d1000013-0000-4000-8000-000000000013",
    "2026-11-08T18:00:00.000Z",
    "Counsel is reviewing the license path. Do not sign until we have a written view on the first hospital site.",
  ),
  note(
    "77777777-7777-4777-8777-777777777777",
    "d1000014-0000-4000-8000-000000000014",
    "2026-09-09T18:00:00.000Z",
    "Term sheet in circulation. $14M on a $56M post. The lead is leaving $3M for us if we want it.",
  ),
  note(
    "77777777-7777-4777-8777-777777777777",
    "d1000015-0000-4000-8000-000000000015",
    "2026-08-14T18:00:00.000Z",
    "Our technical advisor, a former radiochemist, says the target isotope yield is credible. The regulatory clock is the real schedule.",
  ),
  note(
    "88888888-8888-4888-8888-888888888888",
    "d1000016-0000-4000-8000-000000000016",
    "2026-11-15T18:00:00.000Z",
    "A London seed fund sent a term sheet at a price we can live with. Confirm the SOC 2 timeline before we countersign.",
  ),
  note(
    "88888888-8888-4888-8888-888888888888",
    "d1000017-0000-4000-8000-000000000017",
    "2026-09-20T18:00:00.000Z",
    "The product replaces a stack of spreadsheets and a part-time controller. The demo was quiet and specific, which we liked.",
  ),
  note(
    "88888888-8888-4888-8888-888888888888",
    "d1000018-0000-4000-8000-000000000018",
    "2026-08-01T18:00:00.000Z",
    "22 customers, net revenue retention 128%. The founder previously sold a practice-management tool to a PE-backed rollup.",
  ),
  note(
    "99999999-9999-4999-8999-999999999999",
    "d1000019-0000-4000-8000-000000000019",
    "2026-06-27T18:00:00.000Z",
    "Passed. The founder took it well. Reopen if retail distribution shows up without a large ad budget.",
  ),
  note(
    "99999999-9999-4999-8999-999999999999",
    "d1000020-0000-4000-8000-000000000020",
    "2026-06-20T18:00:00.000Z",
    "Partner meeting. The brand is sharp. Refill attach was flat, and paid acquisition was doing the work.",
  ),
  note(
    "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    "d1000021-0000-4000-8000-000000000021",
    "2026-05-16T18:00:00.000Z",
    "Passed. Revisit if they pick one vertical and show a retention number that is not a design-partner favor.",
  ),
  note(
    "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    "d1000022-0000-4000-8000-000000000022",
    "2026-05-09T18:00:00.000Z",
    "The demo overlapped with three products already in market. The team is strong and the wedge is not.",
  ),
  note(
    "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    "d1000023-0000-4000-8000-000000000023",
    "2026-11-10T18:00:00.000Z",
    "Board note: default rate 1.4%, originations up threefold year on year, hiring a head of credit. The pro-rata decision on the A is due in six weeks.",
  ),
  note(
    "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    "d1000024-0000-4000-8000-000000000024",
    "2026-03-20T18:00:00.000Z",
    "We led the seed. Default rate at close was the question, and they had twelve months of it.",
  ),
  note(
    "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    "d1000025-0000-4000-8000-000000000025",
    "2026-11-20T18:00:00.000Z",
    "The founder asked us to join a technical deep-dive with the utility. Send the advisor the data-room link this week.",
  ),
  note(
    "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    "d1000026-0000-4000-8000-000000000026",
    "2026-08-19T18:00:00.000Z",
    "The San Diego municipal pilot cut energy per cubic meter by 11% versus the incumbent membrane. Small sample, clean measurement.",
  ),
  note(
    "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    "d1000027-0000-4000-8000-000000000027",
    "2026-02-10T18:00:00.000Z",
    "Seed check. The membrane is the product. They are not building a plant.",
  ),
];

function note(
  startupId: string,
  id: string,
  createdAt: string,
  body: string,
): Note {
  return {
    id,
    startup_id: startupId,
    body,
    created_at: createdAt,
  };
}
