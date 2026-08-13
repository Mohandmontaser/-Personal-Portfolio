/* =========================================================
   DOM ELEMENT REFERENCES
========================================================= */

// Theme / Mobile Menu
var themeToggleButton = document.getElementById("theme-toggle-button");
var mobileMenuButton = document.querySelector(".mobile-menu-btn");
var mobileNavLinks = document.querySelector(".nav-links");
// Settings Sidebar



var resetSettings = document.getElementById("reset-settings");
var settingsSidebar = document.getElementById("settings-sidebar");
var settingsToggle = document.getElementById("settings-toggle");
var closeSettings = document.getElementById("close-settings");


// Fonts
var fontOptions = document.getElementsByClassName("font-option");

// Contact Form
var contactForm = document.querySelector("form");
var contactName = document.getElementById("full-name");
var contactEmail = document.getElementById("email");
var contactPhone = document.getElementById("phone");
var contactMessage = document.getElementById("project-details");

// Portfolio Filter
var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");

// Scroll To Top
var scrollTopButton = document.getElementById("scroll-to-top");

// Testimonials Carousel
var carousel = document.getElementById("testimonials-carousel");
var prevButton = document.getElementById("prev-testimonial");
var nextButton = document.getElementById("next-testimonial");
var indicators = document.querySelectorAll(".carousel-indicator");
var testimonials = document.querySelectorAll(".testimonial-card");

/* =========================
   MOBILE MENU
========================= */

if (mobileMenuButton && mobileNavLinks) {
  mobileMenuButton.addEventListener("click", function () {
    mobileNavLinks.classList.toggle("active");
  });
}

/* =========================
   LIGHT / DARK MODE
========================= */

var savedMode = localStorage.getItem("theme");

if (savedMode === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", function () {
    var isDark = document.documentElement.classList.toggle("dark");

    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

/* =========================
   SIDEBAR
========================= */

function openSidebar() {
  settingsSidebar.classList.remove("translate-x-full");

  settingsToggle.style.right = "320px";

  settingsToggle.setAttribute("aria-expanded", "true");

  settingsSidebar.setAttribute("aria-hidden", "false");
}

function closeSidebar() {
  settingsSidebar.classList.add("translate-x-full");

  settingsToggle.style.right = "0";

  settingsToggle.setAttribute("aria-expanded", "false");

  settingsSidebar.setAttribute("aria-hidden", "true");
}

/* =========================
   CLOSE BUTTON
========================= */

if (closeSettings) {
  closeSettings.addEventListener("click", function () {
    closeSidebar();
  });
}

/* =========================
   SIDEBAR TOGGLE
========================= */

if (settingsToggle) {
  settingsToggle.addEventListener("click", function (info) {
    info.stopPropagation();

    if (settingsSidebar.classList.contains("translate-x-full")) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });
}

/* =========================
   CLICK OUTSIDE
========================= */

document.addEventListener("click", function (info) {
  if (
    settingsSidebar &&
    settingsToggle &&
    !settingsSidebar.contains(info.target) &&
    !settingsToggle.contains(info.target)
  ) {
    closeSidebar();
  }
});

/* =========================
   PREVENT SIDEBAR CLOSE
========================= */

if (settingsSidebar) {
  settingsSidebar.addEventListener("click", function (info) {
    info.stopPropagation();
  });
}

/* =========================
   FONTS
========================= */

var defaultFont = "tajawal";


function changeFont(fontName) {
  document.body.classList.remove("font-tajawal");
  document.body.classList.remove("font-cairo");
  document.body.classList.remove("font-alexandria");

  document.body.classList.add("font-" + fontName);

  localStorage.setItem("font", fontName);
}

function updateFontButtons(activeButton) {
  for (var i = 0; i < fontOptions.length; i++) {
    fontOptions[i].classList.remove("active");

    fontOptions[i].setAttribute("aria-checked", "false");
  }

  if (activeButton) {
    activeButton.classList.add("active");

    activeButton.setAttribute("aria-checked", "true");
  }
}

/* =========================
   FONT BUTTONS
========================= */

for (var i = 0; i < fontOptions.length; i++) {
  fontOptions[i].addEventListener("click", function () {
    var font = this.getAttribute("data-font");

    changeFont(font);

    updateFontButtons(this);
  });
}

/* =========================
   LOAD SAVED FONT
========================= */

var savedFont = localStorage.getItem("font") || defaultFont;

changeFont(savedFont);

for (var i = 0; i < fontOptions.length; i++) {
  if (fontOptions[i].getAttribute("data-font") === savedFont) {
    updateFontButtons(fontOptions[i]);

    break;
  }
}

/* =========================
   COLORS
========================= */

var colors = [
  {
    name: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },

  {
    name: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },

  {
    name: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },

  {
    name: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },

  {
    name: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },

  {
    name: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];

var grid = document.getElementById("theme-colors-grid");

/* =========================
   ACTIVE COLOR
========================= */

function setActiveColor(activeButton) {
  var colorButtons = grid.querySelectorAll("button");

  for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].classList.remove(
      "ring-offset-white",
      "ring-primary",
      "ring-2",
      "ring-offset-2",
      "dark:ring-offset-slate-900"
    );
  }

  if (activeButton) {
    activeButton.classList.add(
      "ring-primary",
      "ring-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
      "ring-offset-2"
    );
  }
}

