import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFolderOpen,
  faTrash,
  faPlus,
  faArrowRight,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { faFileImage, faFileVideo, faFile } from "@fortawesome/free-regular-svg-icons";

const Folder = ({
  name,
  content,
  path,
  onAddFile,
  onAddFolder,
  onDelete,
  onExpand,
  expandedFolder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand(path);
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith(".jpg") || fileName.endsWith(".png")) return faFileImage;
    if (fileName.endsWith(".mp4")) return faFileVideo;
    return faFile;
  };

  return (
    <div className="folder">
      <div className="folder-header">
        <span onClick={toggleExpand} className="folder-arrow">
          <FontAwesomeIcon icon={isExpanded ? faArrowDown : faArrowRight} />
        </span>
        <span className="folder-icon">
          <FontAwesomeIcon icon={isExpanded ? faFolderOpen : faFolder} />
        </span>
        <span className="folder-name">{name}</span>

        {isExpanded && (
          <>
            <button onClick={() => onAddFolder(path)} className="add-btn">
              <FontAwesomeIcon icon={faPlus} /> Folder
            </button>
            <button onClick={() => onAddFile(path)} className="add-btn">
              <FontAwesomeIcon icon={faPlus} /> File
            </button>
          </>
        )}

        <button onClick={() => onDelete(path)} className="delete-btn">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {isExpanded && (
        <div className="folder-content">
          {Array.isArray(content)
            ? content.map((file, index) => (
                <div key={index} className="file">
                  <FontAwesomeIcon icon={getFileIcon(file)} className="file-icon" />
                  <span className="file-name">{file}</span>
                  <button
                    onClick={() => onDelete(`${path}/${file}`)}
                    className="delete-btn"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))
            : Object.entries(content).map(([childName, childContent]) => (
                <Folder
                  key={childName}
                  name={childName}
                  content={childContent}
                  path={`${path}/${childName}`}
                  onAddFile={onAddFile}
                  onAddFolder={onAddFolder}
                  onDelete={onDelete}
                  onExpand={onExpand}
                  expandedFolder={expandedFolder}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
