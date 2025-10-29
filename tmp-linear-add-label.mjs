const API_KEY = process.env.LINEAR_API_KEY;
const TEAM = process.env.TEAM || Ktt;
const IDENT = process.env.IDENT || KTT-5;
const LABEL_NAME = process.env.LABEL || checkout;
if (!API_KEY) { console.error("Missing LINEAR_API_KEY"); process.exit(1); }
const gql = async (q, variables) => {
  const res = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": API_KEY },
    body: JSON.stringify({ query: q, variables })
  });
  const json = await res.json();
  return json;
}
(async () => {
  // Resolve team
  const teams = await gql("query{teams(first:200){nodes{id name key}}}");
  if (teams.errors) { console.error("Teams error", teams.errors); process.exit(1); }
  const team = teams.data.teams.nodes.find(x => x.name?.toLowerCase() === TEAM.toLowerCase()) || teams.data.teams.nodes.find(x => x.key?.toLowerCase() === TEAM.toLowerCase());
  if (!team) { console.error("Team not found"); process.exit(2); }

  // Ensure label exists (team-scoped)
  const labelsQ = `query($tid: ID!){ issueLabels(first:200, filter:{ team:{ id:{ eq: $tid } } }){ nodes{ id name } } }`;
  const labelsRes = await gql(labelsQ, { tid: team.id });
  if (labelsRes.errors) { console.error("Labels error", labelsRes.errors); process.exit(3); }
  let label = labelsRes.data.issueLabels.nodes.find(l => l.name?.toLowerCase() === LABEL_NAME.toLowerCase());
  if (!label) {
    const createQ = `mutation($input: IssueLabelCreateInput!){ issueLabelCreate(input:$input){ success issueLabel{ id name } } }`;
    const createRes = await gql(createQ, { input: { name: LABEL_NAME, teamId: team.id, color: "#6b7280" } });
    if (createRes.errors || !createRes.data.issueLabelCreate.success) { console.error("Label create error", createRes.errors||createRes); process.exit(4); }
    label = createRes.data.issueLabelCreate.issueLabel;
  }

  // Parse identifier (e.g., KTT-5)
  const m = IDENT.match(/^(?<key>[A-Za-z]+)-(?<num>\d+)$/);
  if (!m) { console.error("Invalid identifier format"); process.exit(5); }
  const num = parseInt(m.groups.num, 10);

  // Find issue by team + number
  const issueQ = `query($tid: ID!, $num: Float!){ issues(first:1, filter:{ team:{ id:{ eq: $tid } }, number:{ eq: $num } }){ nodes{ id identifier labels{ nodes{ id name } } } } }`;
  const issueRes = await gql(issueQ, { tid: team.id, num });
  if (issueRes.errors) { console.error("Issue fetch error", issueRes.errors); process.exit(6); }
  const issue = issueRes.data.issues.nodes[0];
  if (!issue) { console.error("Issue not found"); process.exit(7); }

  // Update labels
  const currentIds = new Set((issue.labels?.nodes||[]).map(l=>l.id));
  currentIds.add(label.id);
  const labelIds = Array.from(currentIds);
  const updQ = `mutation($id: ID!, $input: IssueUpdateInput!){ issueUpdate(id:$id, input:$input){ success issue{ id identifier labels{ nodes{ name } } } } }`;
  const updRes = await gql(updQ, { id: issue.id, input: { labelIds } });
  if (updRes.errors || !updRes.data.issueUpdate.success) { console.error("Issue update error", updRes.errors||updRes); process.exit(8); }
  console.log(`Updated ${updRes.data.issueUpdate.issue.identifier} labels: ${updRes.data.issueUpdate.issue.labels.nodes.map(l=>l.name).join(,
