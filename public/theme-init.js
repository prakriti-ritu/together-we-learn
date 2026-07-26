// Applies the saved light/dark theme before first paint (avoids a flash).
// Static file — no inline script injection.
try {
  var t = localStorage.getItem("theme");
  if (t === "dark" || t === "light") {
    document.documentElement.setAttribute("data-theme", t);
  }
} catch (e) {
  /* ignore */
}
