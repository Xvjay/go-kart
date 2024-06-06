"use client"
import React, {useState} from 'react'
import RegisterButton from '../componets/buttons/registerButton'
import BackButton from '../componets/buttons/backButton'
import Link from 'next/link'

const register = () => {
    const [regUsername,
        setRegUsername] = useState('');
    const [regEmail,
        setRegEmail] = useState('');
    const [regPassword,
        setRegPassword] = useState('');

    const handleRegister = async() => {
        const response = await fetch('/api/users', {

            method: 'POST',
            body: JSON.stringify({Name: regUsername, Email: regEmail, Password: regPassword}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    };

    return (

        <div className="bg-blue-200 h-screen">
            <div id='center'>
                <div id='div1'>
                    <div className='input'>
                        <input
                            type='text'
                            name='Username'
                            placeholder='Enter Username'
                            onChange={e => setRegUsername(e.target.value)}></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input
                            type='email'
                            name='Email'
                            placeholder='Enter Email'
                            onChange={e => setRegEmail(e.target.value)}></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input
                            type='password'
                            name='Password'
                            placeholder='Enter Password'
                            onChange={e => setRegPassword(e.target.value)}></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input type='password' placeholder='Re-Enter Password'></input>
                    </ div><br/>

                    <Link href="/">
                        <button id='button1' onClick={handleRegister}>register</button>
                    </Link>
                    <br/>
                    <BackButton/>
                </div>
            </div>

        </div>

    )
}

export default register