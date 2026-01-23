import requests
import datetime
import xml.etree.ElementTree as ET
from playwright.sync_api import sync_playwright
import time

# ==========================================
# CONFIGURATION
# ==========================================
WP_LOGIN_URL = "https://grivetto.eu/wordpress/wp-login.php"
WP_ADMIN_URL = "https://grivetto.eu/wordpress/wp-admin/post-new.php"
WP_USER = "admin"
WP_PASS = "@Romeo_2030" 

# RSS Feeds for Sourcing
RSS_FEEDS = [
    "https://news.google.com/rss/search?q=manifestazioni+pace&hl=it&gl=IT&ceid=IT:it",
    "https://news.google.com/rss/search?q=peace+protests&hl=en-US&gl=US&ceid=US:en"
]

KEYWORDS = ["pace", "peace", "manifestazione", "protest", "corteo", "march", "sit-in"]

def fetch_news():
    """Fetches news from RSS feeds and filters them."""
    articles = []
    print("Searching for peace news...")
    
    for feed_url in RSS_FEEDS:
        try:
            response = requests.get(feed_url)
            if response.status_code == 200:
                root = ET.fromstring(response.content)
                for item in root.findall('.//item'):
                    title = item.find('title').text
                    link = item.find('link').text
                    description = item.find('description').text
                    
                    if any(keyword in title.lower() for keyword in KEYWORDS):
                        articles.append({
                            'title': title,
                            'link': link,
                            'description': description
                        })
        except Exception as e:
            print(f"Error fetching feed {feed_url}: {e}")
            
    print(f"Found {len(articles)} potential articles.")
    return articles[:10] 

def run_automation():
    articles = fetch_news()
    if not articles:
        print("No relevant news found today.")
        return

    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        
        # 1. Login (Once)
        print("Logging in...")
        page.goto(WP_LOGIN_URL)
        page.fill('#user_login', WP_USER)
        page.fill('#user_pass', WP_PASS)
        page.click('#wp-submit')
        page.wait_for_load_state('networkidle')
        
        for article in articles:
            print(f"\nProcessing: {article['title']}")
            try:
                # 2. Start Fresh Post
                page.goto(WP_ADMIN_URL)
                page.wait_for_load_state('domcontentloaded')
                time.sleep(3)

                # Handle "Welcome" modal
                if page.get_by_label("Close dialog").is_visible():
                    page.get_by_label("Close dialog").click()
                
                # 3. Switch to Code Editor (Reliable for HTML)
                print("Switching to Code Editor...")
                code_editor_active = False
                try:
                    # Try to find the Options button (three dots)
                    options_btn = None
                    if page.get_by_role("button", name="Options").is_visible():
                        options_btn = page.get_by_role("button", name="Options")
                    elif page.get_by_role("button", name="Opzioni").is_visible():
                        options_btn = page.get_by_role("button", name="Opzioni")
                    elif page.locator('.interface-more-menu-dropdown__toggle').is_visible():
                        options_btn = page.locator('.interface-more-menu-dropdown__toggle')
                    
                    if options_btn:
                        options_btn.click()
                        time.sleep(1)
                        # Click Code editor
                        if page.get_by_role("menuitemcheckbox", name="Code editor").is_visible():
                            page.get_by_role("menuitemcheckbox", name="Code editor").click()
                            code_editor_active = True
                        elif page.get_by_role("menuitemcheckbox", name="Editor del codice").is_visible():
                            page.get_by_role("menuitemcheckbox", name="Editor del codice").click()
                            code_editor_active = True
                        else:
                            print("Code editor menu item not found.")
                            page.keyboard.press("Escape") # Close menu
                    else:
                        print("Options button not found.")
                except Exception as e:
                    print(f"Could not switch to Code Editor: {e}")

                # 4. Fill Title
                print("Typing title...")
                # In Code Editor, title is still a textarea or input
                # Try generic robust selectors
                title_typed = False
                if page.get_by_label("Add title").is_visible():
                    page.get_by_label("Add title").fill(article['title'])
                    title_typed = True
                elif page.get_by_label("Aggiungi titolo").is_visible():
                    page.get_by_label("Aggiungi titolo").fill(article['title'])
                    title_typed = True
                else:
                    # Fallback to visual click
                    page.mouse.click(500, 200)
                    page.keyboard.type(article['title'])
                    title_typed = True

                # 5. Fill Content (HTML)
                print("Typing HTML content...")
                content_html = f"""
                <p><strong>News detected on:</strong> {datetime.datetime.now().strftime('%Y-%m-%d')}</p>
                <p>{article['description']}</p>
                <p>Source: <a href="{article['link']}">{article['link']}</a></p>
                """
                
                if code_editor_active:
                    # Try to find the code editor textarea
                    try:
                        page.locator('.editor-post-text-editor').fill(content_html)
                    except:
                        # Fallback: Tab navigation
                        page.keyboard.press("Tab")
                        page.keyboard.type(content_html)
                else:
                    # Fallback: Use Custom HTML Block
                    print("Code Editor not active. Using Custom HTML Block...")
                    try:
                        # Click Add Block (plus icon)
                        # Usually top left or in content
                        page.keyboard.press("Enter") # Move to content area
                        page.keyboard.type("/html") # Slash command for HTML block
                        time.sleep(1)
                        page.keyboard.press("Enter") # Select it
                        time.sleep(0.5)
                        page.keyboard.type(content_html)
                    except Exception as e:
                        print(f"Failed to insert Custom HTML block: {e}")
                        # Last resort: Just type text
                        page.keyboard.type(content_html)

                # 6. Save Draft
                print("Saving draft...")
                # Exit Code Editor to ensure save button works normally? 
                # Usually save works in code editor too.
                
                save_btn = page.get_by_role("button", name="Salva bozza")
                if not save_btn.is_visible():
                    save_btn = page.get_by_role("button", name="Save draft")
                
                if save_btn.is_visible():
                    save_btn.click()
                    time.sleep(3) # Wait for save
                    print("Draft saved.")
                else:
                    print("Save button not found.")
                    page.screenshot(path=f"error_save_{article['title'][:10]}.png")

            except Exception as e:
                print(f"Error processing article: {e}")
                page.screenshot(path=f"error_general_{article['title'][:10]}.png")
        
        print("\nAll done. Closing browser.")
        browser.close()

if __name__ == "__main__":
    run_automation()
