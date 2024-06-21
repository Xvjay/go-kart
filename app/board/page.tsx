import React from 'react'
import NavBar from '../componets/navBar'
import Link from 'next/link'

const Board = () => {
    return (
        <div className='bg-blue-200 flex flex-col h-screen'>
            <NavBar/>
            <div className='flex m-auto text-center '>
                <div className=" bg-[#93c5fd] max-h-full rounded-lg">
                    <div
                        className='bg-blue-200 flex flex-col justify-evenly p-5 m-12 rounded-lg max-h-min	'>

                        <br/>
                    </div>
                </div>

            </div>
            <div className='flex mr-9 mb-7 justify-end'>
                <Link href="/addPoints">
                    <button id='button1'>
                        ADD POINTS</button>
                </Link>

            </div>

        </div>
    )
}

export default Board