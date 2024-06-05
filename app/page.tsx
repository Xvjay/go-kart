"use client"

import {useState} from "react";
import LoginButton from "./componets/buttons/loginButton";
import RegisterButton from "./componets/buttons/registerButton";

export default function Home() {
    // const [loading,
    //     setLoading] = useState(false);

    // const getUser = async() => {
    //     setLoading(true);
    //     const res = await fetch("/api/users", {
    //         headers: {
    //             method: "GET"
    //         }
    //     });
    //     if (res) {
    //         const data = await res.json();
    //         console.log(data);
    //     }

    // }

    return (
        <body className="bg-blue-200">
            <div id="center">
                <div id='div2'>

                    <div className='input'>
                        <input type='text' placeholder="Enter Username/Email"></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input type='password' placeholder="Enter Password"></input>
                    </ div>
                    <br/>
                    <LoginButton/><br/>
                    <RegisterButton/>
                    <br/>
                    {/* <button onClick={getUser}>click me</button> */}

                </div>

            </div>

        </body>
    );
}
