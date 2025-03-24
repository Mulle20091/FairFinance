
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const toggleIcon = document.getElementById("toggleIcon");
  const toggleText = document.getElementById("toggleText");

  // Initialzustand prüfen
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (toggleIcon) toggleIcon.textContent = "☀️";
    if (toggleText) toggleText.textContent = "Hellmodus";
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

      if (toggleIcon) toggleIcon.textContent = isDark ? "☀️" : "🌙";
      if (toggleText) toggleText.textContent = isDark ? "Hellmodus" : "Dunkelmodus";
    });
  }
});
