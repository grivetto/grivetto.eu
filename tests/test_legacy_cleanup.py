import os
import sys

def test_legacy_files_moved():
    legacy_dir = "legacy"
    if not (os.path.exists(legacy_dir) and os.path.isdir(legacy_dir)):
        raise AssertionError("legacy/ directory does not exist")

    legacy_files = [
        "landing_v1.html", "landing_v10.html", "landing_v2.html", "landing_v3.html",
        "landing_v4.html", "landing_v5.html", "landing_v6.html", "landing_v7.html",
        "landing_v8.html", "landing_v9.html", "landing_demo.html", "index_alpha0.0.1.php"
    ]

    for file_name in legacy_files:
        file_path = os.path.join(legacy_dir, file_name)
        if not os.path.exists(file_path):
            raise AssertionError(f"{file_name} not found in {legacy_dir}")

if __name__ == "__main__":
    try:
        test_legacy_files_moved()
        print("Test passed!")
    except AssertionError as e:
        print(f"Test failed: {e}")
        sys.exit(1)