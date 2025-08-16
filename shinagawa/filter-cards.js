(()=>{
// ★ここに「表示を許可する UUID」を列挙（Shinagawa のみを残す）
const ALLOW = new Set([
  "de51cdc0-dc4b-4e76-9aaf-d7d2ca1d4ec5"
]);

// 外部リンクやレポーターの補助リンクは消さない
const isExternal = (h)=>/^https?:\/\//i.test(h);
const insideWhitelistBlock = (el)=> el.closest && !!el.closest('#__cfj-links');

// /shinagawa/<uuid>/ の正規化
const norm = (href)=>{
  if(!href) return null;
  try{ const u=new URL(href, location.origin); href=u.pathname; }catch{}
  // /<uuid> → /shinagawa/<uuid>/
  if(/^\/[0-9a-f-]{8}-[0-9a-f-]{4}-[0-9a-f-]{4}-[0-9a-f-]{4}-[0-9a-f-]{12}\/?$/.test(href)){
    const id=href.replace(/^\/|\/$/g,"");
    return "/shinagawa/"+id+"/";
  }
  // 既に /shinagawa/ なら末尾スラを保証
  if(href.startsWith("/shinagawa/")) return href.endsWith("/")?href:href+"/";
  return href;
};

const sweep = ()=>{
  document.querySelectorAll('a[href]').forEach(a=>{
    const h0 = a.getAttribute('href') || '';
    if (insideWhitelistBlock(a) || isExternal(h0)) return; // 外部や保護領域は除外

    const h = norm(h0);
    // a が UUID 詳細ページへのリンクなら、そのUUIDを取り出す
    const m = h && h.match(/^\/shinagawa\/([0-9a-f-]{36})\/$/i);
    if (m) {
      const id = m[1];
      // 許可されたUUIDならリンクを正規化して残す
      if (ALLOW.has(id)) {
        if (h !== h0) a.setAttribute('href', h);
        return;
      }
      // 許可されていないUUIDならカードごと除去
      const card = a.closest('[role="listitem"], .chakra-timeline_item, .chakra-card, li, article, .report-card');
      (card||a).remove();
      return;
    }

    // UUIDへのリンクでなければそのまま（内部の他リンクは必要に応じて調整可）
  });
};

// 初回 & Reactの再描画でも維持
sweep();
new MutationObserver(sweep).observe(document.documentElement,{childList:true,subtree:true});
})();
