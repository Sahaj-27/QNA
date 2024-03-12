import React, { useState } from "react";
import "../styles/bot.css";
import { Link } from "react-router-dom";
import sendBtn from "../assets/send.svg";
import userIcon from "../assets/user.png";
import botIcon from "../assets/robot.png";

const Bot = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hello, I am QnA.AI, your personal assistant. How can I help you today?",
      isBot: true,
    },
  ]);

  const handleSend = async () => {
    const response = await fetch("http://localhost:5000/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    }); // send the message to the server

    console.log(input);
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: response, isBot: true },
    ]); // add the message to the list of messages
  };

  return (
    <div className="bot-container">
      <div className="left-container">
        <div className="logo-section">
          <div className="logo-main">QnA.AI</div>
        </div>
        <p>
          <Link to="/QnA-Input">
            <span>Create a New BOT </span>
          </Link>
        </p>
        <div className="prev-chats">
          <h1>Previous Chats</h1>
          <ul>
            {/* <li>
              <p> Chats will be stored here</p>
            </li> */}
          </ul>
        </div>
        <div className="profile-menu">
          <div className="profile-name">John Doe</div>
        </div>
      </div>

      <div className="right-container">
        <div className="blob"></div>
        <div className="chat-container">
          <div className="chats">
            <div className="chat">
            {messages.map((message, i) => 
              <div key={i} className={message.isBot?"chat bot":"chat"}>
                <img className="chatimg " src={message.isBot?botIcon:userIcon} alt="" />
                <p className="txt">{message.text}</p>
              </div>
            )}
            </div>
          </div>
          <div className="chatFooter">
            <div className="inp">
              <input
                type="text"
                placeholder="Send a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="send" onClick={handleSend}>
                <img src={sendBtn} alt="" />
              </button>
            </div>
            <p> QNA.AI may produce inaccurate information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bot;
