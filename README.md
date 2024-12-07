# Description
This project is a web-based file explorer that dynamically represents a folder structure based on a given JSON object. It provides interactive features such as expanding/collapsing folders, and allowing users to create, edit, and delete files or folders.

# video link -

# Features
Dynamic Folder Structure: Represents folders and files visually based on a JSON hierarchy.
Expand/Collapse: Clickable folders to show or hide their contents.
Create Files and Folders: Add new files or folders at any location.
Edit Names: Rename files or folders interactively.
Delete Items: Remove any file or folder dynamically.
Indentation: Subfolders and files are indented to visually indicate their hierarchy level.
JSON Example
The structure is built from a JSON object like the one below:



# json
Copy code
{
  "Documents": ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
  "Desktop": ["Screenshot1.jpg", "videopal.mp4"],
  "Downloads": {
    "Drivers": ["Printerdriver.dmg", "cameradriver.dmg"],
    "Applications": ["Webstorm.dmg", "Pycharm.dmg", "FileZila.dmg", "Mattermost.dmg"],
    "chromedriver.dmg": []
  }
}


# Technologies Used
HTML5
CSS3
JavaScript
and react


# Setup and Installation
Clone the repository

Navigate to the project directory

Install dependencies :

Start the project:
npm start

# Usage
Open the app in your browser.
The file explorer will display the folder structure from the given JSON.
Expand/Collapse Folders: Click the arrow or folder name.
Add File/Folder: Right-click or use the "Add" button to create a file or folder.
Edit Name: Double-click on a file or folder to rename it.
Delete: Use the "Delete" option to remove files or folders.



