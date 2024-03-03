import React, { useState, useRef } from "react";
import "./styles/main.css";

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
        <div className="logo-main">QnA.AI</div>
        <div className="left-instructions"></div>
        <div className="profile-menu">
          <div className="profile-pic">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile-pic"
            />
          </div>
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
