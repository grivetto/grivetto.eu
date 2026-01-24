import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def download_index_php():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print("Downloading index.php...")
        with open("downloaded_index.php", "wb") as f:
            ftp.retrbinary("RETR /www.grivetto.eu/index.php", f.write)
        
        print("Download complete.")
        
        with open("downloaded_index.php", "r", encoding="utf-8") as f:
            content = f.read()
            print("\nindex.php content (first 500 chars):")
            print(content[:500])
            
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    download_index_php()
