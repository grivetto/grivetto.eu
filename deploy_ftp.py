import os
import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"
LOCAL_DIR = "dist"
REMOTE_DIR = "/www.grivetto.eu"

def upload_files():
    try:
        # Connect to FTP
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected and logged in.")

        # Walk through local directory
        for root, dirs, files in os.walk(LOCAL_DIR):
            # Create corresponding directories on FTP
            relative_path = os.path.relpath(root, LOCAL_DIR)
            if relative_path == ".":
                remote_path = REMOTE_DIR
            else:
                remote_path = f"{REMOTE_DIR}/{relative_path.replace(os.sep, '/')}"
            
            # Try to navigate to the directory, create if it doesn't exist
            try:
                ftp.cwd(remote_path)
            except ftplib.error_perm:
                print(f"Creating directory: {remote_path}")
                # Reset to root of web dir to ensure we can traverse down
                ftp.cwd(REMOTE_DIR)
                
                if relative_path != ".":
                    parts = relative_path.split(os.sep)
                    for part in parts:
                        try:
                            ftp.cwd(part)
                        except ftplib.error_perm:
                            ftp.mkd(part)
                            ftp.cwd(part)

            # Upload files
            for file in files:
                local_file_path = os.path.join(root, file)
                # We are already in the correct directory from the cwd above
                
                print(f"Uploading {local_file_path} to {remote_path}/{file}...")
                with open(local_file_path, "rb") as f:
                    ftp.storbinary(f"STOR {file}", f)

        ftp.quit()
        print("Upload complete!")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    upload_files()
