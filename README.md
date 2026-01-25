# Grivetto.eu

Welcome to the official repository for **grivetto.eu**. This project represents the modern web presence for the Grivetto brand, built with cutting-edge web technologies and robust automation tools.

## 🚀 Technology Stack

This project leverages a hybrid stack combining a high-performance React frontend with powerful Python-based automation for content management and deployment.

### **Frontend**
*   **Framwork:** [React 19](https://react.dev/) - The library for web and native user interfaces.
*   **Build Tool:** [Vite](https://vitejs.dev/) (Rolldown) - Next Generation Frontend Tooling.
*   **Animation:** [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library for React.
*   **Styling:** Modern CSS3 with responsive design principles.

### **Automation & DevOps**
The project includes a suite of custom Python scripts in the root directory to handle deployment and content updates:
*   **Language:** Python 3.x
*   **Browser Automation:** [Playwright](https://playwright.dev/) - Used for the "Peace News Automation" bot (`peace_news_browser.py`) to bypass API restrictions and manage WordPress content authentically.
*   **Deployment:** Custom Python scripts (`deploy_ftp.py`, `upload_index.py`) for direct FTP synchronization.
*   **Legacy Support:** PHP integration scripts for maintaining compatibility with older server modules.

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

## 🤖 Automation Scripts

### Peace News Bot
Located in `peace_news_browser.py`, this tool automates the gathering and posting of peace-related news to the site's blog section.
*   **Setup:** Requires `pip install requests playwright`.
*   **Run:** `python peace_news_browser.py`

## 📂 Project Structure

*   `src/` - React source code (Components, Pages, Assets).
*   `public/` - Static assets.
*   `conductor/` - Project management and track files.
*   `*.py` - Root level automation and utility scripts.

---
*Maintained by Sergio Grivetto*
