/* ==========================================================================
   APPLICATION LOGIC - APEX DENTAL BRANDING REDESIGN
   ========================================================================== */

// CONSTANTS & CONFIGURATION
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJXblLvgMpODoRtSYk0uLk-sA";
const GOOGLE_MAPS_FALLBACK_URL = "https://www.google.com/maps/search/?api=1&query=Apex+Dental+Hospital&query_place_id=ChIJXblLvgMpODoRtSYk0uLk-sA";

const RATING_TEXTS = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent"
};

// ==========================================================================
// RATING-AWARE REVIEW GENERATION TEMPLATES & VARIATIONS
// ==========================================================================

// 1. OPENINGS BY RATING TIER
const OPENINGS = {
  5: [
    "I had an exceptional experience at Apex Dental Hospital.",
    "Visiting Apex Dental Hospital was a wonderful experience from start to finish.",
    "I recently completed my treatment at Apex Dental Hospital and I couldn't be happier.",
    "My visit to Apex Dental Hospital exceeded all my expectations.",
    "I am extremely satisfied with the care I received at Apex Dental Hospital.",
    "Apex Dental Hospital provided top-notch dental care during my recent visit.",
    "I had a seamless and pleasant appointment at Apex Dental Hospital.",
    "Highly impressed by the quality of service at Apex Dental Hospital."
  ],
  4: [
    "I had a very good experience overall at Apex Dental Hospital.",
    "My recent visit to Apex Dental Hospital went smoothly.",
    "I had a pleasant appointment for my dental treatment at Apex Dental Hospital.",
    "Apex Dental Hospital provided great service during my recent visit.",
    "Overall, I am quite satisfied with my care at Apex Dental Hospital.",
    "I recently visited Apex Dental Hospital and had a positive experience.",
    "Treatment at Apex Dental Hospital was handled very professionally.",
    "My appointment at Apex Dental Hospital was efficient and comfortable."
  ],
  3: [
    "My experience at Apex Dental Hospital was satisfactory overall.",
    "I recently visited Apex Dental Hospital for a routine checkup and treatment.",
    "Apex Dental Hospital provided decent service during my appointment.",
    "My visit to Apex Dental Hospital was acceptable, though there is room for improvement.",
    "Overall, the treatment at Apex Dental Hospital was okay.",
    "I had a mixed experience during my recent visit to Apex Dental Hospital.",
    "The appointment at Apex Dental Hospital was average overall.",
    "Visiting Apex Dental Hospital was a decent experience."
  ],
  2: [
    "My recent visit to Apex Dental Hospital did not go as smoothly as expected.",
    "I expected a better experience during my appointment at Apex Dental Hospital.",
    "My appointment at Apex Dental Hospital was somewhat disappointing.",
    "I recently visited Apex Dental Hospital, but the service fell short.",
    "The treatment at Apex Dental Hospital was acceptable, but the overall experience needs improvement.",
    "I had a few issues during my recent appointment at Apex Dental Hospital.",
    "My experience at Apex Dental Hospital could have been much better.",
    "I visited Apex Dental Hospital, but was left with a fair amount of dissatisfaction."
  ],
  1: [
    "Unfortunately, my experience at Apex Dental Hospital was far from satisfactory.",
    "I was quite disappointed with my recent visit to Apex Dental Hospital.",
    "My appointment at Apex Dental Hospital did not meet my expectations at all.",
    "Regrettably, I had a poor experience during my treatment at Apex Dental Hospital.",
    "My visit to Apex Dental Hospital was frustrating and needs serious attention.",
    "I had an unpleasant visit to Apex Dental Hospital recently.",
    "I expected professional care, but my visit to Apex Dental Hospital was disappointing.",
    "The service I received at Apex Dental Hospital requires significant improvement."
  ]
};

