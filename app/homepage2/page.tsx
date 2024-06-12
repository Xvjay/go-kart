import React from 'react'
import NavBar from '../componets/navBar'
import Link from 'next/link'

const homePage2 = () => {
    return (
        <div className="bg-blue-200 flex flex-col h-screen justify-evenly">
            <NavBar/>

            <div className="m-auto">
                <div >
                    <div id='button1'>

                        YOU ARE ON A TEAM
                    </div> <br/> <br/>
                  
                </div>
            </div>

        </div>

    )
}

export default homePage2