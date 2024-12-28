document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".team-tab");
  const grids = document.querySelectorAll(".team-grid");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and grids
      tabs.forEach((t) => t.classList.remove("active"));
      grids.forEach((grid) => grid.classList.remove("active"));

      // Add active class to the clicked tab and corresponding grid
      tab.classList.add("active");
      const category = tab.getAttribute("data-category");
      document.querySelector(`.team-grid[data-category="${category}"]`).classList.add("active");
    });
  });
});