// 2. CLOSINGS BY RATING TIER
const CLOSINGS = {
  5: [
    "I highly recommend Apex Dental Hospital to anyone seeking quality dental care.",
    "Thank you to the entire team for the outstanding care!",
    "I will definitely be returning here for all my future dental needs.",
    "Truly grateful for such a wonderful experience.",
    "A big thank you for making my treatment so comfortable and stress-free.",
    "I would recommend this clinic without hesitation.",
    "Kudos to the team for maintaining such high standards of patient care.",
    "Wishing the clinic continued success in providing great dental care."
  ],
  4: [
    "I would recommend Apex Dental Hospital for reliable dental treatment.",
    "Thank you for the good care and professional service.",
    "Overall a solid experience, and I would consider coming back.",
    "Appreciate the team's hard work and dedication.",
    "Glad I chose Apex Dental Hospital for my treatment.",
    "With slight tweaks to waiting times, this clinic would be 5 stars.",
    "A positive experience overall, thank you.",
    "I would comfortably recommend them to friends and family."
  ],
  3: [
    "A fair experience overall, though some minor adjustments would make it better.",
    "Hoping for a smoother experience during my next visit.",
    "Decent care, but there is definite scope for improvement in administration.",
    "Thank you for the treatment provided.",
    "A balanced visit overall; hopefully future appointments will be better coordinated.",
    "With better scheduling, the clinic could offer a much better patient journey.",
    "Satisfactory service, though not exceptional.",
    "Average experience overall."
  ],
  2: [
    "I hope the management takes feedback seriously to improve patient care.",
    "Significant improvement is needed in appointment coordination and waiting times.",
    "Communication needs to be addressed for a better patient experience.",
    "I hope to see improvements if I ever visit again.",
    "There is considerable room for improvement across several areas.",
    "Not the experience I anticipated; hopefully changes are made.",
    "Proper communication would have made a big difference.",
    "Constructive feedback provided in hopes of seeing positive changes."
  ],
  1: [
    "I hope the management reviews their processes to ensure better care in the future.",
    "I cannot recommend this clinic based on my recent visit.",
    "Serious changes in patient coordination and service quality are required.",
    "I hope future patients receive much better care than I did.",
    "Considerable improvement is necessary before I would consider returning.",
    "A disappointing visit overall; changes are urgently needed.",
    "Hoping the clinic takes steps to resolve these operational shortcomings.",
    "I expected much better service and attention to patient needs."
  ]
};

