// Wandering Watsons toggle: ?view= is the source of truth.
// Views: wanderingwatsons | watsoneats | all   (default: wanderingwatsons)
(function () {
  var params = new URLSearchParams(window.location.search);
  var view = params.get("view") || "wanderingwatsons";
  if (["wanderingwatsons", "watsoneats", "all"].indexOf(view) === -1) view = "wanderingwatsons";

  function apply(v) {
    document.querySelectorAll(".toggle a").forEach(function (a) {
      a.classList.toggle("active", a.dataset.view === v);
    });
    document.querySelectorAll(".post-list li").forEach(function (li) {
      li.classList.toggle("hidden", v !== "all" && li.dataset.site !== v);
    });
    var note = document.getElementById("view-note");
    if (note) {
      note.textContent = v === "all"
        ? "Showing both blogs — 86 posts."
        : v === "watsoneats"
          ? "Showing Watson Eats — 38 recipes."
          : "Showing Wandering Watsons — 48 travel posts.";
    }
    var heading = document.getElementById("list-heading");
    if (heading) {
      heading.textContent = v === "all" ? "All posts" : v === "watsoneats" ? "Watson Eats" : "Wandering Watsons";
    }
  }

  document.querySelectorAll(".toggle a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var v = a.dataset.view;
      var url = new URL(window.location.href);
      url.searchParams.set("view", v);
      window.history.pushState({}, "", url);
      apply(v);
    });
  });
  window.addEventListener("popstate", function () {
    var v = new URLSearchParams(window.location.search).get("view") || "wanderingwatsons";
    apply(v);
  });
  apply(view);
})();
