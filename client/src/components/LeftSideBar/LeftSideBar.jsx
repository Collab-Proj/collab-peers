import React, { useContext, useState, useEffect } from "react";
import "./LeftSideBar.css";
import { FaUserFriends, FaSearch, FaEllipsisV } from "react-icons/fa";
import logo from "../../images/chat.png";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/Firebase";
import { AppContext } from "../../context/AppContext";

export const LeftSideBar = () => {
  const {
    chatData,
    setchatData,
    chatUser,
    setChatUser,
    userdataid,
    messagesId,
    setMessagesId,
    messages,
    setMessages,
  } = useContext(AppContext);
  const userDataa = userdataid;

  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    chatData.map((item) => {
      console.log(item);
    });
  }, [chatData]);
  

  const setChat = async (item) => {
    setMessagesId(item.messageId);
    setChatUser(item);
  };

  const inputhandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);

        if (
          !querySnap.empty &&
          querySnap.docs[0].data().id !== localStorage.getItem("id")
        ) {
          let userExist = false;

          chatData?.forEach((chatUser) => {
            if (chatUser?.rId === querySnap.docs[0].data().id) {
              userExist = true;
            }
          });

          if (!userExist) {
            setUser(querySnap.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addChat = async () => {
    try {
      const messageRef = collection(db, "messages");
      const newMessageDoc = await addDoc(messageRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(db, "chats", user.id), {
        chatData: arrayUnion({
          messageId: newMessageDoc.id,
          lastMessage: "",
          rId: userDataa,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(db, "chats", userDataa), {
        chatData: arrayUnion({
          messageId: newMessageDoc.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      console.log("Chat added successfully");
    } catch (err) {
      console.error("Error adding chat:", err);
    }
  };

  return (
    <div className="ls">
      <div className="ls-top">
        {/* Navigation Icons */}
        <div className="ls-nav">
          <img src={logo} alt="chat-logo" />
          <span>Collab-Chat</span>
          <div className="menu">
            <FaEllipsisV />
          </div>
        </div>

        {/* Search Bar */}
        <div className="ls-search">
          <FaSearch className="search-icon" />
          <input
            onChange={inputhandler}
            type="text"
            placeholder="Search here"
          />
        </div>

        {showSearch && user ? (
          <div onClick={addChat} className="friends">
            <FaUserFriends className="friend-icon" />
            <h4>{user?.username || "Unknown User"}</h4>
          </div>
        ) : (
          chatData?.map((chatUser, key) => (
            <div
              onClick={() => setChat(chatUser)}
              key={chatUser?.messageId || key}
              className="friends"
            >
              <FaUserFriends className="friend-icon" />
              <div>
                <p>{chatUser?.userDa?.username || "Unknown User"}</p>
                <span>{chatUser?.lastMessage || ""}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
