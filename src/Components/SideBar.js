import React from 'react';
import {useAuth} from '../hooks/use-auth';
import {useState} from 'react';
import { MdEdit } from "react-icons/md";
import UploadModal from './UploadModal';
import Users from './Users';
import { FaUserAlt } from "react-icons/fa";
import SideBarChat from './SideBarChat';
import { useHistory } from 'react-router-dom';
import { REMOVE_CHAT,chat } from '../redux/reducers/ChatUser';
import {useDispatch,useSelector} from 'react-redux';
import { Suspense } from 'react';

// const SideBarChat = React.lazy(()=>import('./SideBarChat'));
// const Users = React.lazy(()=>import('./Users'));

function SideBar({showModal,setShowModal}) {
    const auth = useAuth()
    const dispatch = useDispatch()
    const ChatUser = useSelector(chat)
    const history = useHistory()
    const [showSearch, setShowSearch] = useState(false)
    const [downloadURL, setDownloadURL] = useState(null)
    return (
        
        <div className = {`SideBar  ${ChatUser?"hidden":"block w-full"} md:w-35% lg:w-30% md:block flex flex-col px-4 lg:px-6 py-4 relative`}>
            
            {showModal && <UploadModal downloadURL = {downloadURL} setShowModal = {setShowModal} setDownloadURL = {setDownloadURL} />}
            <section className = 'SideBar-info h-28% bg-gray flex flex-col justify-center items-center rounded-xl'>
               <div className = 'relative'>
                    
                    {auth.user.photoURL && !downloadURL ?<img className = 'rounded-full h-70px w-70px  md:h-40px md:w-40px lg:h-50px lg:w-50px object-contain ' src = {auth.user.photoURL} alt = 'pfp'></img>:downloadURL?<img alt = "pfp" src = {downloadURL} className = 'rounded-full  sm:h-30px sm:w-30px  md:h-40px md:w-40px lg:h-50px lg:w-50px '></img>:<FaUserAlt className = 'sm:h-30px sm:w-30px  md:h-40px md:w-40px lg:h-50px lg:w-50px' color = '#e3e3e3' /> }

                    {auth.user.providerData[0].providerId!== 'google.com' && <div onClick = {()=>setShowModal(true)} className = 'cursor-pointer absolute -right-1 -bottom-0.5 rounded-full bg-white p-0.5'><MdEdit fill = '#20243c' size = {16} className = ''/></div>}
               </div>
                <h4 className = {`EmailID  text-base md:text-sm font-thin text-gray-dark mt-1` }>{auth.user.email}</h4>
                <button className = 'px-4 py-2 rounded-lg bg-white text-xs text-gray-dark mt-2 outline-none hover:bg-blue-dark hover:text-white' onClick = {()=>{auth.signout();history.push('/login');dispatch(REMOVE_CHAT())}}>Sign Out</button>
                
            </section>
            
            {showSearch?
            <Users setShowSearch = {setShowSearch}/>:<SideBarChat setShowSearch = {setShowSearch}/>
            
            }
            
        </div>
    )
}

export default SideBar
