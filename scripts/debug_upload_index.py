import ftplib
import os

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"
LOCAL_INDEX = r"c:\dev\sito\dist\index.html"

def debug_upload():
    print(f"Connecting to {FTP_HOST}...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    
    # Check directory
    print(f"Current dir: {ftp.pwd()}")
    try:
        ftp.cwd("www.grivetto.eu")
        print(f"CWD to www.grivetto.eu success. Current dir: {ftp.pwd()}")
    except:
        print("Failed to CWD to www.grivetto.eu")
        return

    # Check index.html
    files = ftp.nlst()
    if "index.html" in files:
        print("index.html exists on server.")
        try:
            print(f"Deleting index.html...")
            ftp.delete("index.html")
            print("Delete success.")
        except Exception as e:
            print(f"Delete failed: {e}")
    else:
        print("index.html does NOT exist on server (weird).")

    # Upload NEW index.html
    print(f"Uploading {LOCAL_INDEX}...")
    with open(LOCAL_INDEX, 'rb') as f:
        ftp.storbinary('STOR index.html', f)
    print("Upload success.")
    
    ftp.quit()

if __name__ == "__main__":
    debug_upload()
