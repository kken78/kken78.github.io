(()=>{const BASE="/shinagawa";
  const orig=window.fetch;
  window.fetch=async function(input, init){
    let url=typeof input==="string"?input:input?.url||"";
    // localhost:8000 → /shinagawa
    url=url.replace(/^https?:\/\/localhost:8000/,"");
    // ルート直下の /api/... → /shinagawa/api/...
    if(url.startsWith("/api/")) url=BASE+url;
    // 相対 api/... もケア
    if(url.startsWith("api/")) url=BASE+"/"+url;
    return orig.call(this, url, init);
  };
})();
