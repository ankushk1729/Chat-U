import React from 'react'
import {useState} from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Verification() {
    const [toShowLogin, setToShowLogin] = useState(true)
    return (
        <section className = 'w-screen h-screen grid place-items-center bg-gray'>
           
            <article className = 'w-90% authentication md:w-70% lg:w-60% xl:w-50% flex items-center justify-center relative'>
                {toShowLogin?
                <Login toShowLogin = {toShowLogin} setToShowLogin = {setToShowLogin} />
                :<SignUp toShowLogin = {toShowLogin} setToShowLogin = {setToShowLogin} /> }
                <div className = 'absolute -right-30px h-full'></div>
            </article>
        </section>
    )
}

export default Verification
