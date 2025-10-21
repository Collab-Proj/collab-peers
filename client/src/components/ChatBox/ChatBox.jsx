import React, { useContext, useEffect, useState, useRef } from "react";
import "./ChatBox.css";
import greendot from "../../images/greendot.png";
import profilepic from "../../images/userprofile.png";
import sendlogo from "../../images/sendlogo.png";
import { AppContext } from "../../context/AppContext";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

export const ChatBox = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // Ref to track the end of messages

  const { chatUser, userdataid, messagesId, messages, setMessages } =
    useContext(AppContext);

  useEffect(() => {
    if (messagesId) {
      const unsub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        if (res.exists()) {
          setMessages(res.data().messages);
        }
      });
      return () => unsub();
    }
  }, [messagesId]);

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages change
  }, [messages]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() && messagesId) {
      try {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userdataid,
            text: input.trim(),
            createdAt: new Date().toISOString(), // Store as ISO string
          }),
        });
        setInput(""); // Clear input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${amPm}`;
  };

  return (
    <>
      {chatUser ? (
        <div className="chat-box">
          <div className="chat-user">
            <div className="chat-top">
              <img src={greendot} alt="greendot-icon" />
              <p>
                <img src={profilepic} alt="profilepic" />
                {chatUser.userDa.username}
              </p>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sId === userdataid
                      ? "chat-message-right"
                      : "chat-message-left"
                  }
                >
                  <div>{message.text}</div>
                  <span className="timestamp">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
              ))}
              {/* Invisible element to anchor the scroll to the bottom */}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                value={input}
                onChange={handleInput}
                type="text"
                placeholder="Type a message"
              />
              <img
                src={sendlogo}
                alt="send-icon"
                onClick={sendMessage}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="no-chat">
          <h1>No chat selected</h1>
        </div>
      )}
    </>
  );
};
