import os
import shutil

OLD_NAME = "Club_manager"            # current inner project folder name
NEW_NAME = "Club_manager_server"     # new inner project folder name

# Step 1: Rename the project folder
if os.path.exists(OLD_NAME) and os.path.isdir(OLD_NAME):
    shutil.move(OLD_NAME, NEW_NAME)
    print(f"Renamed folder {OLD_NAME} → {NEW_NAME}")
else:
    print(f"Folder {OLD_NAME} not found.")
    exit()

# Step 2: Update references in key files
FILES_TO_UPDATE = [
    "manage.py",
    os.path.join(NEW_NAME, "wsgi.py"),
    os.path.join(NEW_NAME, "asgi.py"),
    os.path.join(NEW_NAME, "settings.py"),
]

for file_path in FILES_TO_UPDATE:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace(f"{OLD_NAME}.settings", f"{NEW_NAME}.settings")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated settings references in {file_path}")

print("✅ Django project renamed successfully!")
