import React,{useRef,useEffect} from 'react'
import { deleteAChat } from '../firebase/utils';
import { useSelector,useDispatch } from 'react-redux';
import { chat,REMOVE_CHAT } from '../redux/reducers/ChatUser';
import { useAuth } from "../hooks/use-auth";
import { useHistory } from 'react-router-dom';
import { REMOVE_USER } from "../redux/reducers/ContactedUsers";
function ChatOptionsModal({setChatOptionsModalOpen}) {
    const auth = useAuth()
    const history = useHistory()
    const dispatch = useDispatch()
    const ChatUser = useSelector(chat)
    const chatoptions = useRef()
    const deleteChat = () => {
        dispatch(REMOVE_CHAT())
        
        history.push('/')
        deleteAChat(auth.user.uid,ChatUser.id)
        dispatch(REMOVE_USER(ChatUser.id))
    }
    const handleClick = e => {
        if (!chatoptions?.current?.contains(e.target)) {
            setChatOptionsModalOpen(false)
        }
        
      };
    useEffect(() => {
    
        document.addEventListener("click", handleClick);
        
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, []);  
    
    return (
          <ul ref = {chatoptions}>
            <li key = 'delete' className = 'text-sm cursor-pointer' onClick = {deleteChat}>Delete Chat</li>
        </ul>
        
        
    )
}

export default ChatOptionsModal
