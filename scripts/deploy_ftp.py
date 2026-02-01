import os
import ftplib
import sys
from concurrent.futures import ThreadPoolExecutor

# Credentials provided by user
FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"
LOCAL_DIST_DIR = r"c:\dev\sito\dist"

def upload_file(ftp, local_path, remote_path):
    try:
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_path}', f)
        print(f"Uploaded: {remote_path}")
    except Exception as e:
        print(f"Failed to upload {remote_path}: {e}")

def upload_directory(ftp, local_dir):
    # Walk through the directory content
    for root, dirs, files in os.walk(local_dir):
        # Calculate relative path to mirror structure on server
        rel_path = os.path.relpath(root, local_dir)
        if rel_path == ".":
            remote_root = ""
        else:
            remote_root = rel_path.replace("\\", "/")
        
        # Create remote directories if they don't exist
        for d in dirs:
            remote_dir_path = os.path.join(remote_root, d).replace("\\", "/")
            try:
                ftp.mkd(remote_dir_path)
                print(f"Created directory: {remote_dir_path}")
            except ftplib.error_perm:
                # Directory likely already exists
                pass

        # Upload files
        for f in files:
            local_file_path = os.path.join(root, f)
            remote_file_path = os.path.join(remote_root, f).replace("\\", "/")
            
            # Simple upload
            with open(local_file_path, 'rb') as file_obj:
                print(f"Uploading {f} to {remote_file_path}...")
                ftp.storbinary(f'STOR {remote_file_path}', file_obj)

def main():
    print(f"Connecting to {FTP_HOST} (Plain FTP, Active Mode)...")
    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.set_pasv(False) # Force Active Mode
        print("Authenticated via Plain FTP (Active Mode).")
    except Exception as e:
        print(f"Connection failed: {e}")
        sys.exit(1)

    print(f"Authenticated.")

    # Verify local dist exists
    if not os.path.exists(LOCAL_DIST_DIR):
        print(f"CRITICAL ERROR: Local dist directory does not exist: {LOCAL_DIST_DIR}")
        print("Did you run 'npm run build'?")
        sys.exit(1)

    print(f"Starting upload from {LOCAL_DIST_DIR}...")
    
    # Force navigation to the website root
    domain = "grivetto.eu"
    try:
        print(f"Navigating to {domain}...")
        ftp.cwd(domain)
        print(f"Success. Current dir: {ftp.pwd()}")
    except Exception as e:
        print(f"Could not cwd to {domain}: {e}")
        try:
             print("Trying 'www.grivetto.eu'...")
             ftp.cwd("www.grivetto.eu")
             print(f"Success. Current dir: {ftp.pwd()}")
        except:
             print("Could not likely find domain folder. Trying root upload...")

    # Upload
    try:
        upload_directory(ftp, LOCAL_DIST_DIR)
        print("\nDeployment execution finished.")
    except Exception as e:
         print(f"Upload failed: {e}")
         import traceback
         traceback.print_exc()

    ftp.quit()

if __name__ == "__main__":
    main()
