const API_KEY = process.env.LINEAR_API_KEY;
const TEAM = process.env.TEAM || Ktt;
const IDENT = process.env.IDENT || KTT-5;
const TITLE = process.env.TITLE || A;
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
  // Parse parent identifier
  const m = IDENT.match(/^(?<key>[A-Za-z]+)-(?<num>\d+)$/);
  if (!m) { console.error("Invalid identifier format"); process.exit(3); }
  const num = parseInt(m.groups.num, 10);
  // Find parent issue
  const issueQ = `query($tid: ID!, $num: Float!){ issues(first:1, filter:{ team:{ id:{ eq: $tid } }, number:{ eq: $num } }){ nodes{ id identifier } } }`;
  const issueRes = await gql(issueQ, { tid: team.id, num });
  if (issueRes.errors) { console.error("Issue fetch error", issueRes.errors); process.exit(4); }
  const parent = issueRes.data.issues.nodes[0];
  if (!parent) { console.error("Parent issue not found"); process.exit(5); }
  // Create sub-issue
  const createQ = `mutation($input: IssueCreateInput!){ issueCreate(input:$input){ success issue{ id identifier url } } }`;
  const createRes = await gql(createQ, { input: { title: TITLE, teamId: team.id, parentId: parent.id } });
  if (createRes.errors || !createRes.data.issueCreate.success) { console.error("Create error", createRes.errors||createRes); process.exit(6); }
  const child = createRes.data.issueCreate.issue;
  console.log(`${child.identifier} ${child.url}`);
})().catch(e => { console.error(e); process.exit(1) });
