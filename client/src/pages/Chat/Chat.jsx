import React, { useEffect, useState, useContext } from "react";
import "../Chat/Chat.css";
import { LeftSideBar } from "../../components/LeftSideBar/LeftSideBar";
import { ChatBox } from "../../components/ChatBox/ChatBox";
import { AppContext } from "../../context/AppContext";

export const Chat = () => {
  return (
    <>
      <div className="chat">
        <div className="chat-container">
          <LeftSideBar />
          <ChatBox />
        </div>
      </div>
    </>
  );
};
