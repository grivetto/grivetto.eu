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

### **2. Cosmic Curiosity**
A lightweight "Fact of the Day" application.
*   **Features:** Fetches daily space facts with particle confetti animations.
*   **Localization:** Fully translated to Italian.

### **3. Support Systems Integration**
Seamless integration with external tools via custom wrappers:
*   **HESK:** Embedded Help Desk system.
*   **Terminal Session:** High-fidelity, full-screen playback of real terminal sessions (using Asciinema).

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
*Maintained by Sergio Grivetto*

