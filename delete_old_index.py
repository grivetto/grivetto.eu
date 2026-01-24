import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2010!!"

def delete_index_php():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print("\n**WARNING: This will DELETE index.php from the server!**")
        print("This will make sure only index.html (the new React app) is served.")
        confirm = input("Type 'DELETE' to confirm: ")
        
        if confirm == "DELETE":
            print("\nDeleting /www.grivetto.eu/index.php...")
            ftp.delete("/www.grivetto.eu/index.php")
            print("index.php has been deleted!")
            print("\nThe new React app (index.html) will now be served at the root path.")
        else:
            print("Operation cancelled.")
        
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    delete_index_php()