// 3. STANDALONE TEMPLATES WHEN NO HIGHLIGHTS ARE SELECTED (15+ per rating)
const NO_HIGHLIGHT_TEMPLATES = {
  5: [
    "I had an exceptional experience at Apex Dental Hospital. The staff were warm and courteous, and the doctor was extremely professional. My treatment was completely painless and handled with great precision. I highly recommend Apex Dental Hospital to anyone seeking top-tier dental care.",
    "Visiting Apex Dental Hospital was a wonderful experience from start to finish. The clinic environment is spotless and modern, and booking an appointment was quick and simple. Thank you to the entire team for the outstanding care!",
    "I recently completed my treatment at Apex Dental Hospital and I couldn't be happier. The dentist took time to explain every detail of the procedure, making me feel completely at ease. I will definitely be returning here for all my future dental needs.",
    "My visit to Apex Dental Hospital exceeded all my expectations. From the friendly receptionists to the highly skilled doctors, everything was handled flawlessly. Truly grateful for such a wonderful experience.",
    "I am extremely satisfied with the care I received at Apex Dental Hospital. The clinic maintains impeccable hygiene standards and uses state-of-the-art equipment. A big thank you for making my treatment so comfortable and stress-free.",
    "Apex Dental Hospital provided top-notch dental care during my recent visit. The waiting time was brief, and the treatment was executed effortlessly. I would recommend this clinic without hesitation.",
    "I had a seamless and pleasant appointment at Apex Dental Hospital. The doctor was gentle, reassuring, and highly knowledgeable. Kudos to the team for maintaining such high standards of patient care.",
    "Highly impressed by the quality of service at Apex Dental Hospital. The pricing is very reasonable considering the excellent level of care provided. Wishing the clinic continued success in providing great dental care.",
    "Hands down the best dental experience I have ever had. Apex Dental Hospital combines compassionate care with modern dental technology. I will certainly recommend them to my friends and family.",
    "Fantastic service at Apex Dental Hospital! The staff was incredibly welcoming and answered all my questions patiently. My dental treatment was smooth, quick, and hassle-free.",
    "Apex Dental Hospital is outstanding! The doctor made sure I felt no discomfort whatsoever during my procedure. Their attention to detail and patient comfort is commendable.",
    "From reservation to post-treatment follow-up, Apex Dental Hospital delivered stellar service. The environment is calming and extremely clean. Highly recommended for all dental procedures.",
    "I am so relieved to have found Apex Dental Hospital. The dentist was patient, thorough, and reassuring throughout the appointment. Thank you for your exceptional dedication.",
    "Apex Dental Hospital offers a premium healthcare experience. The treatment went smoothly and the staff ensured I was comfortable every step of the way. Five stars without a doubt!",
    "Exceptional service, friendly atmosphere, and expert doctors. My treatment at Apex Dental Hospital was gentle and effective. I couldn't have asked for a better experience."
  ],
  4: [
    "I had a very good experience overall at Apex Dental Hospital. The staff were friendly and the clinic was clean. Waiting time could be slightly shorter, but the treatment itself was great. I would recommend Apex Dental Hospital for reliable dental treatment.",
    "My recent visit to Apex Dental Hospital went smoothly. The doctor explained the procedure clearly and carried out the treatment professionally. Overall a solid experience, and I would consider coming back.",
    "I had a pleasant appointment for my dental treatment at Apex Dental Hospital. The facilities are modern and clean, though scheduling could be a bit more prompt. Thank you for the good care and professional service.",
    "Apex Dental Hospital provided great service during my recent visit. The dentist was attentive and made sure I was comfortable throughout. Appreciate the team's hard work and dedication.",
    "Overall, I am quite satisfied with my care at Apex Dental Hospital. The staff was cooperative and the treatment was handled well. Glad I chose Apex Dental Hospital for my treatment.",
    "I recently visited Apex Dental Hospital and had a positive experience. The clinic environment is well-maintained and hygienic. With slight tweaks to waiting times, this clinic would be 5 stars.",
    "Treatment at Apex Dental Hospital was handled very professionally. The dentist was skilled and reassuring. A positive experience overall, thank you.",
    "My appointment at Apex Dental Hospital was efficient and comfortable. The pricing was fair and the care was good. I would comfortably recommend them to friends and family.",
    "A very satisfying visit to Apex Dental Hospital. Staff was courteous and the procedure was virtually painless. Just a small delay at reception, but everything else was very smooth.",
    "Good quality care at Apex Dental Hospital. The doctor took time to listen to my concerns and addressed them carefully. Overall, a very dependable dental clinic.",
    "I had a good experience at Apex Dental Hospital. The infrastructure is modern and hygienic. My appointment went well with minimal fuss.",
    "Solid service and friendly staff at Apex Dental Hospital. The procedure was done efficiently and with care. Very happy with the results overall.",
    "Very pleased with the dental care at Apex Dental Hospital. The dentist was polite and gentle during treatment. The waiting area was slightly crowded, but the treatment quality made up for it.",
    "Apex Dental Hospital offers good care at reasonable rates. The team is professional and patient-centric. Recommended for general dental needs.",
    "Overall a positive visit to Apex Dental Hospital. The treatment was well explained and painless. A slight improvement in wait times would make it perfect."
  ],
  3: [
    "The doctor explained the treatment well, but the waiting time was longer than expected. Overall the treatment was satisfactory, although the appointment process could be improved.",
    "My experience at Apex Dental Hospital was satisfactory overall. The clinic was clean and the staff was polite, but the appointment ran later than scheduled. A fair experience overall, though some minor adjustments would make it better.",
    "I recently visited Apex Dental Hospital for a routine checkup and treatment. The dentist was competent, but the waiting area was quite busy. Hoping for a smoother experience during my next visit.",
    "Apex Dental Hospital provided decent service during my appointment. The treatment itself went fine, but communication regarding cost estimates could have been clearer. Decent care, but there is definite scope for improvement in administration.",
    "My visit to Apex Dental Hospital was acceptable, though there is room for improvement. The staff was polite, but the overall wait time was longer than preferred. Thank you for the treatment provided.",
    "Overall, the treatment at Apex Dental Hospital was okay. The doctor was knowledgeable, but the front desk desk coordination felt a bit rushed. A balanced visit overall; hopefully future appointments will be better coordinated.",
    "I had a mixed experience during my recent visit to Apex Dental Hospital. While the clinic facilities are clean, the waiting time exceeded 30 minutes. With better scheduling, the clinic could offer a much better patient journey.",
    "The appointment at Apex Dental Hospital was average overall. The procedure was carried out properly, but I expected slightly better communication regarding post-care instructions. Satisfactory service, though not exceptional.",
    "Visiting Apex Dental Hospital was a decent experience. The doctor was gentle, though the clinic felt overcrowded during my visit. Average experience overall.",
    "An okay experience at Apex Dental Hospital. The treatment was adequate, but the waiting period before seeing the dentist was frustratingly long.",
    "The medical care at Apex Dental Hospital was acceptable, but the administrative workflow needs streamlining. Staff was polite when approached.",
    "Average service at Apex Dental Hospital. The procedure was fine, but scheduling delays made the visit take much longer than planned.",
    "Decent dental care, but the clinic management could be improved. The dentist was nice, but the wait time was a drawback.",
    "The treatment at Apex Dental Hospital was done correctly, though patient handling at reception could be more systematic. Fair overall.",
    "A balanced review for Apex Dental Hospital: skilled doctors, but queue management and waiting room comfort require attention."
  ],
  2: [
    "The treatment was acceptable, but communication could have been much better. The waiting time was long and I expected a smoother experience. I hope the management takes feedback seriously to improve patient care.",
    "My recent visit to Apex Dental Hospital did not go as smoothly as expected. The receptionist was unhelpful and the appointment was delayed significantly. Significant improvement is needed in appointment coordination and waiting times.",
    "I expected a better experience during my appointment at Apex Dental Hospital. The procedure felt rushed and post-treatment instructions were vague. Communication needs to be addressed for a better patient experience.",
    "My appointment at Apex Dental Hospital was somewhat disappointing. Despite booking in advance, I had to wait over 45 minutes to see the doctor. I hope to see improvements if I ever visit again.",
    "I recently visited Apex Dental Hospital, but the service fell short. The dentist was overly brief and did not address all my questions. There is considerable room for improvement across several areas.",
    "The treatment at Apex Dental Hospital was acceptable, but the overall experience needs improvement. Staff coordination was lacking and the environment felt chaotic. Not the experience I anticipated; hopefully changes are made.",
    "I had a few issues during my recent appointment at Apex Dental Hospital. Long wait times combined with poor communication at reception made the visit stressful. Proper communication would have made a big difference.",
    "My experience at Apex Dental Hospital could have been much better. The procedure was uncomfortable and the billing process was confusing. Constructive feedback provided in hopes of seeing positive changes.",
    "Dissatisfied with the overall workflow at Apex Dental Hospital. The wait time was excessive and the staff seemed overwhelmed.",
    "I had high hopes for Apex Dental Hospital, but my visit was disappointing. Poor timing management and insufficient explanations from the team.",
    "The dentist was okay, but the clinic management at Apex Dental Hospital left much to be desired. Communication prior to the treatment was lacking.",
    "A frustrating appointment at Apex Dental Hospital. Long waiting times and a lack of clear guidance from the front office.",
    "Subpar coordination at Apex Dental Hospital. I spent more time waiting in the lobby than actually receiving treatment.",
    "The overall service at Apex Dental Hospital needs significant work. The staff lacked enthusiasm and patient support was minimal.",
    "I expected better attention to patient care at Apex Dental Hospital. Long delays and rushed consultations need fixing."
  ],
  1: [
    "Unfortunately my experience was not satisfactory. I experienced a long waiting time and the communication could have been better. I hope the management reviews their processes to ensure better care in the future.",
    "I expected better service. There is room for improvement in staff coordination and appointment management. I cannot recommend this clinic based on my recent visit.",
    "My visit did not meet my expectations. Hopefully the clinic improves these areas in the future. Serious changes in patient coordination and service quality are required.",
    "Unfortunately, my experience at Apex Dental Hospital was far from satisfactory. My scheduled appointment was delayed by over an hour without any explanation or update. I hope future patients receive much better care than I did.",
    "I was quite disappointed with my recent visit to Apex Dental Hospital. The consultation felt extremely rushed and my concerns were largely ignored. Considerable improvement is necessary before I would consider returning.",
    "My appointment at Apex Dental Hospital did not meet my expectations at all. The billing details were unclear and the staff was unsupportive when asked for clarification. A disappointing visit overall; changes are urgently needed.",
    "Regrettably, I had a poor experience during my treatment at Apex Dental Hospital. The environment was noisy and the procedure caused unnecessary discomfort. Hoping the clinic takes steps to resolve these operational shortcomings.",
    "My visit to Apex Dental Hospital was frustrating and needs serious attention. From long delays to unorganized management, the experience was unsatisfactory. I expected much better service and attention to patient needs.",
    "Very unhappy with the service at Apex Dental Hospital. The wait time was unreasonable and the administrative staff was unresponsive to inquiries.",
    "Unsatisfactory experience from start to finish at Apex Dental Hospital. Poor appointment tracking and unhelpful customer service.",
    "I had a very frustrating visit to Apex Dental Hospital. Lack of proper communication regarding wait times and treatment steps.",
    "My visit to Apex Dental Hospital fell far short of acceptable standards. Disorganized reception, delayed treatment, and poor guidance.",
    "Regrettable visit to Apex Dental Hospital. The clinic was disorganized and the overall handling of my appointment was unprofessional.",
    "Poor service and long delays at Apex Dental Hospital. Patient comfort does not seem to be a priority here.",
    "I left Apex Dental Hospital feeling very disappointed. The appointment management was chaotic and the treatment felt rushed."
  ]
};

