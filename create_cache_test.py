import ftplib
from ftplib import FTP
import time

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def create_test_file():
    try:
        # Create a test file with current timestamp
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        test_content = f"""<!DOCTYPE html>
<html>
<head><title>Test Page</title></head>
<body>
<h1>Cache Test</h1>
<p>This page was generated at: {timestamp}</p>
<p>If you see this timestamp changing, the cache is working properly.</p>
<p>If it's stuck, there's server-side caching.</p>
</body>
</html>"""
        
        with open("cache_test.html", "w", encoding="utf-8") as f:
            f.write(test_content)
        
        # Upload to FTP
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print("Uploading cache test file...")
        with open("cache_test.html", "rb") as f:
            ftp.storbinary("STOR /www.grivetto.eu/cache_test.html", f)
        
        print(f"\nTest file uploaded!")
        print(f"Visit: https://www.grivetto.eu/cache_test.html")
        print(f"\nExpected timestamp: {timestamp}")
        print("\nRefresh the page a few times and check if the timestamp changes.")
        
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_test_file()
