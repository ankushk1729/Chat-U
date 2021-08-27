import React,{useState} from 'react'
import { useAuth } from '../hooks/use-auth'
import {db, firebase} from '../firebase/index';
import { IoClose } from "react-icons/io5";

function UploadModal({setDownloadURL,setShowModal,downloadURL}) {
    const auth = useAuth()
    const [progress, setProgress] = useState(null)
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    const [imageSrc, setImageSrc] = useState('')

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
            setImageSrc(URL.createObjectURL(e.target.files[0]))
            setFileName(e.target.files[0].name)
        }
    }
    const handleFileUpload = (fileName) => {
        const storage = firebase.storage()
        const storageRef = storage.ref()
        let uploadTask = storageRef.child('Avatars/' + fileName).put(image)
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot)=>{
            let progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
            setProgress(progress)
            if(progress === 100) setShowModal(false)
            
        },(error)=>{
            throw error
        },()=>{
            uploadTask.snapshot.ref.getDownloadURL().then(async(url) =>{
                setDownloadURL(url)
                await auth.user.updateProfile({
                    photoURL:url
                })
               await db.collection('users').doc(auth.user.uid).update({
                   photoURL:url
               }).then(()=>{
                   console.log('Success')
               }).catch(()=>{
                   console.log('error')
               })
               
            }
        )
    })}
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
   	<div className="absolute bg-black opacity-80 inset-0 z-0"></div>
    <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white h-40%">
      <div className=" h-full flex flex-col">
           <div className = 'header flex justify-between'>
              <h1 className = 'text-2xl'>Upload Photo</h1>
                <div onClick = {()=>setShowModal(false)} className = 'cursor-pointer'>
                    <IoClose size = {25}/>
                </div>
        
            </div>
        <div className = 'image-upload flex-1 p-8'>
            <div className = 'flex justify-around items-center'>
            <label className = 'px-6 py-2 border border-blue-dark rounded-md cursor-pointer text-blue-dark hover:bg-blue-dark hover:text-white' htmlFor = 'file'>Choose a file</label>
            <input onChange = {handleChange} type = 'file' id = 'file' hidden accept="image/x-png,image/gif,image/jpeg"></input>
            {fileName && <p className = ''>{fileName}</p>}
            {imageSrc && <img alt = "upload" width = '50px' height = '50px' src = {imageSrc}></img>}
            </div>
            <div className = 'mt-10 flex items-center justify-center'>
                
            {image && <button className = 'mr-4 px-6 py-2 bg-blue-dark rounded-md text-white hover:opacity-90' onClick = {()=>{handleFileUpload(auth.user.email); setShowLoading(true)} }>Upload</button>}
            {showLoading && progress!== 100 && <section className = 'h-70px w-70px'>
                <div className="loader six flex items-center justify-between">
                    <div></div><div></div><div></div>
                </div>
	        </section>}
            </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default UploadModal
