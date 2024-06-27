"use client"

import React, {useState} from 'react'
import NavBar from '../componets/navBar'
import Link from 'next/link';

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

    const changeCol = async() => {
        await fetch('/api/settings/settings', {method: 'POST'})

    }

    return (

        <div className='bg-blue-200 flex flex-col min-h-screen bg-auto'>
            <NavBar/>
            <div className='flex m-auto text-center '>
                <div className=" bg-[#93c5fd] max-h-full rounded-lg">
                    <div
                        className='bg-blue-200 flex flex-col justify-evenly p-5 m-12 rounded-lg max-h-min	'>
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
                                    Comfirm</button>
                            

                        </div>
                        <br/>
                        <hr className='bg-stone-950	h-px border-0'></hr>

                        <br/>

                        <div>Change Team</div>

                        <br/>
                        <Link href='/join '>
                            <button id="button1" onClick={changeCol}>Change Team</button>
                        </Link>
                        <br/>

                        <hr className='bg-stone-950	h-px border-0'></hr>
                        <br/>
                        <div>Add Teams</div>

                        <br/>

                        <Link href='/makeTeam'>
                            <button id="button1" onClick={changeCol}>Edit/Add Main Team</button>
                        </Link>

                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings