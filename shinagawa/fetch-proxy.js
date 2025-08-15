(()=>{const BASE="/shinagawa"; const TIMEOUT=6000;

/** URL から /shinagawa/api/...*.json に張り替え */
const toJson=(u)=>{
  let m=u.match(/^\/api\/reports\/([0-9a-f-]{36})\/?$/i);
  if(m) return `${BASE}/api/reports/${m[1]}/index.json`;
  m=u.match(/^\/api\/reports\/([0-9a-f-]{36})\/(nodes|edges|graph|summary)\/?$/i);
  if(m) return `${BASE}/api/reports/${m[1]}/${m[2]}.json`;
  if(u.startsWith("api/")) return toJson("/"+u);
  return null;
};

/** 代替データ（最低限で落ちない形） */
const FALLBACK={
  index:{ id:"$UUID$", title:"レポート", createdAt:new Date().toISOString(), summaryAvailable:true, graphAvailable:true },
  nodes:[ {id:"A",label:"ノードA",count:1,group:"topic"} ],
  edges:[ ],
  graph:{ nodes:[ {id:"A",label:"ノードA",count:1,group:"topic"} ], edges:[] },
  summary:{ summary:"データ取得に失敗したため暫定表示です。" }
};

/** タイムアウト付き fetch */
const fetchWithTimeout=(url,init)=>Promise.race([
  fetch(url,init),
  new Promise((resolve)=>setTimeout(()=>resolve(new Response(null,{status:599})), TIMEOUT))
]);

const orig=window.fetch;
window.fetch=async function(input, init){
  try{
    let url=typeof input==="string"?input:input?.url||"";
    url=url.replace(/^https?:\/\/localhost:(?:3000|8000)/,""); // ローカル表記を相対化
    const mapped=toJson(url);
    if(!mapped) return orig.call(this,input,init);

    const res=await fetchWithTimeout(mapped, init);
    if(res && res.ok) return res;

    // フォールバックを返す（エンドポイントに応じて）
    let body=null;
    if(/\/index\.json$/.test(mapped)) body=FALLBACK.index;
    else if(/\/nodes\.json$/.test(mapped)) body=FALLBACK.nodes;
    else if(/\/edges\.json$/.test(mapped)) body=FALLBACK.edges;
    else if(/\/graph\.json$/.test(mapped)) body=FALLBACK.graph;
    else if(/\/summary\.json$/.test(mapped)) body=FALLBACK.summary;

    if(body!=null){
      const txt=JSON.stringify(body);
      return new Response(txt,{status:200, headers:{'Content-Type':'application/json'}});
    }
    return res; // それ以外はそのまま返す
  }catch(e){
    // 万一の例外でもページを固めない
    return new Response(JSON.stringify(FALLBACK.index),{status:200, headers:{'Content-Type':'application/json'}});
  }
};
})();
