document.addEventListener("DOMContentLoaded", function () {
  // Flip cards on click
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add animation for the process steps on scroll
  const processSteps = document.querySelectorAll(".process-step");

  // Simple function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to add animation class when element is in viewport
  function handleScroll() {
    processSteps.forEach((step) => {
      if (isInViewport(step)) {
        step.classList.add("animated");
      }
    });
  }

  // Add CSS class for animation
  processSteps.forEach((step) => {
    step.style.opacity = "0";
    step.style.transform = "translateY(20px)";
    step.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Check on scroll and initial load
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check on page load
});

// RECENT PROJECT - POP UP FUNCTIONALITY
// Sample project data
const projects = [
  {
    name: "Merch Mountain",
    url: "https://www.merchmountain.com/",
    image: "assets/img/MM.webp",
  },
  {
    name: "Michael Franti",
    url: "https://soulrockerfam.com/",
    image: "assets/img/MF.jpg",
  },
  {
    name: "Megadeth",
    url: "https://www.megadeth.com/",
    image: "assets/img/MD.jpg",
  },
  {
    name: "Willie Nelson",
    url: "https://willienelson.com/",
    image: "assets/img/WN.jpg",
  },
  {
    name: "Jelly Roll",
    url: "https://example.com/mountain-view",
    image: "assets/img/jelly.webp",
  },
  {
    name: "311",
    url: "https://311.com/",
    image: "assets/img/311.webp",
  },
  {
    name: "Sleeping With Sirens",
    url: "https://sirensmusic.co/",
    image: "assets/img/sirens.jpg",
  },
  {
    name: "The Moody Blues",
    url: "https://www.moodybluestoday.com/",
    image: "assets/img/MB.webp",
  },
  {
    name: "RunGum",
    url: "https://rungum.com/",
    image: "assets/img/RG.webp",
  },
  {
    name: "Black Sabbath UK shop",
    url: "https://uk.blacksabbathapparelshop.com/",
    image: "assets/img/BS.png",
  },
  {
    name: "CMA Fest",
    url: "https://shop.cmaworld.com",
    image: "assets/img/cma.webp",
  },
  {
    name: "Fail Army",
    url: "https://www.failarmy.com/",
    image: "assets/img/FA.png",
  },
];

// DOM elements
const viewAllBtn = document.getElementById("viewAllBtn");
const popupOverlay = document.getElementById("popupOverlay");
const closeBtn = document.getElementById("closeBtn");
const projectGrid = document.getElementById("projectGrid");

// Generate project grid with lazy loading
function generateProjectGrid() {
  projectGrid.innerHTML = "";
  projects.forEach((project) => {
    // Removed unused index parameter for performance
    const projectItem = document.createElement("a");
    projectItem.className = "project-item";
    projectItem.href = project.url;
    projectItem.target = "_blank";
    projectItem.rel = "noopener noreferrer";

    // Using img element with lazy loading instead of background image
    projectItem.innerHTML = `
      <div class="project-item-image">
        <img 
          src="${project.image}" 
          alt="${project.name} website screenshot"
          loading="lazy"
          decoding="async"
          onload="this.style.opacity='1'"
          style="opacity: 0; transition: opacity 0.3s ease;"
        >
      </div>
      <div class="project-item-content">
        <h3>${project.name}</h3>
      </div>
    `;

    projectGrid.appendChild(projectItem);
  });
}

// Open popup
function openPopup() {
  generateProjectGrid();
  popupOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close popup
function closePopup() {
  popupOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Event listeners
viewAllBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

// Close popup when clicking outside content
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closePopup();
  }
});

// Close popup with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popupOverlay.classList.contains("active")) {
    closePopup();
  }
});