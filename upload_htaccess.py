import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def upload_htaccess():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print("Uploading .htaccess...")
        with open(".htaccess", "rb") as f:
            ftp.storbinary("STOR /www.grivetto.eu/.htaccess", f)
        
        print(".htaccess uploaded successfully!")
        print("\nThe server will now:")
        print("1. Serve only index.html (no PHP)")
        print("2. Send strong no-cache headers for HTML files")
        print("3. Force fresh content on every request")
        
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    upload_htaccess()
