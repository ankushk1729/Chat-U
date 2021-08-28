import React from 'react'
import illustration from './../images/illustration.svg'
function HomeLanding() {
    return (
        <div className = 'Illustration grid place-items-center hidden md:w-60% lg:w-70% md:grid'>
            <img className = 'h-70% w-70%' src = {illustration} alt = 'illustration'></img>
        </div>
    )
}

export default HomeLanding
