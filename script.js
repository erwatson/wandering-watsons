// Backwards compatibility: old links used ?view=watsoneats /
// ?view=wanderingwatsons on the single homepage. The site now has two hub
// pages: / (Wandering Watsons, the main hub) and /eats.html (Watson Eats).
// Redirect an old ?view= link to the right hub; the tabs are plain links,
// so the site works fine with JS off too.
(function () {
  var params = new URLSearchParams(window.location.search);
  var view = params.get("view");
  var path = window.location.pathname;
  if (view === "watsoneats" && (path === "/" || path === "/index.html")) {
    window.location.replace("/eats.html");
  } else if (view === "wanderingwatsons" && path === "/eats.html") {
    window.location.replace("/");
  }
})();
