(()=>{const BASE="/shinagawa";
  const toJson=(u)=>{
    // 例: /api/reports/<uuid> → /shinagawa/api/reports/<uuid>/index.json
    let m=u.match(/^\/api\/reports\/([0-9a-f-]{36})\/?$/);
    if(m) return `${BASE}/api/reports/${m[1]}/index.json`;
    // 例: /api/reports/<uuid>/(nodes|edges|graph|summary) → それぞれの json
    m=u.match(/^\/api\/reports\/([0-9a-f-]{36})\/(nodes|edges|graph|summary)\/?$/);
    if(m) return `${BASE}/api/reports/${m[1]}/${m[2]}.json`;
    // 相対 api/... もケア
    if(u.startsWith("api/")) return toJson("/"+u);
    return u;
  };
  const orig=window.fetch;
  window.fetch=async function(input, init){
    let url=typeof input==="string"?input:input?.url||"";
    url=url.replace(/^https?:\/\/localhost:(?:3000|8000)/,""); // localhost除去
    if(url.startsWith("/api/")||url.startsWith("api/")) url=toJson(url);
    return orig.call(this, url, init);
  };
})();
