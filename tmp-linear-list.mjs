const API_KEY = process.env.LINEAR_API_KEY;
const TEAM = process.env.TEAM;
const LABEL = process.env.LABEL;
if (!API_KEY) { console.error("Missing LINEAR_API_KEY"); process.exit(1); }
if (!TEAM) { console.error("Missing TEAM env var"); process.exit(1); }
if (!LABEL) { console.error("Missing LABEL env var"); process.exit(1); }
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
  const teams = await gql("query{teams(first:200){nodes{id name key}}}");
  if (teams.errors) { console.error("Teams error", teams.errors); process.exit(1); }
  const t = teams.data.teams.nodes.find(x => x.name?.toLowerCase() === TEAM.toLowerCase()) || teams.data.teams.nodes.find(x => x.key?.toLowerCase() === TEAM.toLowerCase());
  if (!t) { console.error("Team not found"); process.exit(2); }
  const q = `query($teamId: ID!, $label: String!){
    issues(first: 50,
      filter:{
        team:{ id:{ eq: $teamId }},
        labels:{ some:{ name:{ eq: $label } }},
        completedAt:{ null: true },
        canceledAt:{ null: true }
      }
    ){
      nodes{ identifier title url priority priorityLabel state{ name type } assignee{ name } }
    }
  }`;
  const res = await gql(q, { teamId: t.id, label: LABEL });
  if (res.errors) { console.error("Issues error", res.errors); process.exit(3); }
  const items = res.data.issues.nodes;
  if (items.length === 0) { console.log("No matching issues."); return; }
  items.sort((a,b)=> (b.priority??0) - (a.priority??0));
  for (const it of items) {
    const ass = it.assignee?.name || "Unassigned";
    console.log(`${it.identifier} [${it.priorityLabel||it.priority}] - ${it.state.name} - ${ass} - ${it.title} - ${it.url}`);
  }
})().catch(e => { console.error(e); process.exit(1) });
