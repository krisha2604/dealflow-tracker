-- Fictional sample book for Dealflow Tracker.
-- Run supabase/schema.sql first. Safe to re-run: existing ids are left as they are.
-- Every company below is invented. Domains use the reserved .example TLD.

insert into public.startups (id, name, sector, stage, one_liner, website, location, created_at)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'Lumen Pantry',
    'Consumer',
    'Sourced',
    'Prepared meals portioned for night-shift workers, sold through hospital cafeterias.',
    'https://lumenpantry.example',
    'Austin, TX',
    '2026-11-18T15:00:00Z'
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Sable Route',
    'SaaS',
    'Sourced',
    'Scheduling and dispatch for specialty contractors who still run jobs out of a group text.',
    'https://sableroute.example',
    'Denver, CO',
    '2026-11-04T15:00:00Z'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'Northline',
    'Fintech',
    'Screening',
    'Treasury for creator businesses that get paid across five platforms and have no finance lead.',
    'https://northline.example',
    'New York, NY',
    '2026-10-22T15:00:00Z'
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    'Pinion Labs',
    'Deep tech',
    'Screening',
    'Formation equipment for solid-state battery pilot lines. Sells the tool, not the cell.',
    'https://pinionlabs.example',
    'Pittsburgh, PA',
    '2026-10-09T15:00:00Z'
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    'Harborline',
    'SaaS',
    'Diligence',
    'A shared inbox that turns charter-party email into a task list for ship brokers.',
    'https://harborline.example',
    'Seattle, WA',
    '2026-09-16T15:00:00Z'
  ),
  (
    '66666666-6666-4666-8666-666666666666',
    'Kindred Counter',
    'Consumer',
    'Diligence',
    'A neighborhood grocery membership. Members pay monthly, and the store buys against that commitment.',
    'https://kindredcounter.example',
    'Portland, OR',
    '2026-09-02T15:00:00Z'
  ),
  (
    '77777777-7777-4777-8777-777777777777',
    'Kepler Foundry',
    'Deep tech',
    'Term Sheet',
    'Compact equipment that lets regional hospitals produce medical isotopes on site.',
    'https://keplerfoundry.example',
    'Cambridge, UK',
    '2026-08-11T15:00:00Z'
  ),
  (
    '88888888-8888-4888-8888-888888888888',
    'Clearwater Books',
    'Fintech',
    'Term Sheet',
    'Multi-entity bookkeeping for holding companies and small family offices.',
    'https://clearwaterbooks.example',
    'London, UK',
    '2026-07-28T15:00:00Z'
  ),
  (
    '99999999-9999-4999-8999-999999999999',
    'Moss & Meter',
    'Consumer',
    'Passed',
    'Refillable skincare sold direct, with a handsome bottle and a subscription for the refill.',
    'https://mossandmeter.example',
    'Los Angeles, CA',
    '2026-06-19T15:00:00Z'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Atlas Relay',
    'SaaS',
    'Passed',
    'An internal wiki that drafts itself from Slack threads and design docs.',
    'https://atlasrelay.example',
    'San Francisco, CA',
    '2026-05-07T15:00:00Z'
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'Ledger & Loom',
    'Fintech',
    'Invested',
    'Invoice financing for independent clinics, underwritten against payer mix rather than a personal guarantee.',
    'https://ledgerandloom.example',
    'Chicago, IL',
    '2026-03-16T15:00:00Z'
  ),
  (
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'Brineworks',
    'Deep tech',
    'Invested',
    'Desalination membranes cast from kelp-derived polymers, aimed at small coastal plants.',
    'https://brineworks.example',
    'San Diego, CA',
    '2026-02-03T15:00:00Z'
  )
on conflict (id) do nothing;

