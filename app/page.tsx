"use client"

import {useState} from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
    const [logEmail,
        setLogEmail] = useState('');
    const [logPassword,
        setLogPassword] = useState('');
    const [responseMessage,
        setResponseMessage] = useState("");
    const [status,
        setStatus] = useState(Number);

    const login = async() => {
        const res = await fetch("/api/login", {
            method: 'POST',
            body: JSON.stringify({Email: logEmail, Password: logPassword}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        setStatus(res.status);
        setResponseMessage(result.message);
    }

    return (
        <div className="bg-blue-200 h-screen">
            <div id="center">
                <div id='div2'>

                    <div className='input'>
                        <input
                            type='text'
                            placeholder="Enter Username/Email"
                            name="Username"
                            onChange={e => setLogEmail(e.target.value)}></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input
                            type='password'
                            placeholder="Enter Password"
                            name="Password"
                            onChange={e => setLogPassword(e.target.value)}></input>
                    </ div>
                    <br/>
                    <button id="button1" onClick={login}>login</button>
                    <br/>

                    <div className="flex space-x-2">

                        <p className="text-sm">Don't have an account?</p>

                        <Link href="/register">
                            <button className="underline italic font-semibold hover:text-white ">Register</button>
                        </Link>
                       
                       
                    </div>
                    
                    <div className="flex-col"
                        style={{
                        color: status === 200
                            ? redirect('/homepage')
                            : 'red'
                    }}>
                        {responseMessage}
                    </div>

                </div>

            </div>

        </div>
    );
}
