(()=>{const TARGET="de51cdc0-dc4b-4e76-9aaf-d7d2ca1d4ec5";
  const ensureBase=(a)=>{
    const href=a.getAttribute("href")||"";
    if(href && !href.startsWith("/shinagawa/") && href.includes(TARGET)){
      a.setAttribute("href","/shinagawa/"+TARGET+"/");
    }
  };
  const dropOthers=()=>{
    // カード候補（aを含む大きめの要素を探して消す）
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href')||'';
      if(href.includes(TARGET)){
        ensureBase(a);
        return;
      }
      // 対象外。見た目のカード単位で消す
      const card = a.closest('[role="listitem"], .chakra-timeline_item, .chakra-card, li, article, .report-card');
      (card||a).remove();
    });
  };
  // hydration後に実行
  if(document.readyState==="complete") { setTimeout(dropOthers,0); }
  else window.addEventListener("load", ()=>setTimeout(dropOthers,0), {once:true});
})();
