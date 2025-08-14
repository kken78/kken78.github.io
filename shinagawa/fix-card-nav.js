(()=>{const BASE="/shinagawa/";
  const uuidRe=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/i;

  // a[href] を見つけて /shinagawa/<uuid>/ へ正規化
  const normalize = (href)=>{
    if(!href) return null;
    // 絶対URLは同一オリジンだけ許容
    try{ const u=new URL(href, location.origin); href=u.pathname; }catch{}
    // /<uuid> → /shinagawa/<uuid>/
    if(/^\/[0-9a-f-]{36}\/?$/.test(href)){
      const id=href.replace(/^\/|\/$/g,"");
      return BASE+id+"/";
    }
    // ./<uuid> or <uuid> → /shinagawa/<uuid>/
    const just=href.replace(/^\.?\//,"");
    if(uuidRe.test(just)) return BASE+just.replace(/\/?$/,"/");

    // すでに /shinagawa/... なら末尾スラだけ保証
    if(href.startsWith(BASE)) return href.endsWith("/")?href:href+"/";
    return null;
  };

  // 左クリックを強制遷移させる（他のJSがpreventしても勝つ）
  document.addEventListener("click",(ev)=>{
    if(ev.defaultPrevented){} // されていても後で握りつぶす
    // 修飾キー/中クリックは尊重
    if(ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey||ev.button!==0) return;
    const a=ev.target.closest && ev.target.closest("a[href]");
    if(!a) return;
    const fixed=normalize(a.getAttribute("href")||"");
    if(!fixed) return;             // 対象外リンクは放置
    if(a.target==="_blank") return; // 新しいタブは触らない
    ev.preventDefault();
    ev.stopImmediatePropagation();
    window.location.assign(fixed);
  }, {capture:true});
})();
