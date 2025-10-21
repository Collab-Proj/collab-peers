import { createContext, useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useAsyncError } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const userdataid = localStorage.getItem("id");
  const [userid, setuserid] = useState(null);
  const [chatData, setchatData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [messagesId, setMessagesId] = useState(null);

  const value = {
    chatUser,
    setChatUser,
    userdataid,
    chatData,
    setchatData,
    messagesId,
    setMessagesId,
    messages,
    setMessages
  };

  useEffect(() => {
    if (userdataid) {
      setuserid(userdataid);

      // Check if userdataid is available
      const chatRef = doc(db, "chats", userdataid);

      const unsub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data()?.chatData || [];
        console.log(chatItems);

        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);
          const userDa = userSnap.data();
          tempData.push({ ...item, userDa });
        }

        setchatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
        console.log(chatData + "chatdata");
      });

      return () => {
        unsub();
      };
    }
  }, [userdataid]); // Trigger the effect whenever userData changes

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
