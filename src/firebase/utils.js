import {db,arrayUnion, arrayRemove} from './index';


const addUser = async(user) => {
    try{
    await db.collection('users').doc(user.uid).set({
        email:user.email,
        photoURL:user.photoURL,
        contacts:[]
    })
    }
    catch(error) {
        console.log(error)
    }
}


const getUserFromSearch = (value,setSearchedUser,setShowError) => {
    db.collection('users').where('email','==',value).get().then((snap)=>{        
        if(snap.empty){
            setShowError(true)
            setSearchedUser(null)
        }
        else{
        snap.forEach((doc)=>{
              setSearchedUser({email:doc.data().email,photoURL:doc.data().photoURL,id:doc.id})
         })
        }
     }).catch(error=>console.log(error))
    
    

}

const createNewChat = async(currentUser,otherUser,setShowSearch) => {
    let arr = [currentUser.uid,otherUser.id].sort()
    try{
        await db.collection('chats').doc(`${arr[0]}${arr[1]}`).get().then((doc)=>{
            if(!doc.exists){
                db.collection('chats').doc(`${arr[0]}${arr[1]}`).set({
                    chatCreatedAt:new Date(),
                    msgs:[]
                }) 
                
            }
                db.collection('users').doc(currentUser.uid).update({
                    contacts:arrayUnion(otherUser.id)
                }) 
                db.collection('users').doc(otherUser.id).update({
                    contacts:arrayUnion(currentUser.uid)
                }) 
                setShowSearch(showSearch=>!showSearch)
        })
        
} 
catch(error){
    console.log(error)
}
}

const deleteAChat = (userId,otherUserId) => {
    let arr = [userId,otherUserId].sort()
    db.collection('chats').doc(`${arr[0]}${arr[1]}`).delete().then(()=>{
        console.log('deleted')
    }).catch((error)=>{
        console.log(error)
    })
    db.collection('users').doc(userId).update({
      contacts:arrayRemove(otherUserId)
    })
    db.collection('users').doc(otherUserId).update({
        contacts:arrayRemove(userId)  
      })
}



const getAllContactedUsers = ({user,dispatch,GET_USER}) => {
    db.collection('users').doc(user.uid).get().then((doc)=>{
       doc.data() && doc.data().contacts.forEach((item=>{
            db.collection('users').doc(item).get().then((doc)=>{
                console.log(doc.data())
                doc.data() && dispatch(GET_USER({id:item,email:doc.data().email,photoURL:doc.data().photoURL}))
            })
        }))

    })
    
}

const getMessagesForAChat = (currentUserID,otherUserID,setCurrentChatMessages,scrollToBottom) => {
    let arr = [currentUserID,otherUserID].sort()
    db.collection('chats').doc(`${arr[0]}${arr[1]}`).get().then(doc=>{
        doc.data() && setCurrentChatMessages(doc.data().msgs)
        scrollToBottom()      
    })  
    
    

}
const addMessageForAChat = (currentUserID,otherUserID,setCurrentChatMessages,msg,scrollToBottom) => {
    let arr = [currentUserID,otherUserID].sort()

    let messages = db.collection('chats').doc(`${arr[0]}${arr[1]}`)
    messages.update({
        msgs: arrayUnion({msg:msg,
            created_at:new Date(),
            senderId:currentUserID,
            receiverId:otherUserID
        })
    })
    db.collection('chats').doc(`${arr[0]}${arr[1]}`).get().then(doc=>{
        doc.data && setCurrentChatMessages(doc.data().msgs)
        scrollToBottom()
    })


}



export {addUser,getUserFromSearch,createNewChat,getAllContactedUsers,getMessagesForAChat,addMessageForAChat,deleteAChat};