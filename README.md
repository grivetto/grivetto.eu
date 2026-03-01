# Grivetto.eu

Welcome to the official repository for **grivetto.eu**. This project represents the modern web presence for the Grivetto brand, built with cutting-edge web technologies and robust automation tools.

## 🚀 Technology Stack

This project is built with a high-performance React frontend using modern tooling.

### **Frontend**
*   **Framework:** [React 19](https://react.dev/) - The library for web and native user interfaces.
*   **Build Tool:** [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
*   **Animation:** [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library for React.
*   **Styling:** Modern CSS3 with responsive design principles (Glassmorphism, Neon/Cyberpunk aesthetics).

---

## ✨ Features & Applications

### **1. Interactive Web Terminal**
A fully simulated SSH-style terminal experience built with `xterm.js`.
*   **Access:** Click "System Admin" on the home page.
*   **Commands:** Supports `ls`, `cat`, `whoami`, `neofetch`, and more.
*   **Theme:** Retro CRT styling with scanlines and glow effects.

### **2. Multi-Language Support (En/It/Es)**
Integrated i18n system supporting **English**, **Italian**, and **Spanish**.
*   **Toggle:** Seamless cycling between flags in the navigation bar.
*   **Dynamic Metadata:** SEO tags and Open Graph data update automatically based on the active language.

### **3. SEO & Social Integration**
Optimized for search engines and social platforms:
*   **Meta Tags:** Refined titles and descriptions for maximum SERP impact, including JSON-LD structured data.
*   **Social Profiles:** Direct integration with LinkedIn, GitHub, Facebook, X, Instagram, and YouTube.
*   **Centralized Links:** Social links are centralized in the i18n system for consistency across the main site and the **Aura** sub-project.
*   **Marketing Tools:** Ready-to-use placeholders for Google Tag Manager and Facebook Pixel.

### **4. Unified Project Interface**
*   **Design:** A single "Glassmorphism" block consolidating all project cards (Aura, Web Apps, Portfolio) for a cleaner UI.
*   **Quick Actions:** Direct launch buttons for all apps (Neon Tunnel, Tic-Tac-Toe, Tetris) and resources (Resume, Aura Live).

---

## 🛠️ Local Development

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/grivetto/grivetto.eu.git
    cd grivetto.eu
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```

## 📦 Deployment

The project includes an automated Python script for FTP deployment.

1.  **Build the project**
    ```bash
    npm run build
    ```

2.  **Deploy to FTP**
    ```bash
    python scripts/deploy_ftp.py
    ```

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.

### Latest Updates:
- **2026-03-01**: Removed Beautiness, Electrician, JustSoap, Hair Artist, and Autoscuola Demo links to reduce Netlify costs.
- **2026-02-28**: Added "Serenissima" (`https://serenissima99.it/`) to the Live Businesses links.
- **2026-02-28**: Added the "Estetica" (`https://grivetto.github.io/estetica/`) link to the Web Project Examples section across all supported languages.
- **2026-02-28**: Added the "Dr. Paws Clinic" (`https://dr-paws-veterinary-clinic-7744951827.us-west1.run.app/`) link to the Web Project Examples section.
- **2026-02-28**: Added the "Sevilla Luxury B&B" (`https://sevilla-luxury-b-b-102688887074.us-west1.run.app/`) link to the Web Project Examples section.
- **2026-02-28**: Updated the "GitHub Showcase" link on the Home page to direct to the new SOMS project page (`https://grivetto.github.io/soms/`).
- **2026-02-28**: Updated the company name in the Resume section to "NPO Torino" and added a direct link to `https://nposervices.com/`.
- **2026-02-28**: Updated the background Spline 3D animation on the Home page.
- **2026-02-28**: Added the "Autoscuola Demo" link (`https://autoscuolademo.netlify.app/`) alongside the existing DriveFlow Academy project.
- **2026-02-28**: Refactored the Web Project Examples section to use a two-column grid layout.
- **2026-02-28**: Added "Vivirito" (`https://vivirito.it/`) to the Live Businesses links.

---
*Maintained by Sergio Grivetto*

