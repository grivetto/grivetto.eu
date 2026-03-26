import ftplib

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def explore():
    print(f"Connecting...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    
    print(f"Root dir: {ftp.pwd()}")
    print("Root listing:")
    ftp.dir()
    
    # Try grivetto.eu
    try:
        ftp.cwd("grivetto.eu")
        print(f"\ngrivetto.eu listing ({ftp.pwd()}):")
        ftp.dir()
        
        # Show assets folder
        try:
            ftp.cwd("assets")
            print(f"\nassets listing ({ftp.pwd()}):")
            ftp.dir()
        except:
            print("No assets folder in grivetto.eu")
        ftp.cwd("/")
    except Exception as e:
        print(f"Could not cwd to grivetto.eu: {e}")

    # Try www.grivetto.eu 
    try:
        ftp.cwd("www.grivetto.eu")
        print(f"\nwww.grivetto.eu listing ({ftp.pwd()}):")
        ftp.dir()
        
        # Show assets folder
        try:
            ftp.cwd("assets")
            print(f"\nassets listing ({ftp.pwd()}):")
            # Only list js/css files
            for f in ftp.nlst():
                if f.endswith('.js') or f.endswith('.css'):
                    print(f"  {f}")
        except Exception as e:
            print(f"No assets folder in www.grivetto.eu: {e}")
    except Exception as e:
        print(f"Could not cwd to www.grivetto.eu: {e}")
    
    ftp.quit()

if __name__ == "__main__":
    explore()
