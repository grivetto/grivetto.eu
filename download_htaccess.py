import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def download_htaccess():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print("Downloading .htaccess...")
        with open("downloaded_htaccess.txt", "wb") as f:
            ftp.retrbinary("RETR /www.grivetto.eu/.htaccess", f.write)
        
        print("Download complete.")
        
        with open("downloaded_htaccess.txt", "r", encoding="utf-8") as f:
            content = f.read()
            print("\n.htaccess content:")
            print(content)
            
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    download_htaccess()
