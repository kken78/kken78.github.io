(()=>{const TARGET="de51cdc0-dc4b-4e76-9aaf-d7d2ca1d4ec5";
  const isExternal=(h)=>/^https?:\/\//i.test(h);
  const insideLinks=(el)=>el.closest && !!el.closest('#__cfj-links');

  const fix=(a)=>{
    const h=a.getAttribute('href')||'';
    if(h && !h.startsWith('/shinagawa/') && h.includes(TARGET)){
      a.setAttribute('href','/shinagawa/'+TARGET+'/');
    }
  };

  const sweep=()=>{
    document.querySelectorAll('a[href]').forEach(a=>{
      const h=a.getAttribute('href')||'';
      if(insideLinks(a) || isExternal(h)) return; // ← ここを保護
      if(h.includes(TARGET)){ fix(a); return; }
      const card=a.closest('[role="listitem"], .chakra-timeline_item, .chakra-card, li, article, .report-card');
      (card||a).remove();
    });
  };

  sweep();
  new MutationObserver(sweep).observe(document.documentElement,{childList:true,subtree:true});
})();
