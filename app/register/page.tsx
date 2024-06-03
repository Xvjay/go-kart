import React from 'react'
import RegisterButton from '../componets/buttons/registerButton'
import BackButton from '../componets/buttons/backButton'

const register = () => {
    return (

        <body className="bg-blue-200">
            <div id='center'>
                <div id='div1'>

                    <div className='input'>
                        <input type='text' placeholder='Enter Username'></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input type='email' placeholder='Enter Email'></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input type='password' placeholder='Enter Password'></input>
                    </ div>
                    <br/>
                    <div className='input'>
                        <input type='password' placeholder='Re-Enter Password'></input>
                    </ div><br/>

                    <RegisterButton/>
                    <br/>
                    <BackButton/>
                </div>
            </div>

        </body>

    )
}

export default register