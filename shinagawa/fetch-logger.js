(() => {
  const orig = window.fetch;
  window.fetch = function(input, init) {
    const url = typeof input === "string" ? input : input?.url;
    if (url) console.debug("[fetch]", url);
    return orig(input, init);
  };
})();
