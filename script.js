const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const tabs = Array.from(document.querySelectorAll('.demo-tab[role="tab"]'));
const panels = Array.from(document.querySelectorAll('.screen-panel[role="tabpanel"]'));
const switcher = document.querySelector("#ipad-screen-switcher");

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

if (tabs.length && panels.length && switcher) {
  let activeIndex = tabs.findIndex((tab) => tab.classList.contains("is-active"));

  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const activateTab = (index, { focusTab = false } = {}) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    const activeTab = tabs[nextIndex];
    const activePanelId = activeTab.getAttribute("aria-controls");

    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === nextIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === activePanelId;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);

      if (isActive) {
        const scrollRegion = panel.querySelector(".screen-scroll");
        if (scrollRegion) {
          scrollRegion.scrollTop = 0;
        }
      }
    });

    switcher.classList.remove("is-switching");
    void switcher.offsetWidth;
    switcher.classList.add("is-switching");

    if (focusTab) {
      activeTab.focus();
    }

    activeTab.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    activeIndex = nextIndex;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(index);
    });

    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        tabs[(index + 1) % tabs.length].focus();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        tabs[(index - 1 + tabs.length) % tabs.length].focus();
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateTab(index, { focusTab: true });
      }
    });
  });

  switcher.addEventListener("animationend", () => {
    switcher.classList.remove("is-switching");
  });

  activateTab(activeIndex);
}
