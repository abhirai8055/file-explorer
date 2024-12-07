import React, { useState, useEffect } from "react";
import Folder from "./Folder";

// Initial folder structure 
const initialData = {
  Desktop: ["Screenshot1.jpg", "videopal.mp4"],
  Documents: ["Document1.jpg", "Document2.pdf"],
  Downloads: {
    Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
    Images: ["Photo.png", "Drawing.jpg"],
    "chromedriver.dmg": [],
  },
};

const FileExplorer = () => {
  const [data, setData] = useState(initialData);
  
  // Track which folder is currently expanded
  const [expandedFolder, setExpandedFolder] = useState("");
  
  // Track the current folder path for file/folder creation
  const [currentPath, setCurrentPath] = useState("");

  // Close the folder when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".folder")) {
        setExpandedFolder(""); // Close the folder if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside); // Add event listener for outside clicks
    return () => document.removeEventListener("click", handleClickOutside); // Clean up the event listener
  }, []);

  // Helper function to check if a folder or file already exists in the directory
  const checkIfExists = (path, name) => {
    const keys = path.split("/"); // Split path to traverse directories
    let pointer = data;

    // Traverse path to reach the target folder or file
    keys.forEach((key) => {
      pointer = pointer[key] || pointer;
    });

    // Check if the name exists in the current folder or file
    if (Array.isArray(pointer)) {
      return pointer.includes(name); // Check if file exists in the array
    } else {
      return pointer.hasOwnProperty(name); // Check if folder exists in the object
    }
  };

  // Function to add a new file
  const handleAddFile = () => {
    const name = prompt("Enter new file name:");
    if (!name) return; // Exit if no name is provided

    // Check if file with the same name already exists
    if (checkIfExists(currentPath, name)) {
      alert("A file or folder with this name already exists.");
      return;
    }

    const updatedData = { ...data }; // Copy data to avoid mutating it
    const target = currentPath ? getPathObject(updatedData, currentPath) : updatedData;

    if (Array.isArray(target)) {
      target.push(name); // Add the new file
    } else {
      target[name] = []; // Treat file as an empty array
    }

    setData(updatedData); // Update the state with new data
  };

  // Function to add a new folder
  const handleAddFolder = () => {
    const name = prompt("Enter new folder name:");
    if (!name) return; // Exit if no name is provided

    // Check if folder with the same name already exists
    if (checkIfExists(currentPath, name)) {
      alert("A file or folder with this name already exists.");
      return;
    }

    const updatedData = { ...data };
    const target = currentPath ? getPathObject(updatedData, currentPath) : updatedData;

    if (Array.isArray(target)) {
      target.push(name); // Add folder to the array
    } else {
      target[name] = {}; // Add folder as an empty object
    }

    setData(updatedData); // Update the state with new data
  };

  // Function to delete a file or folder
  const handleDelete = (path) => {
    const keys = path.split("/"); // Split path to access the target folder/file
    const updatedData = { ...data };
    let pointer = updatedData;

    // Traverse to the parent directory of the target file/folder
    keys.slice(0, -1).forEach((key) => {
      pointer = pointer[key] || pointer;
    });

    const name = keys[keys.length - 1]; // Get the name of the folder/file to delete
    if (Array.isArray(pointer)) {
      pointer.splice(pointer.indexOf(name), 1); // Remove the item from the array
    } else {
      delete pointer[name]; // Delete the item from the object
    }

    setData(updatedData); // Update the state with new data
  };

  // Function to handle folder expansion and set current path
  const handleExpand = (path) => {
    setExpandedFolder(path); // Expand the folder
    setCurrentPath(path); // Set the current path for creation
  };

  // Helper function to get an object at a specific path
  const getPathObject = (updatedData, path) => {
    const keys = path.split("/"); // Split the path to navigate through directories
    let pointer = updatedData;

    // Traverse through the path to get the target object
    keys.forEach((key) => {
      pointer = pointer[key] || pointer;
    });

    return pointer; // Return the object at the target path
  };

  return (
    <div className="file-explorer">
      <div className="header">
        <span className="evaluation">EVALUATION</span>
        <div className="buttons">
          <button
            onClick={handleAddFolder} // Create folder
            className="add-btn"
          >
            Create Folder
          </button>
          <button
            onClick={handleAddFile} // Create file
            className="add-btn"
          >
            Create File
          </button>
        </div>
      </div>

      <div className="explorer">
        {Object.entries(data).map(([name, content]) => (
          <Folder
            key={name}
            name={name}
            content={content}
            path={name}
            onAddFile={handleAddFile}
            onAddFolder={handleAddFolder}
            onDelete={handleDelete}
            onExpand={handleExpand}
            expandedFolder={expandedFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
