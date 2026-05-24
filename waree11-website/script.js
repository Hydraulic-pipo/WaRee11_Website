const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const previewImage = document.querySelector("#preview-image");
const previewTitle = document.querySelector("#preview-title");
const previewDescription = document.querySelector("#preview-description");
const previewTabs = document.querySelectorAll(".preview-tab");
const previewDots = document.querySelectorAll(".preview-dot");
const previewPrev = document.querySelector(".preview-arrow-prev");
const previewNext = document.querySelector(".preview-arrow-next");
const previewStage = document.querySelector("#preview-stage");

const previewScreens = [
  {
    label: "Dashboard",
    title: "Project Dashboard",
    description:
      "Review project readiness, model health, recent runs, and the overall hydraulic modeling workflow.",
    image: "assets/dashboard.jpeg",
    alt: "WaRee11 Project Dashboard screen",
  },
  {
    label: "River Network",
    title: "River Network Editor",
    description:
      "Inspect river nodes, branches, chainage, and simplified 1D model topology.",
    image: "assets/river-network.jpeg",
    alt: "WaRee11 River Network Editor screen",
  },
  {
    label: "Cross Sections",
    title: "Cross-Section Editor",
    description:
      "Manage channel geometry, width-elevation data, Manning roughness, and hydraulic property previews.",
    image: "assets/cross-section.jpeg",
    alt: "WaRee11 Cross-Section Editor screen",
  },
  {
    label: "Simulation Settings",
    title: "Simulation Readiness",
    description:
      "Configure time step, duration, numerical scheme, CFL checks, and boundary condition readiness.",
    image: "assets/simulation-settings.jpeg",
    alt: "WaRee11 Simulation Readiness screen",
  },
  {
    label: "Results",
    title: "Results & Diagnostics",
    description:
      "Visualize water level, discharge, solver diagnostics, and scenario comparison outputs.",
    image: "assets/results.jpeg",
    alt: "WaRee11 Results and Diagnostics screen",
  },
];

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

if (
  previewImage &&
  previewTitle &&
  previewDescription &&
  previewTabs.length &&
  previewDots.length &&
  previewPrev &&
  previewNext
) {
  let activePreviewIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  const updatePreview = (index) => {
    activePreviewIndex = (index + previewScreens.length) % previewScreens.length;
    const activeScreen = previewScreens[activePreviewIndex];

    previewImage.src = activeScreen.image;
    previewImage.alt = activeScreen.alt;
    previewTitle.textContent = activeScreen.title;
    previewDescription.textContent = activeScreen.description;

    previewTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activePreviewIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    previewDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activePreviewIndex);
    });
  };

  previewTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      updatePreview(Number(tab.dataset.previewIndex));
    });
  });

  previewDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      updatePreview(Number(dot.dataset.previewIndex));
    });
  });

  previewPrev.addEventListener("click", () => {
    updatePreview(activePreviewIndex - 1);
  });

  previewNext.addEventListener("click", () => {
    updatePreview(activePreviewIndex + 1);
  });

  previewStage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  });

  previewStage.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;

    if (Math.abs(touchEndX - touchStartX) < 40) {
      return;
    }

    if (touchEndX < touchStartX) {
      updatePreview(activePreviewIndex + 1);
    } else {
      updatePreview(activePreviewIndex - 1);
    }
  });

  updatePreview(0);
}
