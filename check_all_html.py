import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def check_all_html_files():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        ftp.cwd("/www.grivetto.eu")
        
        # Check for all HTML files
        html_files = []
        all_files = []
        ftp.retrlines('LIST', all_files.append)
        
        for line in all_files:
            if '.html' in line or '.htm' in line:
                html_files.append(line)
                print(line)
        
        print(f"\nFound {len(html_files)} HTML files")
        
        # Download and check index.html specifically
        print("\n" + "="*60)
        print("Checking index.html content:")
        print("="*60)
        
        with open("current_index.html", "wb") as f:
            ftp.retrbinary("RETR /www.grivetto.eu/index.html", f.write)
        
        with open("current_index.html", "r", encoding="utf-8") as f:
            content = f.read()
            print(f"File size: {len(content)} bytes")
            print("\nFirst 300 characters:")
            print(content[:300])
            
            # Check for key identifiers
            if "Bridging Technology and Mindfulness" in content:
                print("\n✅ NEW SITE - Contains 'Bridging Technology and Mindfulness'")
            elif "Peaceful Thoughts" in content and "Simple Ways" in content:
                print("\n❌ OLD SITE - Contains old 'Peaceful Thoughts' content")
            
            if '<div id="root">' in content:
                print("✅ React app detected")
            
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_all_html_files()
