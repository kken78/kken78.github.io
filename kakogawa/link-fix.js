(() => {
  const prefix = '/kakogawa';
  const uuid = /^\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i;
  document.querySelectorAll('a[href^="/"]').forEach(a => {
    const href = a.getAttribute('href');
    const m = href && href.match(uuid);
    if (m) a.setAttribute('href', `${prefix}/${m[1]}/`);
  });
})();
