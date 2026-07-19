/* ==========================================================================
   APPLICATION LOGIC - APEX DENTAL BRANDING REDESIGN
   ========================================================================== */

// CONSTANTS & CONFIGURATION
// Place your hospital's Google Review link here.
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJXblLvgMpODoRtSYk0uLk-sA";
const GOOGLE_MAPS_FALLBACK_URL = "https://www.google.com/maps/search/?api=1&query=Apex+Dental+Hospital&query_place_id=ChIJXblLvgMpODoRtSYk0uLk-sA";

// Review generation templates based on chip selections
const REVIEW_TEMPLATES = {
  friendly_doctor: "The doctor was friendly and explained everything clearly.",
  professional_staff: "The staff were professional and supportive.",
  clean_clinic: "The clinic was clean and hygienic.",
  painless_treatment: "The treatment was comfortable and nearly painless.",
  affordable: "The pricing was reasonable and worth the quality of care.",
  easy_appointment: "Booking an appointment was quick and hassle-free.",
  good_explanation: "The dentist explained every step of the treatment.",
  modern_equipment: "They use advanced technology and modern equipment.",
  comfortable_environment: "The environment was warm, calming, and comfortable.",
  child_friendly: "They were extremely gentle and child-friendly.",
  short_waiting_time: "The waiting time was very short, and they saw me promptly.",
  excellent_service: "The overall service was outstanding from start to finish."
};

const RATING_TEXTS = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent"
};

// APPLICATION STATE
let state = {
  currentStep: 1,
  rating: 0,
  selectedChips: new Set(),
  customReviewText: "",
  isEdited: false
};

// DOM ELEMENTS
const dom = {
  themeToggle: document.getElementById("theme-toggle"),
  stepPanels: [
    document.getElementById("step-panel-1"),
    document.getElementById("step-panel-2"),
    document.getElementById("step-panel-3")
  ],
  stepNodes: [
    document.getElementById("step-node-1"),
    document.getElementById("step-node-2"),
    document.getElementById("step-node-3")
  ],
  progressLine: document.getElementById("progress-line"),
  stepTextIndicator: document.getElementById("step-text-indicator"),
  
  // Step 1 Elements
  starsContainer: document.getElementById("stars-container"),
  starBtns: document.querySelectorAll(".star-btn"),
  ratingText: document.getElementById("rating-text"),
  toStep2Btn: document.getElementById("to-step-2"),
  
  // Step 2 Elements
  chipsGrid: document.getElementById("chips-grid"),
  chipCards: document.querySelectorAll(".chip-card"),
  backToStep1Btn: document.getElementById("back-to-step-1"),
  toStep3Btn: document.getElementById("to-step-3"),
  
  // Step 3 Elements
  reviewTextarea: document.getElementById("review-textarea"),
  charCounter: document.getElementById("char-counter"),
  copyBtn: document.getElementById("copy-btn"),
  clearBtn: document.getElementById("clear-btn"),
  googleReviewLink: document.getElementById("google-review-link"),
  backToStep2Btn: document.getElementById("back-to-step-2"),
  
  // Other Elements
  toast: document.getElementById("toast"),
  qrCodeCanvas: document.getElementById("qr-code-canvas")
};

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initStars();
  initChips();
  initNavigation();
  initReviewEditor();
  initQR();
  updateStepUI();
});

// ==========================================
// THEME MANAGEMENT
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  
  dom.themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// ==========================================
// RATING SYSTEM (STEP 1)
// ==========================================
function initStars() {
  dom.starBtns.forEach(btn => {
    const val = parseInt(btn.dataset.value, 10);
    
    // Hover Effects
    btn.addEventListener("mouseenter", () => highlightStarsToValue(val));
    btn.addEventListener("mouseleave", () => highlightStarsToValue(state.rating));
    
    // Click Selection
    btn.addEventListener("click", () => {
      setRating(val);
      highlightStarsToValue(val);
      
      // Auto-advance to Step 2 after a small delay so user sees selection
      setTimeout(() => {
        if (state.currentStep === 1 && state.rating > 0) {
          goToStep(2);
        }
      }, 450);
    });
  });
}

