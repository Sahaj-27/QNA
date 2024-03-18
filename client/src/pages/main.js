// THIS IS THE LANDING PAGE OF THE APPLICATION AFTER THE USER LOGS IN

// Import the React and ReactDOM libraries
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UseDispatch } from "react-redux";

// Import the stlyes
import "../styles/main.css";

// Import the firebase authentication
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

// Import the react-hot-toast
import toast from "react-hot-toast";

// Import the UserInfoContext
import { UserInfoContext } from "../context/UserInfoContext";

// Import from services
import { analyze } from "../service/analyze";
import { botname } from "../service/botname";
import { useDispatch } from "react-redux";

// Create the Main component for this page

const Main = () => {
  // State for storing the uploaded files
  const [files, setFiles] = useState([]);

  // State for storing the bot name
  const [bot_name, setBotName] = useState("");
  const [bot_status, setBotStatus] = useState("");

  // State for checking if the Next button is clicked
  const [isNextClicked, setIsNextClicked] = useState(false);

  // Reference to the file input element
  const inputRef = useRef();

  // create a navigate object
  const navigate = useNavigate();

  // Get the display name from the context
  const { display_name } = React.useContext(UserInfoContext);

  // Handler for drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handler for drop event

  const handleDrop = (e) => {
    e.preventDefault();

    // Get the dropped files
    const droppedFiles = Array.from(e.dataTransfer.files);
    // Calculate the total size of the dropped files
    const totalSize =
      droppedFiles.reduce((total, file) => total + file.size, 0) /
      (1024 * 1024);

    // Check if total file size is less than or equal to 10MB

    if (totalSize <= 10) {
      setFiles(droppedFiles);
    } else {
      // Show error toast if total file size exceeds 10MB
      toast.error("Total file size exceeds 10MB");
    }
  };
  // Redux dispatch
  const dispatch = useDispatch();

  // Handler for upload event

  const handleUpload = async () => {
    // Get the current user
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

    // Dispatch the SET_BOT_NAME action
    dispatch({ type: "SET_BOT_NAME", payload: bot_name });

    // Now we can upload the data to the server

    const fdOfbotname = new FormData();
    fdOfbotname.append("user_id", user.uid);
    fdOfbotname.append("bot_name", bot_name);

    // Make the API call to get the bot name

    botname(user.uid, bot_name, setBotName, setBotStatus);

    if (bot_status === "available") {
      // Create a new FormData object
      const fdOfAnalyze = new FormData();

      // Get the file names from the files array
      const fileNames = files.map((file) => file.name);

      // Append the user id, bot name, file names and file streams to the FormData object
      fdOfAnalyze.append("user_id", user.uid);
      fdOfAnalyze.append("bot_name", bot_name);
      fileNames.forEach((fileName, index) => {
        fdOfAnalyze.append(`file_names[${index}]`, fileName);
      });
      files.forEach((file) => fdOfAnalyze.append("file_streams", file));

      // Make the API call to upload the files
      analyze(fdOfAnalyze, setFiles, setBotName, setIsNextClicked, navigate);
    } else {
      toast.error("Bot name is already taken");
    }
  };

  // Render the component
  return (
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
              <span>
                Continue to Chat Page <br />
              </span>
            </Link>
            <Link to="/Prev-Chats">
              <span>Previous Chats </span>
            </Link>
          </p>
        </div>
        <div className="profile-menu">
          <div className="profile-name">
            <span>Hii, </span>
            {display_name || "Guest"}
          </div>
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
