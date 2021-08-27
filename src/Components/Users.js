import React,{useEffect, useState,useRef} from 'react';
import {getUserFromSearch,createNewChat} from '../firebase/utils';
import { IoChevronBack } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import {useAuth} from '../hooks/use-auth';
import { useHistory } from 'react-router-dom'
import { ADD_CHAT } from '../redux/reducers/ChatUser';
import { useDispatch } from 'react-redux';
import { FaUserAlt } from "react-icons/fa";
import { db } from '../firebase';



function Users({setShowSearch}) {
    const auth = useAuth()
    const history = useHistory()
    const dispatch = useDispatch()
    const [searchedUser, setSearchedUser] = useState(null)
    const [userSearchInput, setUserSearchInput] = useState('')
    const [showError, setShowError] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const inputRef = useRef()
    let unsubscribe;
    // inputRef?.current?.addEventListener('keyup',(e)=>{
    //     if(e.keyCode === 13)
    //         getUserFromInput()
    // })
    const getUserFromInput = () => {
       getUserFromSearch(userSearchInput,setSearchedUser,setShowError)
        
    }
    const handleNewChat = (otherUser) => {
            createNewChat(auth.user,otherUser,setShowSearch)    
            dispatch(ADD_CHAT(otherUser))
            otherUser && history.push(`/rooms/${otherUser.id}`)
    }
    useEffect(() => {
        unsubscribe = db.collection('users').limit(10).get().then(docs=>{
            docs.forEach(doc=>{
                setAllUsers(state=>[...state,{email:doc.data().email,photoURL:doc.data().photoURL,id:doc.id}])
                               
        })
        })
        
        return unsubscribe
        

    },[])
    useEffect(() => {
        if(userSearchInput.length === 0){
            setSearchedUser(null)
            setShowError(false)
        }
    }, [userSearchInput])
    console.log(searchedUser)
    
    return (
        <section className = 'sideBar-users py-4 flex flex-col justify-start h-72% rounded-md'>
            <article className = 'rounded-md px-2 bg-gray flex justify-between items-center'>
                <IoChevronBack size = {18} className = 'cursor-pointer' onClick = {()=>setShowSearch((showSearch)=>!showSearch)}/>
                <input ref = {inputRef} autoFocus className = 'text-gray-dark bg-gray flex-1 outline-none p-2 text-sm md:text-xs lg:text-sm' value = {userSearchInput} onChange = {(e)=>{setUserSearchInput(e.target.value);}} type = 'text' placeholder = 'Search users' ></input>
                <button onClick = {getUserFromInput} ><FiSearch/></button>
            </article>
            <div className = 'Chat-people  mt-4 rounded-md p-2'>
            
            { (!searchedUser || userSearchInput.length === 0) && !showError &&
                allUsers.length ? allUsers.map(user=>(
                    <article onClick = {()=>handleNewChat(user)} key = {user.email} className = " flex justify-start items-center mb-4 px-2 py-1 cursor-pointer">
                    {user.photoURL ? <img className = 'mobile:mr-4 mobile_l:mr-12 md:mr-2 lg:mr-4 rounded-full  h-60px w-60px  md:h-30px md:w-30px lg:h-45px lg:w-45px ' src ={user?.photoURL} alt = 'chat-pfp'></img>:<FaUserAlt className = 'mobile:mr-4 mobile_l:mr-12 md:mr-2 lg:mr-4 rounded-full h-60px w-60px  md:h-30px md:w-30px lg:h-45px lg:w-45px' color = '#d3d3d3' />}
                    {user.email && <p className = ' px-3 text-sm  md:text-xs lg:text-sm  chat-username text-gray-dark'>{user?.email} </p>}
                    </article>
                )):""}
            
       { 
        searchedUser?
        <article onClick = {()=>handleNewChat(searchedUser)} className = 'Chat-person flex justify-between items-center mb-4 px-2 cursor-pointer'>
                {searchedUser.photoURL?<img className = 'mobile:mr-4 mobile_l:mr-12 md:mr-2 lg:mr-4 rounded-full  h-60px w-60px  md:h-30px md:w-30px lg:h-45px lg:w-45px' src = {searchedUser.photoURL} alt = 'chat-pfp'></img>:<FaUserAlt size = {40} color = '#d3d3d3' />}
                <p className = 'px-1 w-3/4 text-sm md:text-xs lg:text-sm chat-username text-gray-dark'>{searchedUser.email}</p>
                
        </article>
        :
        showError && 
        <article className = 'px-4 py-1 w-full'>
            <p className = ' text-center  py-2  w-full text-sm md:text-xs lg:text-sm chat-username text-gray-dark'>User not found</p>
        </article>

}
        
        
        
        
        </div>
            
            
        </section>
    )
}

export default Users