function highlightStarsToValue(value) {
  dom.starBtns.forEach(btn => {
    const btnVal = parseInt(btn.dataset.value, 10);
    if (btnVal <= value) {
      btn.classList.add("hovered");
    } else {
      btn.classList.remove("hovered");
    }
  });
}

function setRating(ratingVal) {
  state.rating = ratingVal;
  
  // Highlight stars in DOM with staggered delays for standard bounce animation
  dom.starBtns.forEach((btn, index) => {
    const btnVal = parseInt(btn.dataset.value, 10);
    const svg = btn.querySelector("svg");
    if (btnVal <= ratingVal) {
      btn.classList.add("selected");
      if (svg) {
        svg.style.animationDelay = `${index * 50}ms`;
      }
    } else {
      btn.classList.remove("selected");
      if (svg) {
        svg.style.animationDelay = "";
      }
    }
  });

  // Enable step transition
  dom.toStep2Btn.disabled = false;
  
  // Update dynamic rating description with smooth animation
  const ratingTextVal = RATING_TEXTS[ratingVal];
  dom.ratingText.classList.remove("animate-in");
  
  setTimeout(() => {
    dom.ratingText.textContent = ratingTextVal;
    dom.ratingText.classList.add("has-value");
    dom.ratingText.classList.add("animate-in");
  }, 150);
  
  // Generate review since rating is a primary driver
  generateReview();
}

// ==========================================
// CHIPS SELECTION SYSTEM (STEP 2)
// ==========================================
function initChips() {
  dom.chipCards.forEach(card => {
    const chipId = card.dataset.id;
    
    // Toggle checkmark on card click
    const toggleChip = () => {
      card.classList.toggle("selected");
      
      if (state.selectedChips.has(chipId)) {
        state.selectedChips.delete(chipId);
        card.setAttribute("aria-checked", "false");
      } else {
        state.selectedChips.add(chipId);
        card.setAttribute("aria-checked", "true");
      }
      
      // Dynamic micro-interaction: subtle card bounce on click
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.transform = "";
      }, 80);

      generateReview();
    };

    card.addEventListener("click", toggleChip);

    // Accessibility: Support keyboard spacebar/enter key selection
    card.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleChip();
      }
    });
  });
}

// ==========================================
// REVIEW GENERATION & EDITOR (STEP 3)
// ==========================================
function initReviewEditor() {
  dom.reviewTextarea.addEventListener("input", (e) => {
    state.customReviewText = e.target.value;
    state.isEdited = true;
    updateCharCounter();
  });
  
  dom.copyBtn.addEventListener("click", () => {
    const text = dom.reviewTextarea.value.trim();
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      showToast("Review copied successfully!");
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      // Fallback selection copy
      dom.reviewTextarea.select();
      document.execCommand("copy");
      showToast("Review copied successfully!");
    });
  });
  
  dom.clearBtn.addEventListener("click", () => {
    resetState();
  });

  dom.googleReviewLink.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      const newTab = window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
      if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
        window.location.href = GOOGLE_MAPS_FALLBACK_URL;
      }
    } catch (err) {
      console.warn("Failed to open direct review URL, falling back to Maps listing: ", err);
      window.location.href = GOOGLE_MAPS_FALLBACK_URL;
    }
  });
}

function generateReview() {
  let opening = "I had a wonderful experience at Apex Dental.";
  if (state.rating === 4) {
    opening = "I had a great experience at Apex Dental.";
  } else if (state.rating > 0 && state.rating < 4) {
    opening = "I recently visited Apex Dental for treatment.";
  }
  
  const midSentences = [];
  state.selectedChips.forEach(chipId => {
    if (REVIEW_TEMPLATES[chipId]) {
      midSentences.push(REVIEW_TEMPLATES[chipId]);
    }
  });
  
  const closing = "I highly recommend Apex Dental.";
  
  let finalReview = opening;
  if (midSentences.length > 0) {
    finalReview += " " + midSentences.join(" ");
  }
  finalReview += " " + closing;
  
  state.customReviewText = finalReview;
  dom.reviewTextarea.value = finalReview;
  updateCharCounter();
}

function updateCharCounter() {
  const len = dom.reviewTextarea.value.length;
  // Format as '215 / 500'
  dom.charCounter.textContent = `${len} / 500`;
}

