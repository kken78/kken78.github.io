(()=>{const TARGET="de51cdc0-dc4b-4e76-9aaf-d7d2ca1d4ec5";
  const fixHref=(a)=>{
    const h=a.getAttribute("href")||"";
    if(h && !h.startsWith("/shinagawa/") && h.includes(TARGET)){
      a.setAttribute("href","/shinagawa/"+TARGET+"/");
    }
  };
  const sweep=()=>{
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href')||'';
      if(href.includes(TARGET)){ fixHref(a); return; }
      const card=a.closest('[role="listitem"], .chakra-timeline_item, .chakra-card, li, article, .report-card');
      (card||a).remove();
    });
  };
  sweep();
  const mo=new MutationObserver(()=>sweep());
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();
