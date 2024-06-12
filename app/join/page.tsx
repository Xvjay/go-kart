"use client"
import Link from 'next/link'
import React, {useEffect, useState} from 'react';
import {Checkbox} from '@headlessui/react'

import NavBar from "../componets/navBar";

const JoinTeam = () => {
    const [enabled,
        setEnabled] = useState(false)

    const [teamMembers,
        setTeamMembers] = useState < any[] > ([]);
    const [selectedColor,
        setSelectedColor] = useState(null);

    useEffect(() => {
        const fetchTeamColors = async() => {
            try {
                const response = await fetch('/api/join');
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
                const res = await fetch("/api/join", {
                    method: 'POST',
                    body: JSON.stringify({TeamColor: selectedColor, teamCap: enabled}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include' // Ensures cookies are included in requests
                });
                const result = await res.json();
                console.log(result.message);
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
                                <Link href="" className="text-white ">
                                    {member.TeamColor}
                                </Link>
                            </button>

                        </li>

                    ))}

                </ul>
                <br/>
                <div className='flex justify-evenly flex-row'>
                    <p>are you goinog to be team capatin? </p> 
                    <Checkbox 
                        checked={enabled}
                        onChange={setEnabled}
                        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500 ml-1 mt-1"></Checkbox>
                </div>

            </div>

        </div>
    );
};

export default JoinTeam;
