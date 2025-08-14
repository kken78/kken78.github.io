(()=>{const BASE="/shinagawa";
  const toJson = (u)=>{
    // /api/reports/<uuid> → /shinagawa/api/reports/<uuid>/index.json
    let m = u.match(/^\/api\/reports\/([0-9a-f-]{36})\/?$/);
    if(m) return `${BASE}/api/reports/${m[1]}/index.json`;

    // /api/reports/<uuid>/(nodes|edges|graph|summary) → .../<name>.json
    m = u.match(/^\/api\/reports\/([0-9a-f-]{36})\/(nodes|edges|graph|summary)\/?$/);
    if(m) return `${BASE}/api/reports/${m[1]}/${m[2]}.json`;

    // 相対 "api/..." もケア
    if(u.startsWith("api/")) return toJson("/"+u);

    // 何もしない
    return u;
  };

  const orig=window.fetch;
  window.fetch=async function(input, init){
    let url=typeof input==="string"?input:input?.url||"";
    // localhost を排除して /api/ に寄せる
    url=url.replace(/^https?:\/\/localhost:(?:3000|8000)/,"");
    if(url.startsWith("/api/") || url.startsWith("api/")){
      url = toJson(url);
    }
    return orig.call(this, url, init);
  };
})();