// 4. CHIP PHRASES TAILORED BY RATING TIER
const CHIP_PHRASES = {
  5: {
    friendly_doctor: ["The doctor was incredibly friendly, kind, and attentive.", "Dr. was very welcoming and put me completely at ease.", "The dentist was exceptionally polite and caring."],
    professional_staff: ["The staff were professional, polite, and extremely supportive.", "Front desk staff and nurses were courteous and highly efficient.", "The team maintained utmost professionalism throughout."],
    clean_clinic: ["The clinic was spotless, hygienic, and very well maintained.", "Extremely clean environment with impressive sanitation standards.", "The facility was bright, pristine, and perfectly clean."],
    painless_treatment: ["The treatment was gentle, smooth, and completely painless.", "I experienced zero pain or discomfort during the procedure.", "The procedure was carried out with supreme care and no pain."],
    affordable: ["Pricing was transparent, reasonable, and great value for quality care.", "Very fair and affordable pricing structure.", "Cost-effective treatment without compromising quality."],
    easy_appointment: ["Booking an appointment was quick, effortless, and hassle-free.", "Seamless appointment scheduling process.", "Very smooth booking with zero scheduling friction."],
    good_explanation: ["The doctor explained every procedure step with great clarity.", "Thorough explanation provided before and after treatment.", "All my questions were answered clearly and patiently."],
    modern_equipment: ["They utilize state-of-the-art dental tech and modern equipment.", "Impressed by the advanced, high-tech diagnostic tools.", "The clinic is equipped with modern, top-tier machinery."],
    comfortable_environment: ["The ambience was soothing, warm, and highly comfortable.", "Relaxing clinic environment that eases dental anxiety.", "Very cozy, peaceful, and patient-friendly atmosphere."],
    child_friendly: ["Extremely patient, gentle, and wonderful with children.", "Great child-friendly approach that put my kid at ease.", "Fantastic pediatric care with gentle handling."],
    short_waiting_time: ["Waiting time was minimal; I was attended to right on time.", "Prompt service with virtually no wait time.", "They adhered strictly to the appointment schedule without delay."],
    excellent_service: ["Overall service was exceptional from registration to discharge.", "Stellar patient care in every single aspect.", "Flawless service quality throughout my visit."]
  },
  4: {
    friendly_doctor: ["The doctor was friendly and pleasant to talk to.", "The dentist was polite and receptive to my questions.", "The doctor had a good bedside manner."],
    professional_staff: ["Staff members were professional and helpful.", "The nurses and reception staff were cooperative.", "Good professionalism shown by the team."],
    clean_clinic: ["The clinic environment was clean and neat.", "Good hygiene standards maintained throughout the facility.", "Clean and orderly setup."],
    painless_treatment: ["Treatment was relatively comfortable with very little discomfort.", "The procedure was carried out smoothly with minimal pain.", "Felt comfortable during most of the treatment."],
    affordable: ["Pricing was reasonable and aligned with expectations.", "Fair charges for the services provided.", "Decent pricing for the quality offered."],
    easy_appointment: ["Appointment booking went smoothly.", "Setting up the appointment was straightforward.", "Easy registration process."],
    good_explanation: ["The doctor provided a good explanation of the treatment plan.", "Key steps were explained properly.", "Decent clarity provided on treatment details."],
    modern_equipment: ["Modern equipment was used for the procedure.", "Good technological setup at the clinic.", "Up-to-date dental tools."],
    comfortable_environment: ["The waiting room and clinic were comfortable.", "Pleasant and calm environment.", "Decent ambience."],
    child_friendly: ["Good handling with kids and gentle approach.", "Patient with children during the visit.", "Child-friendly atmosphere."],
    short_waiting_time: ["Waiting time was reasonable overall.", "Attended to within a short duration.", "Minimal delay before seeing the dentist."],
    excellent_service: ["Service quality was good overall.", "Satisfying service experience.", "Good care provided overall."]
  },
  3: {
    friendly_doctor: ["The doctor was polite, though consultations felt a bit brief.", "Dentist was okay, but could spend slightly more time explaining details.", "Doctor was pleasant enough."],
    professional_staff: ["Staff were okay, though reception coordination could be better.", "Staff members were standard in their approach.", "Cooperative staff, though somewhat busy."],
    clean_clinic: ["Clinic cleanliness was fine overall.", "Facility hygiene was acceptable.", "Decent cleanliness standards."],
    painless_treatment: ["Treatment was okay, though I felt slight discomfort at times.", "Procedure was tolerable overall.", "Treatment went fine with minor sensitivity."],
    affordable: ["Pricing was average, though some costs could be clearer.", "Standard rates overall.", "Fairly priced, though estimates could be better communicated."],
    easy_appointment: ["Booking was alright, though response time was a bit slow.", "Standard appointment procedure.", "Appointment setup was okay."],
    good_explanation: ["Explanation was basic but covered the essentials.", "Treatment details were shared, though briefly.", "Moderate explanation provided."],
    modern_equipment: ["Equipment seemed standard and functional.", "Decent infrastructure.", "Acceptable technological setup."],
    comfortable_environment: ["Environment was okay, though waiting area got crowded.", "Standard waiting area setup.", "Acceptable environment."],
    child_friendly: ["Handling with children was alright.", "Decent approach with kids.", "Fairly patient with younger patients."],
    short_waiting_time: ["Waiting time was moderate, slightly longer than scheduled.", "Had to wait around 20-30 minutes.", "Delay was noticeable but tolerable."],
    excellent_service: ["Service was average overall.", "Decent service with room for minor tweaks.", "Standard service experience."]
  },
  2: {
    friendly_doctor: ["The doctor was polite, but communication was lacking.", "Doctor was brief and rushed through the consultation.", "Felt the doctor could be more attentive."],
    professional_staff: ["Staff communication needs improvement.", "Reception staff appeared disorganized.", "Staff coordination was subpar."],
    clean_clinic: ["Cleanliness was basic, but waiting areas needed attention.", "Clinic hygiene could be improved.", "Sanitation was below expectation."],
    painless_treatment: ["Felt noticeable discomfort during the procedure.", "Treatment was rougher than I hoped.", "Discomfort during treatment could be managed better."],
    affordable: ["Pricing felt steep for the level of service delivered.", "Cost was higher than expected given the experience.", "Billing transparency was lacking."],
    easy_appointment: ["Appointment booking was confusing and slow.", "Scheduling issues caused confusion at arrival.", "Booking process needs improvement."],
    good_explanation: ["Very little explanation was given regarding the treatment.", "Treatment details were not clearly conveyed.", "Lack of clear explanation left me confused."],
    modern_equipment: ["Equipment seemed adequate, but facilities felt dated.", "Setup could use modern upgrades.", "Facility technology seemed basic."],
    comfortable_environment: ["Waiting area was cramped and noisy.", "Environment was far from relaxing.", "Ambience needs better management."],
    child_friendly: ["Approach with children lacked patience.", "Could be much more gentle with younger patients.", "Not ideal for child appointments."],
    short_waiting_time: ["Waiting time was unexpectedly long.", "Faced significant delays before seeing the dentist.", "Wait time was annoying."],
    excellent_service: ["Service fell below expectations.", "Service quality requires attention.", "Overall service was disappointing."]
  },
  1: {
    friendly_doctor: ["The doctor was unresponsive to my concerns and rushed.", "Consultation was brief and lacked empathy.", "Doctor showed little interest in addressing my questions."],
    professional_staff: ["Staff was unhelpful and disorganized.", "Poor support and rude response from front desk staff.", "Staff behavior was disappointing and uncoordinated."],
    clean_clinic: ["Cleanliness in the waiting and treatment areas was lacking.", "Hygiene standards were below acceptable medical levels.", "Facility cleanliness requires immediate attention."],
    painless_treatment: ["Procedure caused significant pain and discomfort.", "Treatment was uncomfortable and handled roughly.", "Poor pain management during the procedure."],
    affordable: ["Overpriced considering the disappointing experience.", "Unclear billing with hidden costs.", "Felt the service was not worth the money charged."],
    easy_appointment: ["Appointment system failed to log my booking correctly.", "Severe miscommunication regarding appointment timing.", "Chaotic reservation management."],
    good_explanation: ["No explanation was provided before or during treatment.", "Left in the dark regarding post-care instructions.", "Complete lack of clarity regarding procedure steps."],
    modern_equipment: ["Equipment felt outdated and maintenance seemed lacking.", "Facility tools appeared worn out.", "Tech infrastructure needs serious updating."],
    comfortable_environment: ["Environment was noisy, crowded, and uncomfortable.", "Lobby area was unorganized and stressful.", "Far from a comfortable healthcare setting."],
    child_friendly: ["Unsuited for children; handling was impatient.", "Lacked basic pediatric care awareness.", "Child had a very uncomfortable visit."],
    short_waiting_time: ["Waited an unacceptable amount of time.", "Extreme delay before seeing the doctor.", "Schedule was completely ignored with long waiting."],
    excellent_service: ["Service quality was poor across the board.", "Overall experience was very disappointing.", "Flawed service quality throughout."]
  }
};

