(() => {
  const FROM = "http://localhost:8000"; // ランタイムが叩いている元URL
  const TO   = "/shinagawa";            // 同じパスで静的ファイルを置く先

  const origFetch = window.fetch;
  window.fetch = function(input, init) {
    try {
      const url = typeof input === "string" ? input : input?.url;
      if (url && url.startsWith(FROM)) {
        const newUrl = url.replace(FROM, TO);
        return typeof input === "string"
          ? origFetch(newUrl, init)
          : origFetch(new Request(newUrl, input), init);
      }
    } catch {}
    return origFetch(input, init);
  };
})();
