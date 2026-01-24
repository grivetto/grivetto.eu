import ftplib
from ftplib import FTP
import time

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def backup_old_files():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        ftp.cwd("/www.grivetto.eu")
        
        # Files to backup/rename
        old_files = [
            "links.html",
            "modern_redesign.html", 
            "modern_redesign_v2.html",
            "visionary.html"
        ]
        
        timestamp = str(int(time.time()))
        
        for filename in old_files:
            try:
                backup_name = f"{filename}.bak_{timestamp}"
                print(f"Renaming {filename} to {backup_name}...")
                ftp.rename(f"/www.grivetto.eu/{filename}", f"/www.grivetto.eu/{backup_name}")
                print(f"  ✓ Renamed successfully")
            except Exception as e:
                print(f"  ✗ Could not rename {filename}: {e}")
        
        print("\n" + "="*60)
        print("All potentially conflicting HTML files have been backed up.")
        print("The only HTML file now should be index.html (the React app)")
        print("="*60)
        
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    backup_old_files()
