(() => {
  const BASE = "/shinagawa";
  const UUID_RE = /^\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/i;

  const isPlainLeftClick = (ev) =>
    ev.button === 0 && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey && !ev.altKey;

  // URL を BASE 付きに補正
  const fixPathname = (u) => {
    try {
      const url = new URL(u, window.location.origin);
      const p = url.pathname;
      if (p.startsWith(BASE + "/")) return url.toString();            // すでにOK
      if (UUID_RE.test(p)) {
        // 末尾スラッシュを維持
        const tail = p.endsWith("/") ? p : p + "/";
        url.pathname = BASE + tail;
        return url.toString();
      }
    } catch {}
    return null;
  };

  // 1) クリック補正（aタグ経由のナビを先に修正）
  document.addEventListener(
    "click",
    (ev) => {
      if (!isPlainLeftClick(ev)) return;
      const a = ev.target.closest && ev.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || /^(https?:)?\/\//.test(href) || href.startsWith("#") || href.startsWith("mailto:")) return;

      const fixed = fixPathname(href);
      if (fixed) {
        ev.preventDefault();
        ev.stopImmediatePropagation(); // 他のクリックハンドラより優先
        if (a.target === "_blank") {
          window.open(fixed, "_blank", "noopener,noreferrer");
        } else {
          window.location.assign(fixed);
        }
      }
    },
    { capture: true }
  );

  // 2) programmatic navigation をフック（router.push, location.assign などを上書き）
  const wrapLocation = (method) => {
    const orig = window.location[method].bind(window.location);
    return (u) => {
      const fixed = fixPathname(u);
      return orig(fixed || u);
    };
  };
  const wrapHistory = (method) => {
    const orig = history[method].bind(history);
    return (state, title, url) => {
      const fixed = typeof url === "string" ? fixPathname(url) : null;
      return orig(state, title, fixed ?? url);
    };
  };

  try {
    window.location.assign = wrapLocation("assign");
    window.location.replace = wrapLocation("replace");
    history.pushState = wrapHistory("pushState");
    history.replaceState = wrapHistory("replaceState");
  } catch (e) {
    console.warn("[fix-card-nav] patch failed:", e);
  }
})();