insert into public.notes (id, startup_id, body, created_at)
values
  ('d1000003-0000-4000-8000-000000000003', '33333333-3333-4333-8333-333333333333', 'Screening memo. Founder was head of finance at a mid-size talent agency. Design partners include three management companies. Revenue is still a pilot fee.', '2026-10-23T18:00:00Z'),
  ('d1000002-0000-4000-8000-000000000002', '33333333-3333-4333-8333-333333333333', 'Asked for 90 days of transaction volume before we spend a full diligence day. She said the export is a week of work.', '2026-10-29T18:00:00Z'),
  ('d1000001-0000-4000-8000-000000000001', '33333333-3333-4333-8333-333333333333', 'Volume arrived. About $2.1M a month across 40 creators, and the take rate is not settled. Worth a second meeting, not a partner memo yet.', '2026-11-06T18:00:00Z'),
  ('d1000006-0000-4000-8000-000000000006', '44444444-4444-4444-8444-444444444444', 'Intro from a battery advisor. Two signed pilots with university labs, one verbal with an automotive supplier. The sales cycle is long on purpose.', '2026-10-10T18:00:00Z'),
  ('d1000005-0000-4000-8000-000000000005', '44444444-4444-4444-8444-444444444444', 'Demo was the machine, not a slide. Formation time on their coupon cells beat the lab baseline. We did not see a customer cell.', '2026-10-21T18:00:00Z'),
  ('d1000004-0000-4000-8000-000000000004', '44444444-4444-4444-8444-444444444444', 'Open question: is this a tool company or a science project with a purchase order? Ask for the pilot statement of work.', '2026-11-01T18:00:00Z'),
  ('d1000009-0000-4000-8000-000000000009', '55555555-5555-4555-8555-555555555555', 'Intro call with the COO. 40 brokers on a paid pilot, $18k ACV, annual contracts. The product is a shared inbox with maritime templates.', '2026-09-18T18:00:00Z'),
  ('d1000008-0000-4000-8000-000000000008', '55555555-5555-4555-8555-555555555555', 'Retention ask. Logo retention is 92% over two quarters. The sample is small, and several logos are friends of the founder.', '2026-10-02T18:00:00Z'),
  ('d1000007-0000-4000-8000-000000000007', '55555555-5555-4555-8555-555555555555', 'Reference call with a Piraeus broker was warm. The risk is a horizontal helpdesk shipping a maritime template. She had a clear answer and a feature they will not copy.', '2026-11-12T18:00:00Z'),
  ('d1000012-0000-4000-8000-000000000012', '66666666-6666-4666-8666-666666666666', 'Store walk in Portland. $79 a month, three stores, a fourth planned for spring. Shelves were full at 6pm, which is the point.', '2026-09-04T18:00:00Z'),
  ('d1000011-0000-4000-8000-000000000011', '66666666-6666-4666-8666-666666666666', 'Contribution margin turns positive at store two after month five. The founder was a buyer at a regional grocer.', '2026-09-25T18:00:00Z'),
  ('d1000010-0000-4000-8000-000000000010', '66666666-6666-4666-8666-666666666666', 'Concern for diligence: the expansion playbook is still the founder on the floor. We want a store-lead hiring plan before a partner meeting.', '2026-10-30T18:00:00Z'),
  ('d1000015-0000-4000-8000-000000000015', '77777777-7777-4777-8777-777777777777', 'Our technical advisor, a former radiochemist, says the target isotope yield is credible. The regulatory clock is the real schedule.', '2026-08-14T18:00:00Z'),
  ('d1000014-0000-4000-8000-000000000014', '77777777-7777-4777-8777-777777777777', 'Term sheet in circulation. $14M on a $56M post. The lead is leaving $3M for us if we want it.', '2026-09-09T18:00:00Z'),
  ('d1000013-0000-4000-8000-000000000013', '77777777-7777-4777-8777-777777777777', 'Counsel is reviewing the license path. Do not sign until we have a written view on the first hospital site.', '2026-11-08T18:00:00Z'),
  ('d1000018-0000-4000-8000-000000000018', '88888888-8888-4888-8888-888888888888', '22 customers, net revenue retention 128%. The founder previously sold a practice-management tool to a PE-backed rollup.', '2026-08-01T18:00:00Z'),
  ('d1000017-0000-4000-8000-000000000017', '88888888-8888-4888-8888-888888888888', 'The product replaces a stack of spreadsheets and a part-time controller. The demo was quiet and specific, which we liked.', '2026-09-20T18:00:00Z'),
  ('d1000016-0000-4000-8000-000000000016', '88888888-8888-4888-8888-888888888888', 'A London seed fund sent a term sheet at a price we can live with. Confirm the SOC 2 timeline before we countersign.', '2026-11-15T18:00:00Z'),
  ('d1000020-0000-4000-8000-000000000020', '99999999-9999-4999-8999-999999999999', 'Partner meeting. The brand is sharp. Refill attach was flat, and paid acquisition was doing the work.', '2026-06-20T18:00:00Z'),
  ('d1000019-0000-4000-8000-000000000019', '99999999-9999-4999-8999-999999999999', 'Passed. The founder took it well. Reopen if retail distribution shows up without a large ad budget.', '2026-06-27T18:00:00Z'),
  ('d1000022-0000-4000-8000-000000000022', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'The demo overlapped with three products already in market. The team is strong and the wedge is not.', '2026-05-09T18:00:00Z'),
  ('d1000021-0000-4000-8000-000000000021', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Passed. Revisit if they pick one vertical and show a retention number that is not a design-partner favor.', '2026-05-16T18:00:00Z'),
  ('d1000024-0000-4000-8000-000000000024', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'We led the seed. Default rate at close was the question, and they had twelve months of it.', '2026-03-20T18:00:00Z'),
  ('d1000023-0000-4000-8000-000000000023', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Board note: default rate 1.4%, originations up threefold year on year, hiring a head of credit. The pro-rata decision on the A is due in six weeks.', '2026-11-10T18:00:00Z'),
  ('d1000027-0000-4000-8000-000000000027', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Seed check. The membrane is the product. They are not building a plant.', '2026-02-10T18:00:00Z'),
  ('d1000026-0000-4000-8000-000000000026', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'The San Diego municipal pilot cut energy per cubic meter by 11% versus the incumbent membrane. Small sample, clean measurement.', '2026-08-19T18:00:00Z'),
  ('d1000025-0000-4000-8000-000000000025', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'The founder asked us to join a technical deep-dive with the utility. Send the advisor the data-room link this week.', '2026-11-20T18:00:00Z')
on conflict (id) do nothing;
