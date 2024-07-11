"use client"
import React, {useEffect, useState} from 'react'
import NavBar from '../componets/navBar'
import Link from 'next/link'

const homePage2 = () => {

    const [teamMembers,
        setTeamMembers] = useState < any[] > ([]);

    useEffect(() => {
        const fetchTeamColors = async() => {
            try {
                const response = await fetch('/api/homepage');
                const data = await response.json();
                setTeamMembers(data);
            } catch (error) {
                console.error('Error fetching team colors:', error);
            }
        };

        fetchTeamColors();
    }, []);

    return (
        <div className="bg-blue-200 flex flex-col h-screen justify-evenly">
            <NavBar/>

            <div className="m-auto">
                <div >
                    <div className='bg-[#93c5fd] max-h-full rounded-lg'>

                        <ul className='flex flex-col'>
                            {teamMembers.map((member, index) => (
                                <li key={index} className="p-4 bg-blue-700 m-2 rounded-lg ">

                                    <button >
                                        <Link href="/teams" className="text-white space-evenly ">
                                            {member.place + "."}
                                            <span>&nbsp;</span>
                                            {member.TeamColor}
                                            <span>&nbsp;</span>
                                            {member.points}

                                        </Link>
                                    </button>

                                </li>

                            ))}

                        </ul>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default homePage2