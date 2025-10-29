const https=require("https");
const API_KEY=process.env.LINEAR_API_KEY;
if(!API_KEY){
  console.error("Missing LINEAR_API_KEY");
  process.exit(1);
}
const query=(q,variables)=>new Promise((resolve,reject)=>{
  const data=JSON.stringify({query:q,variables});
  const req=https.request("https://api.linear.app/graphql",{method:"POST",headers:{"Content-Type":"application/json","Authorization":API_KEY}},res=>{
    let body="";res.on("data",d=>body+=d);res.on("end",()=>{try{resolve(JSON.parse(body));}catch(e){reject(e);}});
  });
  req.on("error",reject);
  req.write(data);
  req.end();
});
(async()=>{
  const TEAM_NAME_OR_KEY=process.argv[2]||"Ktt";
  const teams=await query("query{teams(first:200){nodes{id name key}}}");
  if(teams.errors){console.error("Teams error",teams.errors);process.exit(1);}  
  const t=teams.data.teams.nodes.find(x=>x.name && x.name.toLowerCase()===TEAM_NAME_OR_KEY.toLowerCase()) || teams.data.teams.nodes.find(x=>x.key && x.key.toLowerCase()===TEAM_NAME_OR_KEY.toLowerCase());
  if(!t){console.error("Team not found");process.exit(2);}  
  const mutation="mutation($input: IssueCreateInput!){issueCreate(input:$input){success issue{id identifier url}}}";
  const res=await query(mutation,{input:{teamId:t.id,title:"Bug: checkout fails"}});
  if(res.errors){console.error("Create error",res.errors);process.exit(3);}  
  if(!res.data.issueCreate.success){console.error("Create failed",JSON.stringify(res));process.exit(3);}  
  console.log(res.data.issueCreate.issue.url);
})().catch(e=>{console.error(e);process.exit(1)});