// APPLICATION STATE
let state = {
  currentStep: 1,
  rating: 0,
  selectedChips: new Set(),
  customReviewText: "",
  isEdited: false
};

// Track last generated review to prevent consecutive identical output
let lastGeneratedReview = "";

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
  toast: document.getElementById("toast")
};

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initStars();
  initChips();
  initNavigation();
  initReviewEditor();
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
      
      // Update text preview dynamically
      generateReview();
    };

    card.addEventListener("click", toggleChip);
    
    // Accessibility keyboard support
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
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

// Helper utilities for randomized review generation
function getRandomElement(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateReview() {
  const rating = state.rating || 5;
  const selectedChips = Array.from(state.selectedChips);
  let review = "";
  
  // Try up to 5 attempts to generate a non-identical consecutive review
  for (let attempt = 0; attempt < 5; attempt++) {
    if (selectedChips.length === 0) {
      // 1. NO HIGHLIGHTS SELECTED: Pick randomly from 15+ standalone templates for this rating tier
      const templates = NO_HIGHLIGHT_TEMPLATES[rating] || NO_HIGHLIGHT_TEMPLATES[5];
      review = getRandomElement(templates);
    } else {
      // 2. HIGHLIGHTS SELECTED: Build dynamic review with opening + shuffled highlight phrases + closing
      const opening = getRandomElement(OPENINGS[rating] || OPENINGS[5]);
      const closing = getRandomElement(CLOSINGS[rating] || CLOSINGS[5]);
      
      const midSentences = [];
      const ratingChipPhrases = CHIP_PHRASES[rating] || CHIP_PHRASES[5];
      
      selectedChips.forEach(chipId => {
        const phrases = ratingChipPhrases[chipId];
        if (phrases && phrases.length > 0) {
          midSentences.push(getRandomElement(phrases));
        }
      });
      
      // Shuffle highlight sentences naturally
      const shuffledMid = shuffleArray(midSentences);
      
      review = `${opening} ${shuffledMid.join(" ")} ${closing}`.replace(/\s+/g, " ").trim();
    }
    
    if (review !== lastGeneratedReview) {
      break;
    }
  }
  
  lastGeneratedReview = review;
  state.customReviewText = review;
  dom.reviewTextarea.value = review;
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

function goToStep(stepNumber) {
  state.currentStep = stepNumber;
  updateStepUI();
}

function updateStepUI() {
  // Hide all step panels, then show current active panel
  dom.stepPanels.forEach((panel, index) => {
    const stepVal = index + 1;
    if (stepVal === state.currentStep) {
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
  lastGeneratedReview = "";
  
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
