"use client"

import React, { useEffect, useState } from 'react'
import NavBar from '../componets/navBar'
import Link from 'next/link';

const SubTeam = () => {
  const [enabled,
    setEnabled] = useState(false)

const [teamMembers,
    setTeamMembers] = useState < any[] > ([]);
const [selectedColor,
    setSelectedColor] = useState(null);

useEffect(() => {
    const fetchTeamColors = async() => {
        try {
            const response = await fetch('/api/join/join2');
            const data = await response.json();
            setTeamMembers(data);
        } catch (error) {
            console.error('Error fetching team colors:', error);
        }
    };

    fetchTeamColors();
}, []);

const handleClick = (color : any) => {
    setSelectedColor(color);
};

useEffect(() => {
    const saveColor = async() => {
        if (selectedColor) {
            const res = await fetch("/api/join/join2", {
                method: 'POST',
                body: JSON.stringify({TeamColor: selectedColor, teamCap: enabled}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' 
            });
            console.log("lol");
        }
    };

    saveColor();
}, [selectedColor]);

    return (
        <div className="bg-blue-200 flex flex-col h-screen justify-evenly">
            <NavBar/>

            <div className="m-auto">
            <ul className='flex flex-row'>
                    {teamMembers.map((member, index) => (
                        <li
                            key={index}
                            className="p-4 bg-blue-700 m-2 rounded-lg"
                            onClick={() => handleClick(member.TeamColor)}>

                            <button>
                                <Link href="" className="text-white">
                                    {member.TeamColor}
                                </Link>
                            </button>

                        </li>

                    ))}

                </ul>


              
            </div>


        </div>

    )
}

export default SubTeam