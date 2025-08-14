(() => {
  const base = "/shinagawa";

  // 補助: 右/中クリックや修飾キー押下を除外
  const isPlainLeftClick = (ev) =>
    ev.button === 0 && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey && !ev.altKey;

  document.addEventListener(
    "click",
    (ev) => {
      if (!isPlainLeftClick(ev)) return;

      const a = ev.target.closest && ev.target.closest("a[href]");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // 外部/ハッシュ/メール等は無視
      if (/^(https?:)?\/\//.test(href) || href.startsWith("#") || href.startsWith("mailto:")) return;

      // すでに /shinagawa/ 付きなら何もしない
      if (href.startsWith(base + "/")) return;

      // /<uuid> または /<uuid>/ の形式なら補正
      if (/^\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/.test(href)) {
        ev.preventDefault();
        const fixed = `${base}${href.endsWith("/") ? href : href + "/"}`;
        // 新しいタブを壊さない：target に応じた遷移
        if (a.target === "_blank") {
          window.open(fixed, "_blank", "noopener,noreferrer");
        } else {
          window.location.assign(fixed);
        }
      }
    },
    { capture: true }
  );
})();
