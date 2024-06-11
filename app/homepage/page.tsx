import React from 'react'
import NavBar from '../componets/navBar'
import Link from 'next/link'

const homePage = () => {
    return (
        <div className="bg-blue-200 flex flex-col h-screen justify-evenly">
            <NavBar/>

            <div className="m-auto">
                <div >
                    <div id='button1'>

                        <Link href='/join'>
                            <button>Join Team</button> 
                        </Link>
                    </div> <br/> <br/>
                    <div id='button1'>

                        <Link href='/makeTeam'>
                            <button>Make Team</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default homePage