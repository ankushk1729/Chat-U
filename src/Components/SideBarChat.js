import React,{useEffect} from 'react';
import { FiPlus } from "react-icons/fi";
import { getAllContactedUsers} from '../firebase/utils';
import { useAuth } from '../hooks/use-auth';
import {useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { ADD_CHAT,chat,REMOVE_CHAT } from '../redux/reducers/ChatUser';
import { FaUserAlt } from "react-icons/fa";
import { GET_USER,contactedUsers,REMOVE_ALL } from "../redux/reducers/ContactedUsers";


function SideBarChat({setShowSearch}) {
    const auth = useAuth();
    const dispatch = useDispatch()
    const ChatUser = useSelector(chat)
    const contactedUsersList = useSelector(contactedUsers)
    const history = useHistory();
    
    useEffect(()=>{
        dispatch(REMOVE_ALL())
        getAllContactedUsers({user:auth.user,dispatch,GET_USER})    
      },[])

    return (
        <section className = 'SideBar-convo py-4 flex flex-col justify-start h-72%'>
                <div className = 'flex justify-between mb-2 px-2'><h1 className = 'ConvoHeading  text-base lg:text-lg font-bold '>Active Conversations</h1><button onClick = {()=>{setShowSearch((showSearch)=>!showSearch);dispatch(REMOVE_CHAT());history.push('/')}} ><FiPlus/></button></div>
                 <section className = 'Chat-people '>
                    {contactedUsersList.length?contactedUsersList.map(contact=>(
                        <article onClick = {()=>{history.push(`/rooms/${contact.id}`);dispatch(ADD_CHAT(contact));}} key = {contact?.id} className = {`${contact?.email === ChatUser?.email?'bg-gray':''}  Chat-person flex justify-start items-center mb-4 px-2 py-1 cursor-pointer`}>
                        
                        {contact?.photoURL?<img className = 'mobile:mr-4 mobile_l:mr-12 md:mr-2 lg:mr-4 rounded-full  h-60px w-60px  md:h-30px md:w-30px lg:h-45px lg:w-45px ' src ={contact.photoURL} alt = 'chat-pfp'></img>:<FaUserAlt className = 'mobile:mr-4 mobile_l:mr-12 md:mr-2 lg:mr-4 rounded-full h-60px w-60px  md:h-30px md:w-30px lg:h-45px lg:w-45px' color = '#d3d3d3' />}
                        
                        <p className = ' px-3 text-sm  md:text-xs lg:text-sm  chat-username text-gray-dark'>{contact?.email} </p>
                    </article>
                    )):''}
                        </section>
        </section>
    )
}

export default SideBarChat
