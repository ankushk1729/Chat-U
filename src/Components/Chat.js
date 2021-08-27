import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addMessageForAChat, getMessagesForAChat } from "../firebase/utils";
import { useAuth } from "../hooks/use-auth";
import { db } from "../firebase/index";
import { chat } from "../redux/reducers/ChatUser";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";
import { REMOVE_CHAT } from "../redux/reducers/ChatUser";
import { useSelector, useDispatch } from "react-redux";
import ChatOptionsModal from "./ChatOptionsModal";

function Chat() {
  const auth = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const ChatUser = useSelector(chat);
  const messagesEndRef = useRef(null);
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [messageInput, setmessageInput] = useState("");
  const [ChatOptionsModalOpen, setChatOptionsModalOpen] = useState(false)
  
  const params = useParams();
  let unsubscribe;
  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current?.scrollHeight;
  };
  
  const handleMsgSend = () => {
    console.log("sending");
    messageInput &&
      addMessageForAChat(
        auth.user.uid,
        params.id,
        setCurrentChatMessages,
        messageInput,
        scrollToBottom
      );
    setmessageInput("");
  };
  
  const formatAMPM = (date) =>  {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  useEffect(() => {
    getMessagesForAChat(
      auth.user.uid,
      params.id,
      setCurrentChatMessages,
      scrollToBottom
    );
  }, []);
  
  useEffect(() => {
    let arr = [JSON.parse(localStorage.getItem("user")).uid, params.id].sort();
    unsubscribe  = db.collection("chats")
      .doc(`${arr[0]}${arr[1]}`)
      .onSnapshot((doc) => {
        doc.data() && setCurrentChatMessages(doc.data().msgs);
        scrollToBottom()
      });
      return unsubscribe
  }, [params, ChatUser]);
  console.log(ChatUser)
  return (
    <div className="Chat w-full ml-4 md:w-65% lg:w-70% md:ml-0 py-4 pr-4 lg:pr-6  ">
      <section className="w-full h-full bg-gray rounded-xl  pb-2  flex flex-col justify-between">
        
        
        {ChatUser && (
        <article className="w-full flex justify-between bg-blue-dark px-1 h-5% items-center rounded-xl rounded-b-none relative">
          <div className = 'flex items-center'>
            <div
              onClick={() => {
                history.push("/");
                dispatch(REMOVE_CHAT());
              }}
              className=" cursor-pointer  h-5 w-5 rounded-full  grid place-items-center mr-2"
            >
              
              <IoChevronBack size={16} color="#fff" />{" "}
            </div>
              <p className = 'text-gray-light text-xs'>
                {ChatUser.email}
              </p>
              </div>
          <div>
            <BsThreeDotsVertical color="#fff"  className = 'z-20 cursor-pointer' onClick = {()=>setChatOptionsModalOpen(true)} />
            { ChatOptionsModalOpen &&
            <div className = 'absolute bg-white p-2 right-0 top-2  z-10'>
            <ChatOptionsModal setChatOptionsModalOpen = {setChatOptionsModalOpen} />
            </div>
            }
          </div>
          
        </article>
          )}
        <section ref={messagesEndRef} className="main-chat overflow-auto h-80% mt-1">
          
          {currentChatMessages.length
            ? currentChatMessages.map((msg, index) => (
                <article
                  key={index}
                  className={`${
                    msg.senderId === auth.user.uid ? "sent-msg mr-3  text-gray-light" : "ml-3"
                  } message flex  items-center mb-3`}
                >
                  <div className={`${
                    msg.senderId === auth.user.uid ? "items-end":"items-start"} msg-box flex flex-col justify-center `}>
                    <p className = "message-content shadow-md text-sm rounded-lg bg-white px-6 py-2 text-gray-dark mb-1">{msg.msg}</p>
                    <small className = 'text-blue-dark text-xs'>{formatAMPM(msg.created_at.toDate()) + ", " + msg.created_at.toDate().getDate() + "-" + "0"  + parseInt(msg.created_at.toDate().getMonth()+1) + "-" + msg.created_at.toDate().getFullYear()}</small>
                  </div>
                  
                </article>
              ))
            : ""}
        </section>
        
        <section className = "px-4 h-15%">
        <section className=" w-full msg-type-box  bg-white flex justify-between px-4 py-2 rounded-lg">
          <input
            placeholder="Enter your message here"
            className="msg-input w-70% md:w-80% lg:w-85% border-gray border-2 rounded-md outline-none px-4 text-sm text-gray-dark"
            type="text"
            value={messageInput}
            onChange={(e) => setmessageInput(e.target.value)}
          ></input>
          <button
            onClick={handleMsgSend}
            className="text-sm w-25% md:w-15% lg:w-10% py-2 px-3 bg-blue-dark text-white rounded-md"
          >
            Send
          </button>
        </section>
        </section>
        
      </section>
    </div>
  );
}

export default Chat;