// ==========================================
// NAVIGATION / STEP CONTROLLER
// ==========================================
function initNavigation() {
  // Step 1 Next
  dom.toStep2Btn.addEventListener("click", () => goToStep(2));
  
  // Step 2 Nav
  dom.backToStep1Btn.addEventListener("click", () => goToStep(1));
  dom.toStep3Btn.addEventListener("click", () => goToStep(3));
  
  // Step 3 Nav
  dom.backToStep2Btn.addEventListener("click", () => goToStep(2));
  
  // Click directly on stepper node (allow going to step 1, 2, or 3 if unlocked by rating)
  dom.stepNodes.forEach(node => {
    const targetStep = parseInt(node.dataset.step, 10);
    node.addEventListener("click", () => {
      if (targetStep === 1) {
        goToStep(1);
      } else if (targetStep === 2 && state.rating > 0) {
        goToStep(2);
      } else if (targetStep === 3 && state.rating > 0) {
        goToStep(3);
      }
    });
  });
}

function goToStep(stepNum) {
  state.currentStep = stepNum;
  updateStepUI();
}

function updateStepUI() {
  // Update step panels visibility
  dom.stepPanels.forEach((panel, index) => {
    if (index + 1 === state.currentStep) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });
  
  // Update stepper progress nodes classes
  dom.stepNodes.forEach((node, index) => {
    const stepVal = index + 1;
    if (stepVal < state.currentStep) {
      node.classList.add("completed");
      node.classList.remove("active");
    } else if (stepVal === state.currentStep) {
      node.classList.remove("completed");
      node.classList.add("active");
    } else {
      node.classList.remove("completed", "active");
    }
  });
  
  // Progress line percent width
  let pct = 0;
  if (state.currentStep === 1) pct = 0;
  else if (state.currentStep === 2) pct = 50;
  else if (state.currentStep === 3) pct = 100;
  dom.progressLine.style.setProperty("--progress-pct", `${pct}%`);
  
  // Text Indicator
  let stepText = "Step 1 of 3 &bull; Rate Experience";
  if (state.currentStep === 2) stepText = "Step 2 of 3 &bull; Select Highlights";
  else if (state.currentStep === 3) stepText = "Step 3 of 3 &bull; Review & Share";
  dom.stepTextIndicator.innerHTML = stepText;
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
let toastTimeout;
function showToast(message) {
  clearTimeout(toastTimeout);
  
  dom.toast.querySelector(".toast-message").textContent = message;
  dom.toast.classList.add("show");
  
  toastTimeout = setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 2500);
}

// ==========================================
// RESET SYSTEM
// ==========================================
function resetState() {
  state.rating = 0;
  state.selectedChips.clear();
  state.customReviewText = "";
  state.isEdited = false;
  
  // Reset star buttons & remove staggered animation delays
  dom.starBtns.forEach(btn => {
    btn.classList.remove("selected", "hovered");
    const svg = btn.querySelector("svg");
    if (svg) {
      svg.style.animationDelay = "";
    }
  });
  dom.toStep2Btn.disabled = true;
  dom.ratingText.textContent = "Tap to rate";
  dom.ratingText.classList.remove("has-value", "animate-in");
  
  // Reset Chips
  dom.chipCards.forEach(card => {
    card.classList.remove("selected");
    card.setAttribute("aria-checked", "false");
  });
  
  // Reset Review
  dom.reviewTextarea.value = "";
  updateCharCounter();
  
  // Go to step 1
  goToStep(1);
  showToast("Selections cleared successfully!");
}

// ==========================================
// LOCAL QR CODE RENDERING
// ==========================================
function initQR() {
  try {
    if (typeof QRCode !== "undefined") {
      // Clear out canvas container
      dom.qrCodeCanvas.innerHTML = "";
      
      // Generate QR Code matching page URL (with brand-aligned dark color)
      new QRCode(dom.qrCodeCanvas, {
        text: window.location.href,
        width: 110,
        height: 110,
        colorDark: "#1F2937",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      console.warn("QRCode library not loaded yet.");
    }
  } catch (error) {
    console.error("Error drawing QR code: ", error);
  }
}

