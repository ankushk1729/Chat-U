import React from 'react';
import {useState,useRef} from 'react';
import {useAuth} from '../hooks/use-auth';
import { FaRegEnvelope } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import {addUser} from './../firebase/utils';
import {useStateWithCallbackLazy} from 'use-state-with-callback';




function SignUp({toShowLogin,setToShowLogin}) {
    const auth = useAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useStateWithCallbackLazy({emailError:'',passwordError:''});
    const firebaseError = useRef(null)
    
    const handleGoogleSignUp = async() => {
        await auth.signInWithGoogle();
        
        
    }

    const handleSignUpAuth = async(error) => {
        if((!error.emailError) && (!error.passwordError)){
        
            let user = await auth.signup(email,password)
            addUser(user)
           
            setTimeout(()=>{
                if(firebaseError.current) firebaseError.current.style = 'display:none';

            },3000)
            }
     }

     const validate = () => {
         setError(error=>(
            { ...error,
            emailError:(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email).toLowerCase())
            ?'':'Invalid Email Address',
            passwordError:(/^[A-Za-z]\w{7,20}$/).test(String(password).toLowerCase())?'':'Password must be between 8-20 digits and must contain numbers and characters. No special symbols are allowed'
        }),(currentError)=>handleSignUpAuth(currentError))
     }
    
    const  handleSignUp = (e) => {
        e.preventDefault()
        validate()
            
    }

    return (
        <div className = 'w-90% md:w-70%  px-12 bg-white py-8 rounded-lg shadow-md' >
            <p className = 'text-center text-sm md:text-base font-light' >Already have an account?<span onClick = {()=>setToShowLogin(state=>!state)} className = 'underline cursor-pointer'> Login</span></p>
            <h1 className = 'text-center font-bold text-3xl md:text-4+xl mt-6 mb-8'>Sign Up</h1>
            <p ref = {firebaseError} className = "text-red-600 text-xs mb-4 text-center"> {auth.signUpError}</p>
            <form className = 'flex flex-col justify-center' onSubmit = {(e)=> handleSignUp(e)}>
                <div className = 'bg-gray flex items-center px-2 mb-2 rounded'>
                    <FaRegEnvelope/>
                    <input className = 'h-50px bg-gray flex-1 px-2 text-sm outline-none' value = {email} onChange = {(e)=>setEmail(e.target.value)} type = 'email' placeholder = 'Email'></input>
                </div>
                <p className = 'text-red-600 text-xs mb-4'>{error.emailError}</p>
                <div className = 'bg-gray flex items-center px-2 mb-2 rounded'>
                    <FaLock/>
                    <input className = 'h-50px bg-gray flex-1 px-2 text-sm outline-none' value = {password} onChange = {(e)=>setPassword(e.target.value)} type = 'password' placeholder = 'Password'></input>
                </div>
                <p className = 'text-red-600 text-xs'>{error.passwordError}</p>
                <button className = 'text-sm md:text-base py-3 px-4 w-full bg-blue-dark rounded-xl text-white mx-auto mt-8' type = 'submit'>Sign Up</button>
                <button onClick = {handleGoogleSignUp} className = 'w-full flex justify-center items-center px-6 py-3 border mt-4 rounded-lg'>
                    <svg className="ml-3 mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.87566 13.2946L4.10987 16.1534L1.31093 16.2126C0.474461 14.6611 0 12.886 0 10.9997C0 9.17565 0.443609 7.45552 1.22994 5.94092H1.23054L3.72238 6.39776L4.81396 8.87465C4.5855 9.54071 4.46097 10.2557 4.46097 10.9997C4.46106 11.8072 4.60732 12.5808 4.87566 13.2946Z" fill="#FBBB00"></path><path d="M21.8082 8.94507C21.9345 9.61048 22.0004 10.2977 22.0004 11C22.0004 11.7875 21.9176 12.5557 21.7598 13.2967C21.2243 15.8183 19.8252 18.0201 17.8869 19.5782L17.8863 19.5776L14.7477 19.4175L14.3035 16.6445C15.5896 15.8902 16.5947 14.7098 17.1242 13.2967H11.2422V8.94507H17.21H21.8082Z" fill="#518EF8"></path><path d="M17.8865 19.5778L17.8871 19.5784C16.002 21.0937 13.6073 22.0002 11.0006 22.0002C6.81152 22.0002 3.16945 19.6588 1.31152 16.2132L4.87625 13.2952C5.8052 15.7744 8.19679 17.5392 11.0006 17.5392C12.2057 17.5392 13.3348 17.2134 14.3036 16.6447L17.8865 19.5778Z" fill="#28B446"></path><path d="M18.0208 2.53241L14.4573 5.44981C13.4546 4.82307 12.2694 4.46102 10.9996 4.46102C8.13229 4.46102 5.69596 6.30682 4.81356 8.87494L1.23009 5.9412H1.22949C3.06022 2.41154 6.74823 0 10.9996 0C13.6686 0 16.1158 0.950726 18.0208 2.53241Z" fill="#F14336"></path></svg>
                    <p className = 'text-sm md:text-base text-gray-dark'>Continue With Google</p>
                </button>
            </form>
        </div>
    )
}

export default SignUp
