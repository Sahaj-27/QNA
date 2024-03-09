import React, { useState, useRef } from "react";
import "./styles/main.css";
import { Link } from "react-router-dom";

const Main = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleUpload = () => {
    // Code to upload the file to the server
  };

  return (
    <div className="main-container">
      <div className="left-section">
        <div className="logo-section">
          <div className="logo-main">QnA.AI</div>
        </div>
        <div className="left-instructions">
          <h1>Instructions</h1>
          <ul>
            <li>Upload a file to get started</li>
            <li>Supported file types: .pdf, .doc, .docx, .txt</li>
            <li>Maximum file size: 10MB</li>
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
          {file ? (
            <div className="uploads">
              <ul>
                <li>{file.name}</li>
              </ul>
              <div className="actions">
                <button onClick={() => setFile(null)}>Cancel</button>
                <button onClick={handleUpload}>Upload</button>
              </div>
            </div>
          ) : (
            <div
              className="drop-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <h1>Drag and Drop file to upload</h1>
              <p>or</p>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
                ref={inputRef}
              />
              <button onClick={() => inputRef.current.click()}>
                Select File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;

// remaining thins to add are section for edit profile and logout, 
//after uploading move to chat page, add loading animation while uploading file
