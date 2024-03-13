import React, { useState, useRef } from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";

// Main component
const Main = () => {
  // State for storing the uploaded files
  const [files, setFiles] = useState([]);
  // State for storing the bot name
  const [bot_name, setBotName] = useState("");
  // State for checking if the Next button is clicked
  const [isNextClicked, setIsNextClicked] = useState(false);
  // Reference to the file input element
  const inputRef = useRef();

  // Handler for drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handler for drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const totalSize =
      droppedFiles.reduce((total, file) => total + file.size, 0) /
      (1024 * 1024); // size in MB

    // Check if total file size is less than or equal to 10MB
    if (totalSize <= 10) {
      setFiles(droppedFiles);
    } else {
      alert("Total file size exceeds 10MB");
    }
  };

  // Handler for upload event
  const handleUpload = async () => {
    // Check if bot name is provided
    if (!bot_name) {
      alert("Please enter a bot name");
      return;
    }

    // Code to upload the files and bot name to the server
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    formData.append("bot_name", bot_name);

    const response = await fetch("your-backend-url", {
      method: "POST",
      body: formData,
    });

    // Check if upload was successful
    if (response.ok) {
      // Handle successful upload
      setFiles([]);
      setBotName("");
      setIsNextClicked(false);
    } else {
      // Handle error
    }
  };

  // Render the component
  return (
    // Main container
    <div className="main-container">
      <div className="left-section">
        <div className="logo-section">
          <div className="logo-main">QnA.AI</div>
        </div>
        <div className="left-instructions">
          <h1>Instructions</h1>
          <ul>
            <li>Upload files to get started</li>
            <li>Supported file types: .pdf, .doc, .docx, .txt</li>
            <li>Maximum total file size: 10MB</li>
          </ul>
          <p>
            <Link to="/bot-chat">
              <span>Continue to Chat Page </span>
            </Link>
          </p>
        </div>
        <div className="profile-menu">
          <div className="profile-name">John Doe</div>
        </div>
      </div>

      <div className="right-section">
        <div className="blob"></div>
        <div className="input-field">
          {files.length > 0 ? (
        <div className="uploads">
          <ul>
            {files.map((file, index) => (
          <li key={index}>{file.name}</li>
            ))}
          </ul>
          <div className="actions">
            <button onClick={() => setFiles([])}>Cancel</button>
            {isNextClicked ? (
          <div className="bot-name">
            <input
              type="text"
              value={bot_name}
              onChange={(e) => setBotName(e.target.value)}
              placeholder="Enter bot name"
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
            ) : (
          // Next button
          <button onClick={() => setIsNextClicked(true)}>Next</button>
            )}
          </div>
        </div>
          ) : (
        // Drop area
        <div
          className="drop-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h1>Drag and Drop files to upload</h1>
          <p>or</p>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 6))}
            hidden
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>
            Select Files
          </button>
        </div>
          )}
        </div>
      </div>
        </div>
      );
};

export default Main;