/* =========================
   CREATE COLOR BUTTONS
========================= */

for (var i = 0; i < colors.length; i++) {
  var button = document.createElement("button");

  button.className =
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm";

  button.title = colors[i].name;

  button.setAttribute("data-primary", colors[i].primary);

  button.setAttribute("data-secondary", colors[i].secondary);

  button.setAttribute("data-accent", colors[i].accent);

  button.style.background =
    "linear-gradient(135deg, " +
    colors[i].primary +
    ", " +
    colors[i].secondary +
    ")";

  button.addEventListener("click", function () {
    var primary = this.getAttribute("data-primary");
    var secondary = this.getAttribute("data-secondary");
    var accent = this.getAttribute("data-accent");

    document.documentElement.style.setProperty("--color-primary", primary);

    document.documentElement.style.setProperty("--color-secondary", secondary);

    document.documentElement.style.setProperty("--color-accent", accent);

    localStorage.setItem(
      "selectedTheme",
      JSON.stringify({
        primary: primary,
        secondary: secondary,
        accent: accent,
      })
    );

    setActiveColor(this);
  });

  grid.appendChild(button);
}

/* =========================
   LOAD SAVED COLORS
========================= */

var savedTheme = localStorage.getItem("selectedTheme");

if (savedTheme) {
  var theme = JSON.parse(savedTheme);

  document.documentElement.style.setProperty("--color-primary", theme.primary);

  document.documentElement.style.setProperty(
    "--color-secondary",
    theme.secondary
  );

  document.documentElement.style.setProperty("--color-accent", theme.accent);

  var colorButtons = grid.querySelectorAll("button");

  for (var i = 0; i < colorButtons.length; i++) {
    if (
      colorButtons[i].getAttribute("data-primary") === theme.primary &&
      colorButtons[i].getAttribute("data-secondary") === theme.secondary &&
      colorButtons[i].getAttribute("data-accent") === theme.accent
    ) {
      setActiveColor(colorButtons[i]);

      break;
    }
  }
} else {
  setActiveColor(grid.querySelector("button"));
}

/* =========================
   RESET SETTINGS
========================= */


resetSettings.addEventListener("click", function () {
  localStorage.removeItem("selectedTheme");
  localStorage.removeItem("font");

  changeFont("tajawal");

  /* =========================
       RESET FONT BUTTON
    ========================= */

  for (var i = 0; i < fontOptions.length; i++) {
    if (fontOptions[i].getAttribute("data-font") === "tajawal") {
      updateFontButtons(fontOptions[i]);

      break;
    }
  }

  var defaultTheme = colors[0];

  document.documentElement.style.setProperty(
    "--color-primary",
    defaultTheme.primary
  );

  document.documentElement.style.setProperty(
    "--color-secondary",
    defaultTheme.secondary
  );

  document.documentElement.style.setProperty(
    "--color-accent",
    defaultTheme.accent
  );

  var colorButtons = grid.querySelectorAll("button");

  for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].classList.remove(
      "ring-offset-white",
      "ring-primary",
      "ring-2",
      "ring-offset-2",
      "dark:ring-offset-slate-900"
    );
  }

  if (colorButtons[0]) {
    colorButtons[0].classList.add(
      "dark:ring-offset-slate-900",
      "ring-offset-2",
      "ring-primary",
      "ring-2",
      "ring-offset-white"
    );
  }

  closeSidebar();
});

/* =========================
   NAV LINKS (SCROLL SPY)
========================= */

var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav-links a");

addEventListener("scroll", function () {
  var currentSection = "";

  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];

    if (scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  }

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");

    if (navLinks[i].getAttribute("href") === "#" + currentSection) {
      navLinks[i].classList.add("active");
    }
  }
});

