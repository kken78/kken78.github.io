(()=> {
  const WEB_URL  = (window.SHINA_WEB_URL  || "").trim();
  const PRIV_URL = (window.SHINA_PRIV_URL || "").trim();
  if (!WEB_URL && !PRIV_URL) return;

  const makeBtn = (label, href) => {
    const a = document.createElement("a");
    a.textContent = label;
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.display = "inline-block";
    a.style.padding = "6px 10px";
    a.style.border = "1px solid currentColor";
    a.style.borderRadius = "9999px";
    a.style.textDecoration = "none";
    a.style.fontSize = "14px";
    a.style.marginRight = "8px";
    a.style.marginBottom = "8px";
    return a;
  };

  const inject = () => {
    // 「レポート一覧」の見出しの直前に置くと安定
    let anchor = Array.from(document.querySelectorAll("h2,h3"))
      .find(h => h.textContent?.includes("レポート一覧"));
    if (!anchor) anchor = document.querySelector("main,[role=main],body");
    if (!anchor) return;

    // 既に挿入済ならスキップ
    if (document.getElementById("__cfj-links")) return;

    const wrap = document.createElement("div");
    wrap.id = "__cfj-links";
    wrap.style.margin = "8px 0 16px";
    if (WEB_URL)  wrap.appendChild(makeBtn("ウェブページ", WEB_URL));
    if (PRIV_URL) wrap.appendChild(makeBtn("プライバシーポリシー", PRIV_URL));
    anchor.parentNode.insertBefore(wrap, anchor);
  };

  // 初回＋再描画にも対応
  inject();
  const mo = new MutationObserver(()=>inject());
  mo.observe(document.documentElement, {subtree:true, childList:true});
})();
