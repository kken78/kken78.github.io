(()=> {
  const WEB_URL  = "https://code4japan.org/";
  const PRIV_URL = "https://code4japan.org/privacy";
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
    if (document.getElementById("__cfj-links")) return;
    let anchor = Array.from(document.querySelectorAll("h2,h3")).find(
      h => (h.textContent||"").includes("レポート一覧")
    ) || document.querySelector("main,[role=main],body");
    if (!anchor) return;

    const wrap = document.createElement("div");
    wrap.id = "__cfj-links";
    wrap.style.margin = "8px 0 16px";
    wrap.style.display = "flex";
    wrap.style.flexWrap = "wrap";
    wrap.style.gap = "8px";

    if (WEB_URL)  wrap.appendChild(makeBtn("ウェブページ", WEB_URL));
    if (PRIV_URL) wrap.appendChild(makeBtn("プライバシーポリシー", PRIV_URL));

    anchor.parentNode.insertBefore(wrap, anchor);
  };

  inject();
  new MutationObserver(inject).observe(document.documentElement,{subtree:true,childList:true});
})();
