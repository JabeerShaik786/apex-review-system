# Apex Dental Hospital Review Assistant

A modern, mobile-first, and fully responsive QR-based review system designed for **Apex Dental Hospital**. This application allows patients to quickly rate their dental appointment, select highlight tags of their experience, and automatically compile a personalized, natural-sounding review ready to be copied and posted directly onto the hospital's Google Business Profile.

The application operates completely on the client side (offline-first) with zero external APIs, database dependencies, or backend requirements.

---

## 🌟 Features

- **Branded Design System**: High-quality healthcare aesthetics utilizing Apex Dental Hospital's brand colors: **Primary Teal (`#01B5B2`)**, **Accent Orange (`#FE7608`)**, and dark/light modes.
- **Three-Step Stepper Wizard**: Intuitive progress flow:
  1. **Rate Experience**: Interactive 5-star rating with smooth scale, bounce animations, and glow effects. Includes dynamic feedback tags (e.g. 5 stars -> "Excellent", 1 star -> "Needs Improvement").
  2. **Select Highlights**: Selection card grid with crisp, outline-only SVG icons representing dentist features (painless treatment, friendly doctor, modern equipment, etc.).
  3. **Review & Share**: Instantly generates an editable review inside a custom character-counted textarea. Includes copy-to-clipboard functionality and a direct CTA link to write a Google review.
- **Defensive Google Redirection**: Attempts to open the direct Google "Write a Review" dialog in a new browser tab. If blocked by mobile in-app browsers or popup blockers, it automatically redirects the current page to the official Google Maps search page as a fallback.
- **Dynamic Local QR Code**: Dynamically renders a QR code of the current app URL. Staff can display this code at the reception desk for patients to scan.
- **Confetti Celebration**: Spawns a custom lightweight canvas confetti particle storm when a patient awards a 5-star rating.
- **Full Theme Customization**: Custom toggle switcher for light and dark modes with cached user preferences.
- **Responsive Layout**: Pixel-perfect grid rendering across mobile (stacked layouts), tablet (3 columns), and desktop (4 columns with sidebar hero layout).

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags, accessibility elements (ARIA labels, keyboard navigation).
- **Vanilla CSS**: Custom CSS Properties (Variables), custom keyframe animations, flexible grids, and flexbox structures.
- **JavaScript (ES6+)**: Custom state management, click event handlers, canvas particle rendering, and clipboard API integrations.
- **QRCode.js**: A local, zero-dependency minified script for offline QR code rendering.

---

## 📂 Folder Structure

```text
apex-review-system/
├── apexlogo.png          # Official Apex Dental Hospital Logo
├── app.js               # Application state, rating logic, and canvas confetti
├── index.html           # Main structure and SVG icons
├── package.json         # Scripts and package definitions
├── qrcode.min.js        # Offline QR code generator library
├── README.md            # Project documentation
├── style.css            # Custom design tokens, dark mode override, and grids
└── .gitignore           # Ignored files and folders
```

---

## 🚀 Installation & Local Development

### Prerequisites

You need [Node.js](https://nodejs.org/) installed locally.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JabeerShaik786/apex-review-system.git
   cd apex-review-system
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📝 Usage for Staff & Patients

1. Serve the application at the hospital (e.g., local server or hosted site).
2. Patients scan the printed QR code displayed at the reception counter.
3. Patients select a star rating and tap highlights they liked.
4. The system automatically formats the review.
5. Patients can make final edits in the textarea, click **Copy Review**, and click **Write Google Review** to paste it directly onto the Google listing.

---

## 🔮 Future Enhancements

- **Multilingual Support**: Add language options (e.g., Spanish, Telugu, Hindi) for generating reviews in different languages.
- **Analytics Dashboard**: Add a localized privacy-preserving tracker to count how many reviews are generated and copied.
- **Direct SMS/WhatsApp Invite**: Allow front desk staff to text the review link to the patient's phone.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE details for info.