/* =========================
   PORTFOLIO FILTER (NAV TABS)
========================= */
function updateFilterButtons(activeButton) {
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50"
    );

    filterButtons[i].classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
  }

  activeButton.classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "border",
    "border-slate-300",
    "dark:border-slate-700"
  );

  activeButton.classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "shadow-lg",
    "shadow-primary/50"
  );
}
if (filterButtons.length !== 0 && portfolioItems.length !== 0) {
  for (var i = 0; i < portfolioItems.length; i++) {
    portfolioItems[i].style.transition =
      "opacity 0.3s ease, transform 0.3s ease";
  }

  // Buttons
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
      var filter = this.getAttribute("data-filter");

      updateFilterButtons(this);

      for (var j = 0; j < portfolioItems.length; j++) {
        portfolioItems[j].style.opacity = "0";
        portfolioItems[j].style.transform = "scale(0.8)";
      }

      setTimeout(function () {
        for (var j = 0; j < portfolioItems.length; j++) {
          var category = portfolioItems[j].getAttribute("data-category");

          if (filter === "all" || category === filter) {
            portfolioItems[j].style.display = "block";
          } else {
            portfolioItems[j].style.display = "none";
          }
        }

        setTimeout(function () {
          for (var j = 0; j < portfolioItems.length; j++) {
            var category = portfolioItems[j].getAttribute("data-category");

            if (filter === "all" || category === filter) {
              portfolioItems[j].style.opacity = "1";
              portfolioItems[j].style.transform = "scale(1)";
            }
          }
        }, 50);
      }, 300);
    });
  }
}

/* =========================
   TESTIMONIALS CAROUSEL
========================= */

var currentIndex = 0;
var totalTestimonials = testimonials.length;

if (carousel && prevButton && nextButton && totalTestimonials > 0) {
  function getItemsPerView() {
    if (innerWidth < 640) {
      return 1;
    }

    if (innerWidth < 1024) {
      return 2;
    }

    return 3;
  }

  function updateCarousel() {
    var itemsPerView = getItemsPerView();
    var maxIndex = totalTestimonials - itemsPerView;

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    var percentage = 100 / itemsPerView;
    var position = currentIndex * percentage;

    carousel.style.transform = "translateX(" + position + "%)";

    for (var i = 0; i < indicators.length; i++) {
      if (i === currentIndex) {
        indicators[i].classList.add("active", "bg-accent", "scale-125");

        indicators[i].classList.remove("bg-slate-400", "dark:bg-slate-600");
      } else {
        indicators[i].classList.remove("active", "bg-accent", "scale-125");

        indicators[i].classList.add("bg-slate-400", "dark:bg-slate-600");
      }
    }
  }

  // Next
  nextButton.addEventListener("click", function () {
    var itemsPerView = getItemsPerView();
    var maxIndex = totalTestimonials - itemsPerView;

    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }

    updateCarousel();
  });

  // Previous
  prevButton.addEventListener("click", function () {
    var itemsPerView = getItemsPerView();
    var maxIndex = totalTestimonials - itemsPerView;

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }

    updateCarousel();
  });

  // Indicators
  for (var i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-index"));

      updateCarousel();
    });
  }

  // Responsive
  addEventListener("resize", function () {
    updateCarousel();
  });

  updateCarousel();
}

/* =========================
   CUSTOM SELECT DROPDOWNS
========================= */

var customSelects = document.querySelectorAll(".custom-select");

for (var i = 0; i < customSelects.length; i++) {
  customSelects[i].addEventListener("click", function () {
    var options = this.nextElementSibling;
    var icon = this.querySelector("i");

    for (var j = 0; j < customSelects.length; j++) {
      if (customSelects[j] !== this) {
        customSelects[j].nextElementSibling.classList.add("hidden");

        var otherIcon = customSelects[j].querySelector("i");

        otherIcon.style.transform = "rotate(0deg)";
      }
    }

    options.classList.toggle("hidden");

    if (options.classList.contains("hidden")) {
      icon.style.transform = "rotate(0deg)";
    } else {
      icon.style.transform = "rotate(180deg)";
    }
  });
}

var customOptions = document.querySelectorAll(".custom-option");

for (var i = 0; i < customOptions.length; i++) {
  customOptions[i].addEventListener("click", function (event) {
    event.stopPropagation();

    var wrapper = this.parentElement.parentElement;
    var select = wrapper.querySelector(".custom-select");
    var selectedText = select.querySelector(".selected-text");
    var options = wrapper.querySelector(".custom-options");
    var icon = select.querySelector("i");

    selectedText.textContent = this.getAttribute("data-value");

    options.classList.add("hidden");

    icon.style.transform = "rotate(0deg)";
  });
}

