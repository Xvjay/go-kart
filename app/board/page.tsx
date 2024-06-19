import React from 'react'
import NavBar from '../componets/navBar'

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
            <div className='justify-self-end'>
            <button>el</button>

            </div>

        </div>
    )
}

export default Board