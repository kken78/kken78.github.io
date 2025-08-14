(()=>{const BASE="/shinagawa";
  const toJson=(u)=>{let m=u.match(/^\/api\/reports\/([0-9a-f-]{36})\/?$/); if(m) return `${BASE}/api/reports/${m[1]}/index.json`;
    m=u.match(/^\/api\/reports\/([0-9a-f-]{36})\/(nodes|edges|graph|summary)\/?$/); if(m) return `${BASE}/api/reports/${m[1]}/${m[2]}.json`;
    if(u.startsWith("api/")) return toJson("/"+u); return u;};
  const orig=window.fetch; window.fetch=async function(i,init){let url=typeof i==="string"?i:i?.url||""; url=url.replace(/^https?:\/\/localhost:(?:3000|8000)/,""); 
    if(url.startsWith("/api/")||url.startsWith("api/")) url=toJson(url); return orig.call(this,url,init);};})();
