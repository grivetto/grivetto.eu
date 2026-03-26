import ftplib
import os

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def verify_upload():
    print(f"Connecting to {FTP_HOST}...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    
    try:
        ftp.cwd("www.grivetto.eu")
        print(f"CWD to www.grivetto.eu success.")
    except:
        print("Failed to CWD to www.grivetto.eu")
        return

    print("Reading index.html from server...")
    lines = []
    ftp.retrlines('RETR index.html', lines.append)
    content = "\n".join(lines)
    
    if "Download vCard TEST" in content:
        print("SUCCESS! 'Download vCard TEST' found in server's index.html")
    else:
        print("FAILURE! 'Download vCard TEST' NOT found in server's index.html")
        # Check index-DP6pE0Cc.js or others
        if "index-DP6pE0Cc.js" in content:
            print("Found index-DP6pE0Cc.js (the local hash at Step 472)")
        elif "index-DqGKMsty.js" in content:
            print("Found index-DqGKMsty.js (the build hash at Step 422)")
        elif "index-DSgLNML8.js" in content:
            print("Found index-DSgLNML8.js (the live hash at Step 468)")
        else:
            print("Could not find any known script hashes in the server's index.html")
            print(f"Content length: {len(content)}")
            print(f"Tail of content: {content[-200:]}")
    
    ftp.quit()

if __name__ == "__main__":
    verify_upload()
