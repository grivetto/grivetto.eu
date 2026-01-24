import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def list_root_files():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print("\nListing files in /www.grivetto.eu/:")
        ftp.cwd("/www.grivetto.eu")
        files = []
        ftp.retrlines('LIST', files.append)
        
        # Save to file
        with open("ftp_listing.txt", "w", encoding="utf-8") as f:
            for file in files:
                f.write(file + "\n")
                print(file)
        
        print(f"\nTotal files: {len(files)}")
        print("Saved to ftp_listing.txt")
        
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_root_files()
