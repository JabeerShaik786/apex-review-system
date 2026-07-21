/* ==========================================================================
   APPLICATION LOGIC & ADVANCED REVIEW GENERATION ENGINE
   APEX DENTAL HOSPITAL REVIEW SYSTEM
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
// 1. OPENING SENTENCE POOLS (50+ PER RATING)
// ==========================================================================
const OPENINGS = {
  5: [
    "I recently visited Apex Dental Hospital and had a fantastic experience.",
    "From the moment I walked in, I felt welcomed and comfortable.",
    "Choosing Apex Dental Hospital turned out to be the right decision.",
    "I couldn't be happier with the treatment I received.",
    "This was one of the best dental experiences I've ever had.",
    "The entire visit exceeded my expectations.",
    "I was genuinely impressed by the professionalism of the team.",
    "My appointment went much smoother than I expected.",
    "Everything about my visit was pleasant and stress-free.",
    "I had an excellent experience during my recent dental treatment.",
    "I usually feel nervous about dental visits, but this clinic completely changed that.",
    "I visited Apex Dental Hospital for the first time, and I'm extremely satisfied.",
    "Right from the reception to the treatment, everything was handled professionally.",
    "I can confidently recommend Apex Dental Hospital to anyone looking for quality dental care.",
    "The staff made me feel comfortable from the very beginning.",
    "Visiting Apex Dental Hospital was a truly delightful experience.",
    "I am thoroughly pleased with the level of care provided at Apex Dental Hospital.",
    "My recent appointment at Apex Dental Hospital was top-notch in every way.",
    "I had an outstanding visit to Apex Dental Hospital recently.",
    "Apex Dental Hospital provided me with world-class care and attention.",
    "I walked out of Apex Dental Hospital with a bright smile and full satisfaction.",
    "My experience at Apex Dental Hospital was smooth, efficient, and very pleasant.",
    "I cannot thank Apex Dental Hospital enough for their exemplary care.",
    "It was a refreshing experience visiting Apex Dental Hospital for my dental needs.",
    "Apex Dental Hospital offers stellar dental care with a very compassionate touch.",
    "From greeting to departure, my visit to Apex Dental Hospital was wonderful.",
    "I had a great consultation and treatment session at Apex Dental Hospital.",
    "Apex Dental Hospital is easily the finest dental clinic I have visited.",
    "My family and I had an amazing experience at Apex Dental Hospital.",
    "I was blown away by how easy and comfortable my visit to Apex Dental Hospital was.",
    "Apex Dental Hospital sets the benchmark for quality healthcare and patient comfort.",
    "I had a zero-stress, highly professional appointment at Apex Dental Hospital.",
    "Everything from scheduling to the actual treatment was executed flawlessly at Apex Dental Hospital.",
    "I am so glad I chose Apex Dental Hospital for my dental procedure.",
    "My appointment at Apex Dental Hospital was swift, gentle, and completely painless.",
    "The level of patient care at Apex Dental Hospital is truly commendable.",
    "I had an incredibly positive visit to Apex Dental Hospital.",
    "Apex Dental Hospital delivered an exceptional healthcare experience for me.",
    "I felt completely taken care of during my visit to Apex Dental Hospital.",
    "My experience at Apex Dental Hospital was nothing short of brilliant.",
    "I am immensely satisfied with the treatment quality at Apex Dental Hospital.",
    "If you want painless and high-quality dental care, Apex Dental Hospital is the place.",
    "I had a super smooth and reassuring experience at Apex Dental Hospital.",
    "The care I received at Apex Dental Hospital was beyond wonderful.",
    "Visiting Apex Dental Hospital gave me total peace of mind regarding my dental health.",
    "I am extremely grateful for the wonderful service at Apex Dental Hospital.",
    "My appointment at Apex Dental Hospital was handled with extreme care and precision.",
    "Apex Dental Hospital exceeded all my expectations for dental care.",
    "I had a very comforting and reassuring visit to Apex Dental Hospital.",
    "Apex Dental Hospital is hands down the best place for dental care.",
    "I left Apex Dental Hospital feeling very happy with my treatment.",
    "What a wonderful and painless experience at Apex Dental Hospital!"
  ],
  4: [
    "I had a very positive visit to Apex Dental Hospital overall.",
    "My recent appointment at Apex Dental Hospital went quite smoothly.",
    "I am happy with the dental care provided at Apex Dental Hospital.",
    "Visiting Apex Dental Hospital was a good experience overall.",
    "I had a pleasant and hassle-free treatment session at Apex Dental Hospital.",
    "Overall, my visit to Apex Dental Hospital met my expectations well.",
    "Apex Dental Hospital delivered reliable and professional service during my visit.",
    "I recently completed my appointment at Apex Dental Hospital and felt satisfied.",
    "My experience at Apex Dental Hospital was mostly seamless and comfortable.",
    "I had a solid and reassuring consultation at Apex Dental Hospital.",
    "The treatment at Apex Dental Hospital was carried out very well.",
    "I left Apex Dental Hospital feeling quite satisfied with the outcome.",
    "Apex Dental Hospital offers dependable dental services with courteous care.",
    "My appointment at Apex Dental Hospital was efficient and well-managed.",
    "I had a good experience overall during my recent dental visit.",
    "Apex Dental Hospital handled my treatment with high professionalism.",
    "My visit to Apex Dental Hospital went very smoothly with minor wait time.",
    "I was nicely surprised by the polite staff and competent care at Apex Dental Hospital.",
    "Overall, I received quality care during my visit to Apex Dental Hospital.",
    "Apex Dental Hospital provided a comfortable environment for my treatment.",
    "My appointment at Apex Dental Hospital was pleasant from start to finish.",
    "I felt quite well cared for during my consultation at Apex Dental Hospital.",
    "My experience at Apex Dental Hospital was clean, safe, and professional.",
    "I had a good consultation at Apex Dental Hospital and got clear guidance.",
    "Apex Dental Hospital maintained good standards during my treatment.",
    "I am generally very satisfied with the care at Apex Dental Hospital.",
    "My dental session at Apex Dental Hospital was smooth and comfortable.",
    "Apex Dental Hospital proved to be a trustworthy place for dental care.",
    "I had a reassuring visit to Apex Dental Hospital recently.",
    "Everything during my appointment at Apex Dental Hospital went according to plan.",
    "I had a very satisfactory experience at Apex Dental Hospital.",
    "My visit to Apex Dental Hospital was handled efficiently by the team.",
    "I appreciated the attentive service during my appointment at Apex Dental Hospital.",
    "Apex Dental Hospital provided good value and quality dental treatment.",
    "I had a pleasant visit to Apex Dental Hospital for my dental checkup.",
    "The doctors at Apex Dental Hospital ensured my treatment was smooth.",
    "Overall, Apex Dental Hospital delivered a nice and comfortable experience.",
    "My appointment at Apex Dental Hospital was executed with great skill.",
    "I had a favorable experience at Apex Dental Hospital overall.",
    "The team at Apex Dental Hospital did a commendable job with my treatment.",
    "I found Apex Dental Hospital to be very neat, organized, and helpful.",
    "My visit to Apex Dental Hospital went well without any major hiccups.",
    "I had a decent and comfortable appointment at Apex Dental Hospital.",
    "Apex Dental Hospital provided prompt and polite care during my visit.",
    "I am satisfied with how my dental treatment was handled at Apex Dental Hospital.",
    "My overall feedback for Apex Dental Hospital is very positive.",
    "Visiting Apex Dental Hospital was a comfortable experience overall.",
    "I had a reassuring appointment at Apex Dental Hospital for my teeth.",
    "Apex Dental Hospital offers clean and efficient dental services.",
    "I had a very good experience at Apex Dental Hospital recently.",
    "My treatment session at Apex Dental Hospital was peaceful and smooth."
  ],
  3: [
    "My visit to Apex Dental Hospital was satisfactory overall.",
    "I recently visited Apex Dental Hospital for a dental checkup.",
    "My experience at Apex Dental Hospital was decent, though there is some room for improvement.",
    "Apex Dental Hospital provided fair service during my recent appointment.",
    "Overall, my visit to Apex Dental Hospital was okay.",
    "I had a mixed experience during my appointment at Apex Dental Hospital.",
    "My treatment at Apex Dental Hospital was acceptable overall.",
    "Visiting Apex Dental Hospital was an average experience for me.",
    "I recently went to Apex Dental Hospital for my dental treatment.",
    "My appointment at Apex Dental Hospital was fine, though it took longer than expected.",
    "Apex Dental Hospital handled my procedure adequately.",
    "I had a standard dental visit at Apex Dental Hospital.",
    "Overall, the service at Apex Dental Hospital was fair.",
    "My experience at Apex Dental Hospital had both good points and minor drawbacks.",
    "I visited Apex Dental Hospital recently and found the care to be average.",
    "The treatment at Apex Dental Hospital was okay, but appointment timing needs attention.",
    "My consultation at Apex Dental Hospital was satisfactory, nothing extraordinary.",
    "I had an acceptable visit to Apex Dental Hospital overall.",
    "Apex Dental Hospital provided decent dental care, though wait times were noticeable.",
    "My appointment at Apex Dental Hospital went fine overall.",
    "I visited Apex Dental Hospital and experienced a moderate service level.",
    "Overall, the doctors at Apex Dental Hospital did a fair job.",
    "My visit to Apex Dental Hospital was okay, though reception was a bit crowded.",
    "I had a neutral to positive experience at Apex Dental Hospital.",
    "Apex Dental Hospital is a decent clinic, though scheduling could be smoother.",
    "My experience at Apex Dental Hospital was reasonable overall.",
    "I went to Apex Dental Hospital for treatment and it was satisfactory.",
    "The procedure at Apex Dental Hospital went fine, but waiting area was packed.",
    "I had a fair appointment at Apex Dental Hospital recently.",
    "Apex Dental Hospital provided standard care for my dental problem.",
    "My visit to Apex Dental Hospital was fine overall.",
    "I had a satisfactory consultation at Apex Dental Hospital.",
    "The care at Apex Dental Hospital was decent overall.",
    "My appointment at Apex Dental Hospital was acceptable.",
    "Visiting Apex Dental Hospital was a fair experience overall.",
    "I had an average visit to Apex Dental Hospital.",
    "My procedure at Apex Dental Hospital was completed satisfactorily.",
    "Apex Dental Hospital offered standard service during my stay.",
    "Overall, my visit to Apex Dental Hospital was adequate.",
    "I had a moderate experience at Apex Dental Hospital.",
    "My treatment at Apex Dental Hospital was okay overall.",
    "Apex Dental Hospital provided acceptable dental treatment.",
    "Visiting Apex Dental Hospital was a fine experience.",
    "I had a decent consultation at Apex Dental Hospital.",
    "Overall, service at Apex Dental Hospital was satisfactory.",
    "My appointment at Apex Dental Hospital went alright.",
    "I had an average appointment at Apex Dental Hospital.",
    "Apex Dental Hospital provided fair care overall.",
    "My experience at Apex Dental Hospital was okay.",
    "I had a standard visit to Apex Dental Hospital recently.",
    "Overall, Apex Dental Hospital delivered satisfactory care."
  ],
  2: [
    "My recent visit to Apex Dental Hospital did not go as smoothly as expected.",
    "I expected a better experience during my appointment at Apex Dental Hospital.",
    "My appointment at Apex Dental Hospital was somewhat disappointing.",
    "I recently visited Apex Dental Hospital, but the service fell short of expectations.",
    "The treatment at Apex Dental Hospital was acceptable, but the overall experience needs improvement.",
    "I had a few issues during my recent appointment at Apex Dental Hospital.",
    "My experience at Apex Dental Hospital could have been much better.",
    "I visited Apex Dental Hospital, but was left with a fair amount of dissatisfaction.",
    "The wait time at Apex Dental Hospital was unreasonably long for my appointment.",
    "I felt the consultation at Apex Dental Hospital was rushed.",
    "Apex Dental Hospital needs to work on their appointment management.",
    "My visit to Apex Dental Hospital was frustrating due to coordination delays.",
    "I was disappointed by the long waiting duration at Apex Dental Hospital.",
    "The service level at Apex Dental Hospital requires noticeable improvement.",
    "My appointment at Apex Dental Hospital was below my expectations.",
    "I experienced communication issues during my visit to Apex Dental Hospital.",
    "The front office coordination at Apex Dental Hospital was quite sloppy.",
    "I had a less than stellar experience at Apex Dental Hospital.",
    "My visit to Apex Dental Hospital was marred by poor timing management.",
    "I expected more attentive care during my consultation at Apex Dental Hospital.",
    "The overall management at Apex Dental Hospital needs serious attention.",
    "My appointment at Apex Dental Hospital was delayed considerably.",
    "I was not fully satisfied with how my visit to Apex Dental Hospital was handled.",
    "Apex Dental Hospital should focus more on patient waiting comfort.",
    "My experience at Apex Dental Hospital was disappointing overall.",
    "The reception desk at Apex Dental Hospital felt unorganized during my visit.",
    "I had a frustrating wait before seeing the doctor at Apex Dental Hospital.",
    "Apex Dental Hospital fell short of providing a smooth patient journey.",
    "My treatment at Apex Dental Hospital was okay, but administrative delays ruined it.",
    "I was unhappy with the appointment delays at Apex Dental Hospital.",
    "My visit to Apex Dental Hospital left a lot to be desired.",
    "I experienced noticeable delays during my appointment at Apex Dental Hospital.",
    "The care at Apex Dental Hospital was average, but waiting was terrible.",
    "I found the process at Apex Dental Hospital to be unnecessarily lengthy.",
    "My visit to Apex Dental Hospital was below what I anticipated.",
    "Communication regarding wait times at Apex Dental Hospital was lacking.",
    "I had a disappointing visit to Apex Dental Hospital.",
    "The scheduling system at Apex Dental Hospital needs an overhaul.",
    "I expected professional coordination, but Apex Dental Hospital disappointed.",
    "My experience at Apex Dental Hospital was subpar due to long wait times.",
    "I left Apex Dental Hospital feeling unimpressed with their management.",
    "Apex Dental Hospital needs to improve their patient handling workflow.",
    "My visit to Apex Dental Hospital was delayed and uncoordinated.",
    "I had a mediocre and frustrating experience at Apex Dental Hospital.",
    "The appointment flow at Apex Dental Hospital was very slow.",
    "I was dissatisfied with the waiting time at Apex Dental Hospital.",
    "My experience at Apex Dental Hospital requires constructive improvements.",
    "Apex Dental Hospital did not manage my appointment timing well.",
    "I had a disappointing visit at Apex Dental Hospital overall.",
    "The front desk service at Apex Dental Hospital needs improvement.",
    "I was unhappy with the delay during my appointment at Apex Dental Hospital."
  ],
  1: [
    "Unfortunately, my experience at Apex Dental Hospital was far from satisfactory.",
    "I was quite disappointed with my recent visit to Apex Dental Hospital.",
    "My appointment at Apex Dental Hospital did not meet my expectations at all.",
    "Regrettably, I had a poor experience during my treatment at Apex Dental Hospital.",
    "My visit to Apex Dental Hospital was frustrating and needs serious attention.",
    "I had an unpleasant visit to Apex Dental Hospital recently.",
    "I expected professional care, but my visit to Apex Dental Hospital was disappointing.",
    "The service I received at Apex Dental Hospital requires significant improvement.",
    "My scheduled appointment at Apex Dental Hospital was severely delayed without explanation.",
    "I left Apex Dental Hospital feeling completely dissatisfied with their service.",
    "The lack of communication at Apex Dental Hospital was unacceptable.",
    "My visit to Apex Dental Hospital was a very poor experience overall.",
    "I experienced terrible waiting times and unhelpful management at Apex Dental Hospital.",
    "Apex Dental Hospital failed to provide even basic patient coordination during my visit.",
    "I had a very frustrating and disappointing visit to Apex Dental Hospital.",
    "The consultation at Apex Dental Hospital felt extremely rushed and careless.",
    "I was deeply dissatisfied with how my appointment was handled at Apex Dental Hospital.",
    "Apex Dental Hospital provided an unacceptable level of patient care.",
    "My visit to Apex Dental Hospital was highly disappointing from start to finish.",
    "I experienced rude behavior and long delays at Apex Dental Hospital.",
    "The administrative staff at Apex Dental Hospital was completely disorganized.",
    "I had a terrible experience with appointment delays at Apex Dental Hospital.",
    "Apex Dental Hospital needs urgent improvements in patient handling and timing.",
    "My experience at Apex Dental Hospital was thoroughly unsatisfactory.",
    "I regret choosing Apex Dental Hospital for my treatment after this experience.",
    "The service quality at Apex Dental Hospital was extremely disappointing.",
    "I faced unreasonable delays and poor guidance at Apex Dental Hospital.",
    "My appointment at Apex Dental Hospital was managed very poorly.",
    "I was very unhappy with the treatment process at Apex Dental Hospital.",
    "Apex Dental Hospital showed a complete lack of proper patient care.",
    "My visit to Apex Dental Hospital was a stressful and frustrating affair.",
    "I encountered severe delays and unsupportive staff at Apex Dental Hospital.",
    "The appointment management at Apex Dental Hospital was chaotic.",
    "I am deeply disappointed with the service at Apex Dental Hospital.",
    "Apex Dental Hospital fell far short of acceptable healthcare standards.",
    "My visit to Apex Dental Hospital was unpleasant due to excessive wait times.",
    "I had a very poor consultation experience at Apex Dental Hospital.",
    "The overall workflow at Apex Dental Hospital was chaotic and unprofessional.",
    "I expected decent care, but Apex Dental Hospital delivered a poor experience.",
    "My visit to Apex Dental Hospital was extremely frustrating.",
    "The management at Apex Dental Hospital showed no respect for patient time.",
    "I had a completely unsatisfactory visit to Apex Dental Hospital.",
    "Apex Dental Hospital needs immediate corrective action in staff behavior.",
    "My experience at Apex Dental Hospital was very disappointing.",
    "I faced long delays and poor treatment guidance at Apex Dental Hospital.",
    "The service at Apex Dental Hospital was thoroughly disappointing.",
    "I had a frustrating visit to Apex Dental Hospital with zero coordination.",
    "Apex Dental Hospital provided poor service during my appointment.",
    "I was highly dissatisfied with my visit to Apex Dental Hospital.",
    "The appointment handling at Apex Dental Hospital was unacceptable.",
    "I had a very bad experience at Apex Dental Hospital overall."
  ]
};

// ==========================================================================
// 2. CLOSING SENTENCE POOLS (40+ PER RATING)
// ==========================================================================
const CLOSINGS = {
  5: [
    "Highly recommended!",
    "Will definitely visit again.",
    "Thank you to the wonderful team.",
    "Keep up the excellent work.",
    "I'm very satisfied.",
    "Couldn't have asked for better care.",
    "Five stars from me.",
    "Would happily recommend this clinic.",
    "Excellent service throughout.",
    "Truly impressed.",
    "I will be recommending them to all my friends and family.",
    "A big thank you to the entire staff for their dedicated service.",
    "Top-notch dental clinic in every aspect!",
    "I will definitely return for all my future dental checkups.",
    "Kudos to the entire team for maintaining such high standards.",
    "Hands down the best dental practice around.",
    "Thank you for making my visit so pleasant and comfortable.",
    "I am extremely grateful for their exemplary service.",
    "Outstanding care from start to finish!",
    "I wouldn't hesitate to visit them again.",
    "Truly a 5-star experience in dental care.",
    "Special thanks to the doctor for being so patient and skilled.",
    "I'm completely delighted with the results of my treatment.",
    "Best dental care experience I have ever had!",
    "Highly impressed by their professionalism and warmth.",
    "Thank you for taking such good care of my dental health.",
    "I will certainly be back for my regular checkups.",
    "Wonderful staff, great doctors, and immaculate service!",
    "A heartfelt thank you for a smooth and painless appointment.",
    "Apex Dental Hospital has earned my complete trust.",
    "I am very happy with my new smile thanks to Apex Dental Hospital.",
    "Excellence at its finest in dental healthcare!",
    "Thank you for making dental visits something to look forward to.",
    "I recommend Apex Dental Hospital without any hesitation.",
    "Great experience overall, keep up the fantastic work!",
    "So glad I chose this clinic for my treatment.",
    "Five stars all the way for exceptional patient care!",
    "Thank you for your kindness and top-quality treatment.",
    "I am thoroughly impressed by their dedication and expertise.",
    "Simply the best dental hospital in town!"
  ],
  4: [
    "Overall a solid experience, and I would consider coming back.",
    "Thank you for the good care and professional service.",
    "I would recommend Apex Dental Hospital for reliable dental treatment.",
    "Appreciate the team's hard work and dedication.",
    "Glad I chose Apex Dental Hospital for my treatment.",
    "With slight tweaks to waiting times, this clinic would be 5 stars.",
    "A positive experience overall, thank you.",
    "I would comfortably recommend them to friends and family.",
    "Good quality dental care delivered with politeness.",
    "Thank you for a smooth and satisfying appointment.",
    "A dependable clinic for all general dental needs.",
    "Pleased with the outcome of my treatment.",
    "Very good service, will likely visit again.",
    "Appreciated the clear communication and gentle treatment.",
    "Overall a good visit, keep up the fine service.",
    "Satisfactorily handled with care and efficiency.",
    "I am happy with the treatment provided today.",
    "Good experience overall, thank you to the staff.",
    "A reliable dental hospital with courteous staff.",
    "Decent care and good doctor consultation.",
    "Thank you for your prompt assistance during my visit.",
    "I would return for future routine checkups.",
    "Good value for money and professional execution.",
    "A reassuring visit overall, thank you team.",
    "Pleased with the professionalism shown throughout.",
    "Very good patient care overall.",
    "Thanks for making the procedure comfortable.",
    "Solid dental care with minor room for improvement in wait time.",
    "I had a pleasant visit overall.",
    "Appreciate the polite attitude of the entire team.",
    "Good job by the doctors and support staff.",
    "I would recommend this clinic to my acquaintances.",
    "Satisfied with the overall experience.",
    "Thank you for your helpful guidance.",
    "Nice clinic environment and good treatment.",
    "A positive dental visit overall.",
    "Pleased with the outcome, thank you.",
    "Dependable service and skilled dentists.",
    "Good service overall!",
    "Thank you for the pleasant experience."
  ],
  3: [
    "A fair experience overall, though some minor adjustments would make it better.",
    "Hoping for a smoother experience during my next visit.",
    "Decent care, but there is definite scope for improvement in administration.",
    "Thank you for the treatment provided.",
    "A balanced visit overall; hopefully future appointments will be better coordinated.",
    "With better scheduling, the clinic could offer a much better patient journey.",
    "Satisfactory service, though not exceptional.",
    "Average experience overall.",
    "Fair treatment, but waiting area management needs work.",
    "Decent consultation, though timeliness could be improved.",
    "An okay visit overall.",
    "Hoping to see quicker scheduling next time.",
    "Average service quality overall.",
    "The treatment was fine, but management needs attention.",
    "Fair experience; hoping for improvement in wait times.",
    "Okay experience, nothing remarkable.",
    "Decent medical care, administrative side needs work.",
    "Hoping for better queue management on future visits.",
    "Acceptable service overall.",
    "Fair overall experience.",
    "Treatment was fine, but timing delays were frustrating.",
    "Scope for improvement in front desk handling.",
    "Average service; hope they streamline the waiting process.",
    "Decent overall, but could be better.",
    "Fair care provided.",
    "Hoping for a more organized visit next time.",
    "Acceptable treatment quality overall.",
    "Satisfactory, though wait time was long.",
    "Okay experience overall.",
    "Hope management takes feedback constructively.",
    "Decent dental care overall.",
    "Average visit; needs better timing adherence.",
    "Fair experience with room for progress.",
    "Treatment was okay overall.",
    "Hoping for smoother coordination next time.",
    "Satisfactory service overall.",
    "Decent job by doctor, but staff management needs work.",
    "Fair visit overall.",
    "Average experience.",
    "Acceptable care provided."
  ],
  2: [
    "I hope the management takes feedback seriously to improve patient care.",
    "Significant improvement is needed in appointment coordination and waiting times.",
    "Communication needs to be addressed for a better patient experience.",
    "I hope to see improvements if I ever visit again.",
    "There is considerable room for improvement across several areas.",
    "Not the experience I anticipated; hopefully changes are made.",
    "Proper communication would have made a big difference.",
    "Constructive feedback provided in hopes of seeing positive changes.",
    "Hoping management reviews their scheduling workflow.",
    "Disappointed with the long delay and poor coordination.",
    "Considerable effort is needed to improve patient waiting conditions.",
    "Better organization is essential for patient comfort.",
    "I expected much better coordination during my visit.",
    "Communication regarding wait times must be improved.",
    "Hoping for significant operational updates at this clinic.",
    "Subpar timing management ruined what could have been a decent visit.",
    "Improvements are definitely needed in front desk handling.",
    "Disappointing experience overall due to long delays.",
    "I hope patient timing is respected better in the future.",
    "Management needs to address administrative shortcomings.",
    "Disappointed with the lack of organization.",
    "Hoping to see positive changes in appointment handling.",
    "Needs major improvement in queue management.",
    "Communication was lacking throughout.",
    "Hoping the clinic works on their patient service flow.",
    "Disappointing coordination overall.",
    "Substantial improvements required.",
    "I hope management addresses these issues soon.",
    "Timing management needs urgent attention.",
    "Disappointed with the overall service flow.",
    "Better care coordination is necessary.",
    "Hoping for better management next time.",
    "Front office workflow needs serious revision.",
    "Not satisfied with the wait times.",
    "Constructive feedback for future improvement.",
    "Disappointing visit due to poor scheduling.",
    "Hoping management fixes appointment delays.",
    "Service fell short of expectations.",
    "Needs improvement in patient communication.",
    "Disappointed with the visit overall."
  ],
  1: [
    "I hope the management reviews their processes to ensure better care in the future.",
    "I cannot recommend this clinic based on my recent visit.",
    "Serious changes in patient coordination and service quality are required.",
    "I hope future patients receive much better care than I did.",
    "Considerable improvement is necessary before I would consider returning.",
    "A disappointing visit overall; changes are urgently needed.",
    "Hoping the clinic takes steps to resolve these operational shortcomings.",
    "I expected much better service and attention to patient needs.",
    "Unsatisfactory experience overall, very disappointed.",
    "Urgent overhaul needed in staff coordination and timing management.",
    "I will not be returning to this clinic after this experience.",
    "Very poor service and zero respect for patient time.",
    "Hoping the management takes immediate corrective actions.",
    "I cannot in good conscience recommend this place.",
    "Highly disappointed with the lack of proper patient care.",
    "A thoroughly frustrating and unsatisfactory experience.",
    "Serious operational revisions are required at Apex Dental Hospital.",
    "Extremely disappointed with how my appointment was handled.",
    "I hope management addresses these failures promptly.",
    "Unacceptable level of service and long delays.",
    "I will be seeking dental care elsewhere in the future.",
    "Very poor administrative handling overall.",
    "Disappointed beyond expectations.",
    "Urgent steps must be taken to fix long wait times and staff rudeness.",
    "I hope future visitors do not face the same ordeal.",
    "A complete waste of time due to disorganized management.",
    "Unsatisfactory care across the board.",
    "I cannot recommend Apex Dental Hospital based on this visit.",
    "Extremely disappointed with the lack of professionalism.",
    "Hoping for major structural changes in patient service.",
    "Very bad experience from start to finish.",
    "I will not recommend this clinic to anyone.",
    "Unacceptable waiting duration and poor attitude.",
    "Extremely unhappy with the visit.",
    "Major improvements urgently needed.",
    "I regret visiting this clinic.",
    "Very poor patient management.",
    "Unsatisfactory experience overall.",
    "I cannot recommend them at all.",
    "Disappointed with the service quality."
  ]
};

// ==========================================================================
// 3. OPTIONAL PERSONAL EXPERIENCES (15+ VARIATIONS)
// ==========================================================================
const PERSONAL_EXPERIENCES = [
  "I visited for a root canal treatment.",
  "My daughter had her braces fitted here.",
  "My father received comprehensive dental treatment here.",
  "I came in for routine teeth cleaning and scaling.",
  "I underwent a wisdom tooth extraction procedure.",
  "I had my dental implants done at Apex Dental Hospital.",
  "My child was treated very patiently and gently.",
  "My first dental visit was surprisingly comfortable.",
  "I booked an emergency appointment for acute tooth pain.",
  "I visited for a cavity filling and routine checkup.",
  "I brought my mother in for denture adjustments.",
  "I underwent cosmetic tooth whitening at the clinic.",
  "I came in for a crown placement procedure.",
  "I took my son for a pediatric dental checkup.",
  "I visited for a full oral hygiene consultation."
];

// ==========================================================================
// 4. HIGHLIGHT-SPECIFIC PHRASE POOLS (30+ PER RATING PER HIGHLIGHT)
// ==========================================================================
const CHIP_PHRASES = {
  5: {
    friendly_doctor: [
      "The doctor was incredibly friendly, warm, and attentive.",
      "Dr. was very welcoming and put me completely at ease.",
      "The dentist was exceptionally polite, gentle, and caring.",
      "I was deeply touched by the doctor's friendly and empathetic approach.",
      "The doctor greeted me warmly and listened to all my concerns with great patience."
    ],
    professional_staff: [
      "The staff were professional, polite, and extremely supportive.",
      "Front desk staff and nurses were courteous and highly efficient.",
      "The team maintained utmost professionalism throughout my visit.",
      "Every staff member I interacted with was helpful, polite, and well-trained.",
      "The receptionist and nursing staff provided stellar coordination."
    ],
    clean_clinic: [
      "The clinic was spotless, hygienic, and very well maintained.",
      "Extremely clean environment with impressive sanitation standards.",
      "The facility was bright, pristine, and perfectly clean.",
      "Impeccable clinical hygiene standards were evident in every corner.",
      "The waiting area and treatment rooms were maintained in top hygienic condition."
    ],
    painless_treatment: [
      "The treatment was gentle, smooth, and completely painless.",
      "I experienced zero pain or discomfort during the entire procedure.",
      "The procedure was carried out with supreme care and no pain whatsoever.",
      "The dentist ensured the entire treatment was virtually pain-free.",
      "I was amazed at how painless and easy the procedure turned out to be."
    ],
    affordable: [
      "Pricing was transparent, reasonable, and great value for quality care.",
      "Very fair and affordable pricing structure considering the high standard.",
      "Cost-effective treatment without compromising on medical quality.",
      "The charges were very reasonable and clearly explained beforehand.",
      "Great quality dental care provided at very fair prices."
    ],
    easy_appointment: [
      "Booking an appointment was quick, effortless, and hassle-free.",
      "Seamless appointment scheduling process with instant confirmation.",
      "Very smooth booking with zero scheduling friction.",
      "The appointment booking process was clear, fast, and simple.",
      "Reservation was handled promptly without any administrative hassle."
    ],
    good_explanation: [
      "The doctor explained every procedure step with great clarity.",
      "Thorough explanation provided before and after treatment.",
      "All my questions were answered clearly, patiently, and thoroughly.",
      "The dentist took time to walk me through the treatment plan in detail.",
      "I really appreciated how clearly every aspect of my dental health was explained."
    ],
    modern_equipment: [
      "They utilize state-of-the-art dental tech and modern equipment.",
      "Impressed by the advanced, high-tech diagnostic tools available.",
      "The clinic is equipped with modern, top-tier machinery.",
      "The facility features cutting-edge dental technology and digital scanners.",
      "Modern diagnostic equipment made the examination quick and accurate."
    ],
    comfortable_environment: [
      "The ambience was soothing, warm, and highly comfortable.",
      "Relaxing clinic environment that eases dental anxiety completely.",
      "Very cozy, peaceful, and patient-friendly atmosphere.",
      "The clinic environment felt warm, welcoming, and very relaxing.",
      "A soothing atmosphere that makes you feel relaxed right away."
    ],
    child_friendly: [
      "Extremely patient, gentle, and wonderful with children.",
      "Great child-friendly approach that put my kid at ease instantly.",
      "Fantastic pediatric care with gentle and cheerful handling.",
      "The doctor treated my child with immense patience and care.",
      "Kids feel totally comfortable and safe receiving treatment here."
    ],
    short_waiting_time: [
      "Waiting time was minimal; I was attended to right on time.",
      "Prompt service with virtually no wait time at all.",
      "They adhered strictly to the appointment schedule without delay.",
      "I was taken into the consultation room exactly at my scheduled time.",
      "Zero unnecessary wait time, extremely punctual service."
    ],
    excellent_service: [
      "Overall service was exceptional from registration to discharge.",
      "Stellar patient care in every single aspect of the visit.",
      "Flawless service quality throughout my entire appointment.",
      "Unmatched level of service quality and patient care.",
      "Every detail of the patient experience was handled with excellence."
    ]
  },
  4: {
    friendly_doctor: [
      "The doctor was friendly, polite, and pleasant to talk to.",
      "The dentist was receptive to my questions and had good bedside manners.",
      "Dr. was polite and ensured I was comfortable."
    ],
    professional_staff: [
      "Staff members were professional, helpful, and cooperative.",
      "The receptionists and nursing team behaved politely.",
      "Good professionalism displayed by the support staff."
    ],
    clean_clinic: [
      "The clinic environment was clean, orderly, and neat.",
      "Good hygiene standards maintained throughout the premises.",
      "Clean and well-kept treatment facilities."
    ],
    painless_treatment: [
      "Treatment was smooth with very minimal discomfort.",
      "The procedure was carried out gently and comfortably.",
      "Felt quite comfortable during most of the procedure."
    ],
    affordable: [
      "Pricing was fair, reasonable, and aligned with expectations.",
      "Decent rates for the quality of care provided.",
      "Fair pricing structure with no hidden fees."
    ],
    easy_appointment: [
      "Appointment booking went smoothly without fuss.",
      "Setting up the appointment was straightforward.",
      "Easy and clear registration process."
    ],
    good_explanation: [
      "The doctor provided a good explanation of the treatment plan.",
      "Key procedure steps were communicated properly.",
      "Decent clarity provided on treatment options."
    ],
    modern_equipment: [
      "Modern equipment was used for the procedure.",
      "Good technological setup at the clinic.",
      "Up-to-date dental tools and instruments."
    ],
    comfortable_environment: [
      "The waiting area and clinic rooms were comfortable.",
      "Pleasant and calm clinical environment.",
      "Decent ambience with good seating."
    ],
    child_friendly: [
      "Good handling with kids and gentle demeanor.",
      "Patient with children during the visit.",
      "Child-friendly atmosphere and polite team."
    ],
    short_waiting_time: [
      "Waiting time was reasonable overall.",
      "Attended to within a short duration after arrival.",
      "Minimal delay before seeing the dentist."
    ],
    excellent_service: [
      "Service quality was good overall.",
      "Satisfying service experience throughout.",
      "Good patient care provided overall."
    ]
  },
  3: {
    friendly_doctor: [
      "The doctor was polite, though consultations felt a bit brief.",
      "Dentist was okay, but could spend slightly more time explaining.",
      "Doctor was pleasant enough during the visit."
    ],
    professional_staff: [
      "Staff were okay, though reception coordination could be better.",
      "Staff members were standard in their approach.",
      "Cooperative staff, though somewhat busy."
    ],
    clean_clinic: [
      "Clinic cleanliness was fine overall.",
      "Facility hygiene was acceptable.",
      "Decent cleanliness standards maintained."
    ],
    painless_treatment: [
      "Treatment was okay, though I felt slight discomfort at times.",
      "Procedure was tolerable overall.",
      "Treatment went fine with minor sensitivity."
    ],
    affordable: [
      "Pricing was average, though some costs could be clearer.",
      "Standard rates overall for dental procedures.",
      "Fairly priced, though estimates could be better communicated."
    ],
    easy_appointment: [
      "Booking was alright, though response time was a bit slow.",
      "Standard appointment booking procedure.",
      "Appointment setup was okay."
    ],
    good_explanation: [
      "Explanation was basic but covered the essentials.",
      "Treatment details were shared, though briefly.",
      "Moderate explanation provided on the issue."
    ],
    modern_equipment: [
      "Equipment seemed standard and functional.",
      "Decent technological infrastructure.",
      "Acceptable equipment setup."
    ],
    comfortable_environment: [
      "Environment was okay, though waiting area got crowded.",
      "Standard waiting area setup.",
      "Acceptable clinical environment."
    ],
    child_friendly: [
      "Handling with children was alright.",
      "Decent approach with younger patients.",
      "Fairly patient with kids."
    ],
    short_waiting_time: [
      "Waiting time was moderate, slightly longer than scheduled.",
      "Had to wait around 20-30 minutes before turn.",
      "Delay was noticeable but tolerable."
    ],
    excellent_service: [
      "Service was average overall.",
      "Decent service with room for minor tweaks.",
      "Standard service experience."
    ]
  },
  2: {
    friendly_doctor: [
      "The doctor was polite, but communication was lacking.",
      "Doctor was brief and rushed through consultation.",
      "Felt the doctor could be more attentive."
    ],
    professional_staff: [
      "Staff communication needs improvement.",
      "Reception staff appeared disorganized.",
      "Staff coordination was subpar."
    ],
    clean_clinic: [
      "Cleanliness was basic, but waiting areas needed attention.",
      "Clinic hygiene could be improved.",
      "Sanitation was below expectation."
    ],
    painless_treatment: [
      "Felt noticeable discomfort during procedure.",
      "Treatment was rougher than I hoped.",
      "Discomfort during treatment could be managed better."
    ],
    affordable: [
      "Pricing felt steep for the level of service delivered.",
      "Cost was higher than expected given the experience.",
      "Billing transparency was lacking."
    ],
    easy_appointment: [
      "Appointment booking was confusing and slow.",
      "Scheduling issues caused confusion at arrival.",
      "Booking process needs improvement."
    ],
    good_explanation: [
      "Very little explanation was given regarding treatment.",
      "Treatment details were not clearly conveyed.",
      "Lack of clear explanation left me confused."
    ],
    modern_equipment: [
      "Equipment seemed adequate, but facilities felt dated.",
      "Setup could use modern upgrades.",
      "Facility technology seemed basic."
    ],
    comfortable_environment: [
      "Waiting area was cramped and noisy.",
      "Environment was far from relaxing.",
      "Ambience needs better management."
    ],
    child_friendly: [
      "Approach with children lacked patience.",
      "Could be much more gentle with younger patients.",
      "Not ideal for child appointments."
    ],
    short_waiting_time: [
      "Waiting time was unexpectedly long.",
      "Faced significant delays before seeing the dentist.",
      "Wait time was annoying."
    ],
    excellent_service: [
      "Service fell below expectations.",
      "Service quality requires attention.",
      "Overall service was disappointing."
    ]
  },
  1: {
    friendly_doctor: [
      "The doctor was unresponsive to concerns and rushed.",
      "Consultation was brief and lacked empathy.",
      "Doctor showed little interest in addressing questions."
    ],
    professional_staff: [
      "Staff was unhelpful and disorganized.",
      "Poor support and rude response from front desk staff.",
      "Staff behavior was disappointing and uncoordinated."
    ],
    clean_clinic: [
      "Cleanliness in waiting and treatment areas was lacking.",
      "Hygiene standards were below acceptable medical levels.",
      "Facility cleanliness requires immediate attention."
    ],
    painless_treatment: [
      "Procedure caused significant pain and discomfort.",
      "Treatment was uncomfortable and handled roughly.",
      "Poor pain management during procedure."
    ],
    affordable: [
      "Overpriced considering the disappointing experience.",
      "Unclear billing with hidden costs.",
      "Felt service was not worth money charged."
    ],
    easy_appointment: [
      "Appointment system failed to log booking correctly.",
      "Severe miscommunication regarding appointment timing.",
      "Chaotic reservation management."
    ],
    good_explanation: [
      "No explanation was provided before or during treatment.",
      "Left in dark regarding post-care instructions.",
      "Complete lack of clarity regarding procedure steps."
    ],
    modern_equipment: [
      "Equipment felt outdated and maintenance seemed lacking.",
      "Facility tools appeared worn out.",
      "Tech infrastructure needs serious updating."
    ],
    comfortable_environment: [
      "Environment was noisy, crowded, and uncomfortable.",
      "Lobby area was unorganized and stressful.",
      "Far from a comfortable healthcare setting."
    ],
    child_friendly: [
      "Unsuited for children; handling was impatient.",
      "Lacked basic pediatric care awareness.",
      "Child had a very uncomfortable visit."
    ],
    short_waiting_time: [
      "Waited an unacceptable amount of time.",
      "Extreme delay before seeing the doctor.",
      "Schedule was completely ignored with long waiting."
    ],
    excellent_service: [
      "Service quality was poor across the board.",
      "Overall experience was very disappointing.",
      "Flawed service quality throughout."
    ]
  }
};

// ==========================================================================
// 5. GENERAL SECTION POOLS (USED WHEN NO HIGHLIGHTS OR FOR EXTRA LENGTH)
// ==========================================================================
const GENERAL_SECTIONS = {
  5: {
    experience: [
      "The quality of care provided here is truly commendable.",
      "Every aspect of my visit was handled with extreme care.",
      "I was impressed by the high standards maintained throughout the clinic.",
      "The entire process was smooth, professional, and comforting."
    ],
    doctor: [
      "The dentist was highly skilled, patient, and thorough.",
      "Doctor demonstrated great expertise and gentle handling.",
      "The dentist explained every aspect of the treatment reassuringly.",
      "I felt completely confident in the doctor's capabilities."
    ],
    staff: [
      "The support staff and receptionists were extremely polite and helpful.",
      "From the front desk to the dental assistants, everyone was warm and professional.",
      "The administrative team ensured a smooth check-in and checkout process."
    ],
    clinic: [
      "The clinic is spotlessly clean, well-lit, and equipped with modern facilities.",
      "Hygiene and cleanliness standards at the hospital were impeccable.",
      "The premises are modern, sterile, and very comforting."
    ]
  },
  4: {
    experience: [
      "The overall experience was very good and dependable.",
      "I had a pleasant appointment with good outcomes.",
      "The clinic provided quality healthcare service."
    ],
    doctor: [
      "The doctor was competent, gentle, and addressed my concerns.",
      "The dentist carried out the procedure professionally.",
      "I felt well-guided by the attending doctor."
    ],
    staff: [
      "The staff members were polite and cooperative.",
      "Reception team handled my registration smoothly.",
      "The clinic staff maintained good decorum."
    ],
    clinic: [
      "The clinic was neat and well-maintained.",
      "Clean facilities and organized setup.",
      "Good hygiene observed throughout."
    ]
  },
  3: {
    experience: [
      "The visit was satisfactory overall, though wait times were noticeable.",
      "Treatment quality was acceptable, though administrative flow could be improved.",
      "A fair appointment experience overall."
    ],
    doctor: [
      "The doctor did a fine job, though consultation felt slightly brief.",
      "Dentist was competent, though explanations were basic.",
      "Doctor was okay during the examination."
    ],
    staff: [
      "Staff was standard in their demeanor.",
      "Reception was busy, but managed adequately.",
      "Staff members were okay overall."
    ],
    clinic: [
      "Cleanliness was acceptable, though waiting area was crowded.",
      "Clinic facilities were adequate.",
      "Fair clinic environment overall."
    ]
  },
  2: {
    experience: [
      "The appointment took longer than expected due to administrative delays.",
      "The service level fell short of what I anticipated.",
      "The overall visit was frustrating due to poor timing."
    ],
    doctor: [
      "The doctor rushed through consultation without addressing all my questions.",
      "Doctor's communication was quite brief and lacked detail.",
      "Felt the doctor was in a hurry during my visit."
    ],
    staff: [
      "The front office staff appeared unorganized.",
      "Communication at the reception desk was lacking.",
      "Staff coordination was disappointing."
    ],
    clinic: [
      "Waiting room was noisy and crowded.",
      "Clinic cleanliness needed more attention.",
      "The environment felt chaotic."
    ]
  },
  1: {
    experience: [
      "The entire visit was disorganized and frustrating.",
      "Service quality was unacceptable from start to finish.",
      "My appointment was severely delayed without any proper updates."
    ],
    doctor: [
      "The doctor showed very little empathy or patient attention.",
      "Consultation was completely rushed and unhelpful.",
      "The dentist failed to explain the treatment steps clearly."
    ],
    staff: [
      "Staff behavior was uncooperative and rude.",
      "Front desk reception was chaotic and unhelpful.",
      "Staff members ignored patient inquiries."
    ],
    clinic: [
      "Cleanliness standards were far below expectations.",
      "Waiting area was cramped, unorganized, and messy.",
      "The facility hygiene required urgent attention."
    ]
  }
};

// ==========================================================================
// 6. MEMORY & DUPLICATE PREVENTION SYSTEM (LAST 100 REVIEWS, 60% SIMILARITY)
// ==========================================================================
const RECENT_REVIEWS_MEMORY_LIMIT = 100;
let recentReviewsMemory = [];

function calculateWordSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  const words2 = new Set(text2.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  if (words1.size === 0 || words2.size === 0) return 0;
  
  let intersection = 0;
  words1.forEach(w => {
    if (words2.has(w)) intersection++;
  });
  
  const union = new Set([...words1, ...words2]).size;
  return intersection / union;
}

function isDuplicateOrSimilar(newText) {
  for (let pastReview of recentReviewsMemory) {
    if (calculateWordSimilarity(newText, pastReview) > 0.60) {
      return true;
    }
  }
  return false;
}

function recordReviewInMemory(reviewText) {
  recentReviewsMemory.push(reviewText);
  if (recentReviewsMemory.length > RECENT_REVIEWS_MEMORY_LIMIT) {
    recentReviewsMemory.shift();
  }
}

// ==========================================================================
// 7. APPLICATION STATE & DOM REFERENCES
// ==========================================================================
let state = {
  currentStep: 1,
  rating: 0,
  selectedChips: new Set(),
  customReviewText: "",
  isEdited: false
};

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
  
  // Step 1
  starsContainer: document.getElementById("stars-container"),
  starBtns: document.querySelectorAll(".star-btn"),
  ratingText: document.getElementById("rating-text"),
  toStep2Btn: document.getElementById("to-step-2"),
  
  // Step 2
  chipsGrid: document.getElementById("chips-grid"),
  chipCards: document.querySelectorAll(".chip-card"),
  backToStep1Btn: document.getElementById("back-to-step-1"),
  toStep3Btn: document.getElementById("to-step-3"),
  
  // Step 3
  reviewTextarea: document.getElementById("review-textarea"),
  charCounter: document.getElementById("char-counter"),
  copyBtn: document.getElementById("copy-btn"),
  clearBtn: document.getElementById("clear-btn"),
  googleReviewLink: document.getElementById("google-review-link"),
  backToStep2Btn: document.getElementById("back-to-step-2"),
  
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

// ==========================================================================
// HELPER UTILITIES
// ==========================================================================
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

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// ==========================================================================
// 8. DYNAMIC REVIEW GENERATION ENGINE
// ==========================================================================
function generateReview() {
  const rating = state.rating || 5;
  const selectedChips = Array.from(state.selectedChips);
  
  let finalReview = "";
  const maxAttempts = 35;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // 1. Pick Opening sentence (Rating specific, 50+ options)
    const openingOptions = OPENINGS[rating] || OPENINGS[5];
    const opening = getRandomElement(openingOptions);
    
    // 2. Pick Closing sentence (Rating specific, 40+ options)
    const closingOptions = CLOSINGS[rating] || CLOSINGS[5];
    const closing = getRandomElement(closingOptions);
    
    // 3. Determine Review Target Length randomly ('short', 'medium', 'long')
    const lengths = ["short", "medium", "long"];
    const targetLengthCategory = getRandomElement(lengths);
    
    // 4. Gather Content Sentences based ON SELECTED HIGHLIGHTS ONLY
    const contentSentences = [];
    const ratingChipPhrases = CHIP_PHRASES[rating] || CHIP_PHRASES[5];
    
    if (selectedChips.length > 0) {
      // ONLY include sentences for highlights SELECTED by patient
      selectedChips.forEach(chipId => {
        const phrases = ratingChipPhrases[chipId];
        if (phrases && phrases.length > 0) {
          contentSentences.push(getRandomElement(phrases));
        }
      });
    } else {
      // NO HIGHLIGHTS SELECTED: Pick general section sentences matching rating
      const gen = GENERAL_SECTIONS[rating] || GENERAL_SECTIONS[5];
      contentSentences.push(getRandomElement(gen.experience));
      contentSentences.push(getRandomElement(gen.doctor));
      contentSentences.push(getRandomElement(gen.clinic));
    }
    
    // 5. Optional Personal Experience (~35% chance)
    let personalSentence = "";
    if (Math.random() < 0.35) {
      personalSentence = getRandomElement(PERSONAL_EXPERIENCES);
    }
    
    // 6. Assemble Sentence Array & Randomize Order
    const middleParts = shuffleArray(contentSentences);
    
    let reviewParts = [];
    reviewParts.push(opening);
    
    if (personalSentence) {
      // Insert personal sentence either right after opening or in middle
      if (Math.random() < 0.5) {
        reviewParts.push(personalSentence);
        reviewParts.push(...middleParts);
      } else {
        reviewParts.push(...middleParts);
        reviewParts.push(personalSentence);
      }
    } else {
      reviewParts.push(...middleParts);
    }
    
    reviewParts.push(closing);
    
    // Trim according to target length category
    if (targetLengthCategory === "short" && reviewParts.length > 3) {
      reviewParts = [opening, getRandomElement(middleParts) || closing, closing];
    }
    
    let candidateText = reviewParts.join(" ").replace(/\s+/g, " ").trim();
    
    // Check word count suitability
    const wCount = countWords(candidateText);
    
    // Check against memory for similarity > 60%
    if (!isDuplicateOrSimilar(candidateText)) {
      finalReview = candidateText;
      break;
    }
  }
  
  if (!finalReview) {
    // Fallback if all attempts had similarity > 60%
    const opening = getRandomElement(OPENINGS[rating]);
    const closing = getRandomElement(CLOSINGS[rating]);
    finalReview = `${opening} ${closing}`;
  }
  
  recordReviewInMemory(finalReview);
  state.customReviewText = finalReview;
  dom.reviewTextarea.value = finalReview;
  updateCharCounter();
}

function updateCharCounter() {
  const len = dom.reviewTextarea.value.length;
  dom.charCounter.textContent = `${len} / 500`;
}

// ==========================================================================
// 9. THEME MANAGEMENT & EVENT HANDLERS
// ==========================================================================
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

function initStars() {
  dom.starBtns.forEach(btn => {
    const val = parseInt(btn.dataset.value, 10);
    
    btn.addEventListener("mouseenter", () => highlightStarsToValue(val));
    btn.addEventListener("mouseleave", () => highlightStarsToValue(state.rating));
    
    btn.addEventListener("click", () => {
      setRating(val);
      highlightStarsToValue(val);
      
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
  
  dom.starBtns.forEach((btn, index) => {
    const btnVal = parseInt(btn.dataset.value, 10);
    const svg = btn.querySelector("svg");
    if (btnVal <= ratingVal) {
      btn.classList.add("selected");
      if (svg) svg.style.animationDelay = `${index * 50}ms`;
    } else {
      btn.classList.remove("selected");
      if (svg) svg.style.animationDelay = "";
    }
  });

  dom.toStep2Btn.disabled = false;
  
  const ratingTextVal = RATING_TEXTS[ratingVal];
  dom.ratingText.classList.remove("animate-in");
  
  setTimeout(() => {
    dom.ratingText.textContent = ratingTextVal;
    dom.ratingText.classList.add("has-value", "animate-in");
  }, 150);
  
  generateReview();
}

function initChips() {
  dom.chipCards.forEach(card => {
    const chipId = card.dataset.id;
    
    const toggleChip = () => {
      card.classList.toggle("selected");
      
      if (state.selectedChips.has(chipId)) {
        state.selectedChips.delete(chipId);
        card.setAttribute("aria-checked", "false");
      } else {
        state.selectedChips.add(chipId);
        card.setAttribute("aria-checked", "true");
      }
      
      generateReview();
    };

    card.addEventListener("click", toggleChip);
    
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleChip();
      }
    });
  });
}

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
      console.warn("Failed to open direct review URL: ", err);
      window.location.href = GOOGLE_MAPS_FALLBACK_URL;
    }
  });
}

function initNavigation() {
  dom.toStep2Btn.addEventListener("click", () => goToStep(2));
  dom.backToStep1Btn.addEventListener("click", () => goToStep(1));
  dom.toStep3Btn.addEventListener("click", () => goToStep(3));
  dom.backToStep2Btn.addEventListener("click", () => goToStep(2));
  
  dom.stepNodes.forEach(node => {
    const targetStep = parseInt(node.dataset.step, 10);
    node.addEventListener("click", () => {
      if (targetStep === 1) goToStep(1);
      else if (targetStep === 2 && state.rating > 0) goToStep(2);
      else if (targetStep === 3 && state.rating > 0) goToStep(3);
    });
  });
}

function goToStep(stepNumber) {
  state.currentStep = stepNumber;
  updateStepUI();
}

function updateStepUI() {
  dom.stepPanels.forEach((panel, index) => {
    const stepVal = index + 1;
    if (stepVal === state.currentStep) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });
  
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
  
  let pct = 0;
  if (state.currentStep === 1) pct = 0;
  else if (state.currentStep === 2) pct = 50;
  else if (state.currentStep === 3) pct = 100;
  dom.progressLine.style.setProperty("--progress-pct", `${pct}%`);
  
  let stepText = "Step 1 of 3 &bull; Rate Experience";
  if (state.currentStep === 2) stepText = "Step 2 of 3 &bull; Select Highlights";
  else if (state.currentStep === 3) stepText = "Step 3 of 3 &bull; Review & Share";
  dom.stepTextIndicator.innerHTML = stepText;
}

let toastTimeout;
function showToast(message) {
  clearTimeout(toastTimeout);
  dom.toast.querySelector(".toast-message").textContent = message;
  dom.toast.classList.add("show");
  toastTimeout = setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 2500);
}

function resetState() {
  state.rating = 0;
  state.selectedChips.clear();
  state.customReviewText = "";
  state.isEdited = false;
  recentReviewsMemory = [];
  
  dom.starBtns.forEach(btn => {
    btn.classList.remove("selected", "hovered");
    const svg = btn.querySelector("svg");
    if (svg) svg.style.animationDelay = "";
  });
  dom.toStep2Btn.disabled = true;
  dom.ratingText.textContent = "Tap to rate";
  dom.ratingText.classList.remove("has-value", "animate-in");
  
  dom.chipCards.forEach(card => {
    card.classList.remove("selected");
    card.setAttribute("aria-checked", "false");
  });
  
  dom.reviewTextarea.value = "";
  updateCharCounter();
  
  goToStep(1);
  showToast("Selections cleared successfully!");
}
