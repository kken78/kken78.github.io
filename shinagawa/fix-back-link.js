(()=>{const DEST="/shinagawa/";
  const fix=()=>{
    // テキストが「一覧へ戻る」の a / button を探す
    const cand=[...document.querySelectorAll('a,button')].filter(el=>{
      const t=(el.textContent||"").trim();
      return t.includes("一覧へ戻る") || t.includes("一覧") || t.includes("戻る");
    });
    cand.forEach(el=>{
      if(el.tagName==="A"){
        el.setAttribute("href", DEST);
        el.removeAttribute("target");
        el.addEventListener("click", e=>{ e.preventDefault(); location.assign(DEST); }, {capture:true,once:false});
      }else{
        el.addEventListener("click", e=>{ e.preventDefault(); location.assign(DEST); }, {capture:true,once:false});
      }
    });
  };
  fix();
  const mo=new MutationObserver(()=>fix());
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();
