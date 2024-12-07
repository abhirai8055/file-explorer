import React, { useState, useEffect } from "react";
import Folder from "./Folder";

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
  const [expandedFolder, setExpandedFolder] = useState(""); // Tracks last expanded folder
  const [currentPath, setCurrentPath] = useState(""); // Tracks current path for file/folder creation

  // Handle outside clicks to collapse folder
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".folder")) {
        setExpandedFolder(""); // Collapse if clicked outside
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const checkIfExists = (path, name) => {
    const keys = path.split("/");
    let pointer = data;

    // Traverse the path to get the target directory (folder)
    keys.forEach((key) => {
      pointer = pointer[key] || pointer;
    });

    // Check if file/folder already exists in this directory
    if (Array.isArray(pointer)) {
      return pointer.includes(name);
    } else {
      return pointer.hasOwnProperty(name);
    }
  };

  const handleAddFile = () => {
    const name = prompt("Enter new file name:");
    if (!name) return;

    // Check if file with the same name exists in the current folder
    if (checkIfExists(currentPath, name)) {
      alert("A file or folder with this name already exists in this folder.");
      return;
    }

    // Update the data structure by adding the new file
    const updatedData = { ...data };
    const target = currentPath ? getPathObject(updatedData, currentPath) : updatedData;

    if (Array.isArray(target)) {
      target.push(name); // Add file to the array of files
    } else {
      target[name] = []; // Treat file as a key with an empty array (to signify it's a file)
    }

    setData(updatedData);
  };

  const handleAddFolder = () => {
    const name = prompt("Enter new folder name:");
    if (!name) return;

    // Check if folder with the same name exists in the current folder
    if (checkIfExists(currentPath, name)) {
      alert("A file or folder with this name already exists in this folder.");
      return;
    }

    // Update the data structure by adding the new folder
    const updatedData = { ...data };
    const target = currentPath ? getPathObject(updatedData, currentPath) : updatedData;

    if (Array.isArray(target)) {
      target.push(name); // Add folder to the array
    } else {
      target[name] = {}; // Add folder as a key with an empty object (to signify it's a folder)
    }

    setData(updatedData);
  };

  const handleDelete = (path) => {
    const keys = path.split("/");
    const updatedData = { ...data };
    let pointer = updatedData;

    // Traverse the path to get to the parent directory
    keys.slice(0, -1).forEach((key) => {
      pointer = pointer[key] || pointer;
    });

    const name = keys[keys.length - 1];
    if (Array.isArray(pointer)) {
      pointer.splice(pointer.indexOf(name), 1);
    } else {
      delete pointer[name];
    }

    setData(updatedData);
  };

  const handleExpand = (path) => {
    setExpandedFolder(path);
    setCurrentPath(path); // Update the current path when a folder is expanded
  };

  const getPathObject = (updatedData, path) => {
    const keys = path.split("/");
    let pointer = updatedData;

    // Traverse the path to get the target directory (folder or file)
    keys.forEach((key) => {
      pointer = pointer[key] || pointer;
    });

    return pointer;
  };

  return (
    <div className="file-explorer">
      <div className="header">
        <span className="evaluation">EVALUATION</span>
        <div className="buttons">
          <button
            onClick={handleAddFolder} // Create folder at the root or inside the expanded folder
            className="add-btn"
          >
            Create Folder
          </button>
          <button
            onClick={handleAddFile} // Create file at the root or inside the expanded folder
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
