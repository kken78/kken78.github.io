(()=>{const TARGET="de51cdc0-dc4b-4e76-9aaf-d7d2ca1d4ec5";
  const fix=(a)=>{const h=a.getAttribute("href")||""; if(h && !h.startsWith("/shinagawa/") && h.includes(TARGET)) a.setAttribute("href","/shinagawa/"+TARGET+"/");};
  const run=()=>{document.querySelectorAll('a[href]').forEach(a=>{const h=a.getAttribute('href')||''; if(h.includes(TARGET)){fix(a);return;}
    (a.closest('[role="listitem"], .chakra-timeline_item, .chakra-card, li, article, .report-card')||a).remove();});};
  if(document.readyState==="complete") setTimeout(run,0); else addEventListener("load",()=>setTimeout(run,0),{once:true});
})();