document.addEventListener("click", function (event) {
  for (var i = 0; i < customSelects.length; i++) {
    var wrapper = customSelects[i].parentElement;

    if (!wrapper.contains(event.target)) {
      customSelects[i].nextElementSibling.classList.add("hidden");

      customSelects[i].querySelector("i").style.transform = "rotate(0deg)";
    }
  }
});

/* =========================
   CONTACT FORM VALIDATION
========================= */

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var valid = true;

  // =========================
  // Name
  // =========================

  if (contactName.value.trim() === "") {
    showError(contactName, "يرجى إدخال الاسم الكامل");

    valid = false;
  } else {
    removeError(contactName);
  }

  // =========================
  // Email
  // =========================

  if (contactEmail.value.trim() === "") {
    showError(contactEmail, "يرجى إدخال البريد الإلكتروني");

    valid = false;
  } else {
    removeError(contactEmail);
  }

  // =========================
  // Phone
  // =========================

  var phonePattern = /^01[0-9]{9}$/;

  var phone = contactPhone.value.trim();

  if (phone === "") {
    showError(contactPhone, "يرجى إدخال رقم الهاتف");

    valid = false;
  } else if (!phonePattern.test(phone)) {
    showError(contactPhone, "يرجى إدخال رقم هاتف صحيح");

    valid = false;
  } else {
    removeError(contactPhone);
  }

  // =========================
  // Message
  // =========================

  var message = contactMessage.value.trim();

  if (message === "") {
    showError(contactMessage, "يرجى إدخال تفاصيل المشروع");

    valid = false;
  } else if (message.length < 20) {
    showError(contactMessage, "يرجى إدخال المزيد من التفاصيل");

    valid = false;
  } else {
    removeError(contactMessage);
  }

  // =========================
  // If Form Is Valid
  // =========================

  if (valid) {
    showSuccessMessage();

    contactForm.reset();
  }
});

// =========================
// Show Error
// =========================

function showError(input, message) {
  removeError(input);

  var errorMessage = document.createElement("p");

  errorMessage.className = "error-message text-red-400 text-sm mt-1";

  errorMessage.textContent = message;

  input.parentElement.appendChild(errorMessage);

  input.classList.add("border-red-500");
}

// =========================
// Remove Error
// =========================

function removeError(input) {
  var errorMessage = input.parentElement.querySelector(".error-message");

  if (errorMessage) {
    errorMessage.remove();
  }

  input.classList.remove("border-red-500");
}

// =========================
// Name Input Event
// =========================

contactName.addEventListener("input", function () {
  if (contactName.value.trim() !== "") {
    removeError(contactName);
  }
});

// =========================
// Email Input Event
// =========================

contactEmail.addEventListener("input", function () {
  if (contactEmail.value.trim() !== "") {
    removeError(contactEmail);
  }
});

// =========================
// Phone Input Event
// =========================

contactPhone.addEventListener("input", function () {
  var phonePattern = /^01[0-9]{9}$/;

  var phone = contactPhone.value.trim();

  if (phonePattern.test(phone)) {
    removeError(contactPhone);
  }
});

// =========================
// Message Input Event
// =========================

contactMessage.addEventListener("input", function () {
  var message = contactMessage.value.trim();

  if (message.length >= 20) {
    removeError(contactMessage);
  }
});

// =========================
// Success Message
// =========================

function showSuccessMessage() {
  var successMessage = document.createElement("div");

  successMessage.className =
    "fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm";

  successMessage.innerHTML = `
        <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl">

            <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">

                <i class="fa-solid fa-check text-4xl text-white"></i>

            </div>

            <h3 class="text-2xl font-bold mb-3">
                تم إرسال رسالتك بنجاح!
            </h3>

            <p class="text-slate-400 mb-6">
                شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.
            </p>

            <button
                type="button"
                class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold text-white hover:shadow-lg transition-all duration-300"
            >
                حسناً
            </button>

        </div>
    `;

  document.body.appendChild(successMessage);

  // Close Button

  var closeButton = successMessage.querySelector(".success-popup-close");

  closeButton.addEventListener("click", function () {
    successMessage.remove();
  });

  setTimeout(function () {
    if (successMessage.parentNode) {
      successMessage.remove();
    }
  }, 5000);
}

/* =========================
   SCROLL TO TOP BUTTON
========================= */

if (scrollTopButton) {
  addEventListener("scroll", function () {
    if (scrollY > 300) {
      scrollTopButton.classList.remove("opacity-0", "invisible");

      scrollTopButton.classList.add("opacity-100", "visible");
    } else {
      scrollTopButton.classList.remove("opacity-100", "visible");

      scrollTopButton.classList.add("opacity-0", "invisible");
    }
  });

  scrollTopButton.addEventListener("click", function () {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
