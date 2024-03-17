import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { UserInfoContext } from "../context/UserInfoContext";

// Main component
const Main = () => {
  // State for storing the uploaded files
  const [files, setFiles] = useState([]);
  // State for storing the filenames
  const [fileNames, setFileNames] = useState([]);
  // State for storing the bot name
  const [bot_name, setBotName] = useState("");
  // State for checking if the Next button is clicked
  const [isNextClicked, setIsNextClicked] = useState(false);
  // Reference to the file input element
  const inputRef = useRef();
  const navigate = useNavigate();
  // const { user_id } = React.useContext(UserInfoContext); // Get user ID from context
  const { display_name } = React.useContext(UserInfoContext); // Get display name from context

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
      const fileNamesArray = droppedFiles.map((file) => file.name);
      setFiles(droppedFiles);
      setFileNames(fileNamesArray);
    } else {
      toast.error("Total file size exceeds 10MB");
    }
  };

  // Handler for upload event
  const handleUpload = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    // Check if bot name is provided
    if (!bot_name) {
      toast.error("Please enter a bot name");
      return;
    }

    // Check if bot name contains space
    if (/\s/.test(bot_name)) {
      toast.error("Bot name should not contain spaces");
      return;
    }

    // Check if user is signed in
    if (!user) {
      toast.error("Please sign in to upload files");
      return;
    }

    // Code to upload the files, bot name, filenames, and user ID to the server
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    formData.append("bot_name", bot_name);
    formData.append("fileNames", JSON.stringify(fileNames));
    formData.append("user_id", user.uid);

    toast.promise(
      axios.post("your-backend-url", formData),
      {
        loading: "Uploading...",
        success: () => {
          // Handle successful upload
          setFiles([]);
          setFileNames([]);
          setBotName("");
          setIsNextClicked(false);
    
          // Make API call to build the bot
          toast.promise(
            axios.post("your-backend-url-to-build-bot", { bot_name }),
            {
              loading: "Building bot...",
              success: (botReadyResponse) => {
                // Check if the bot is ready
                if (botReadyResponse.data.botReady) {
                  navigate('/bot-chat'); // Redirect to Bot component
                }
                return "Bot is ready";
              },
              error: (err) => {
                // Handle error
                return "Error building bot: " + err.message;
              },
            },
            {
              style: {
                minWidth: "250px",
              },
            }
          );
    
          return "Files uploaded successfully";
        },
        error: (err) => {
          // Handle error
          if (err.response && err.response.status === 409) {
            // Handle duplicate bot name error
            return "Bot name already exists. Please use a different name.";
          } else {
            // Handle other errors
            return "Error uploading files: " + err.message;
          }
        },
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
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
              <span>Continue to Chat Page  <br /></span>
            </Link>
            <Link to="/Prev-Chats">
              <span>Previous Chats </span>
            </Link>
          </p>
        </div>
        <div className="profile-menu">
        <div className="profile-name"><span>Hii, </span>{display_name || 'Guest'}</div>
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
                onChange={(e) =>
                  setFiles(Array.from(e.target.files).slice(0, 6))
                }
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
