"use client"

import React, {useState} from 'react'
import NavBar from '../componets/navBar'

const Settings = () => {

    const [curUsername,
        setCurUsername] = useState('');
    const [curEmail,
        setCurEmail] = useState('');
    const [curPassword,
        setCurPassword] = useState('');

    const change = async() => {
        const response = await fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({Name: curUsername, Email: curEmail, Password: curPassword}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    };

    return (

        <div className='bg-blue-200 flex flex-col h-screen'>
            <NavBar/>
            <div className='flex m-auto text-center min-h- '>
                <div className=" bg-[#93c5fd] max-h-full rounded-lg ">
                    <div
                        className='bg-blue-200 flex flex-col justify-evenly 	 m-12 rounded-lg max-h-min	'>
                        <div>Change Username<br/>

                            <input
                                type='text'
                                name='Username'
                                placeholder='Enter new Username'
                                onChange={e => setCurUsername(e.target.value)}/>
                        </div>
                        <div>Change Email<br/>
                            <input
                                type="text"
                                name='Email'
                                placeholder='Enter new Email'
                                onChange={e => setCurEmail(e.target.value)}/>
                        </div>

                        <div>Change Password<br/>
                            <input
                                type='password'
                                name='Password'
                                placeholder='Enter new Password'
                                onChange={e => setCurPassword(e.target.value)}/><br/>
                            <br/>
                            <button id='button1' onClick={change}>
                                change</button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings