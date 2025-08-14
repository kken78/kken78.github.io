(()=>{const BASE='/shinagawa';
  const mustPrefix=(href)=>{
    // 先頭スラ & /shinagawa で始まらない → 前置対象
    if(!href || !href.startsWith('/')) return false;
    if(href.startsWith(BASE+'/')) return false;
    // /_next や外部スキームは触らない
    if(href.startsWith('/_next/')) return false;
    return true;
  };
  const fixA=(a)=>{
    const href=a.getAttribute('href'); if(!href) return;
    if(mustPrefix(href)) a.setAttribute('href', BASE + href);
    // 「一覧へ戻る」「一覧」などは確実に /shinagawa/ に
    const t=(a.textContent||'').trim();
    if(t.includes('一覧')||t.includes('戻る')) a.setAttribute('href', BASE+'/');
  };
  const sweep=()=>{
    document.querySelectorAll('a[href]').forEach(fixA);
  };
  sweep();
  new MutationObserver(sweep).observe(document.documentElement,
    {subtree:true, childList:true, attributes:true, attributeFilter:['href']});
  // 左クリックも捕まえて確実に遷移
  document.addEventListener('click',(ev)=>{
    if(ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey||ev.button!==0) return;
    const a=ev.target.closest&&ev.target.closest('a[href]');
    if(!a) return;
    const href=a.getAttribute('href'); if(!href) return;
    if(mustPrefix(href)){
      ev.preventDefault(); ev.stopImmediatePropagation();
      location.assign(BASE + href);
    }else if((a.textContent||'').includes('一覧')){
      ev.preventDefault(); ev.stopImmediatePropagation();
      location.assign(BASE + '/');
    }
  },{capture:true});
})();
