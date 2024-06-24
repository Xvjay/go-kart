"use client"
import React, { useEffect, useState } from 'react'
import NavBar from '../componets/navBar'
import Link from 'next/link'

const Board = () => {

    
    const [teamMembers,
        setTeamMembers] = useState < any[] > ([]);
   

    useEffect(() => {
        const fetchTeamColors = async() => {
            try {
                const response = await fetch('/api/board');
                const data = await response.json();
                setTeamMembers(data);
            } catch (error) {
                console.error('Error fetching team colors:', error);
            }
        };

        fetchTeamColors();
    }, []);
    return (
        <div className='bg-blue-200 flex flex-col h-screen'>
            <NavBar/>
            <div className='flex m-auto text-center '>
                <div className=" bg-[#93c5fd] max-h-full rounded-lg">
                    LEADER BOARD
                    <div
                        className='bg-blue-200 flex flex-col justify-evenly p-1 m-6 rounded-lg max-h-min	'>
  <ul className='flex flex-col'>
                    {teamMembers.map((member, index) => (
                        <li
                            key={index - 2}
                            className="p-4 bg-blue-700 m-2 rounded-lg">

                            <button>
                                <Link href="/teams" className="text-white ">
                                    {member.TeamColor}
                                    <br/>
                                    {member.points}

                                </Link>
                            </button>

                        </li>

                    ))}

                </ul>
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