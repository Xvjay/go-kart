"use client"
import React, {useEffect, useState} from 'react'
import NavBar from '../../componets/navBar'
import Link from 'next/link'

const makeSubTeam = () => {

    const [teamMembers,
        setTeamMembers] = useState < any[] > ([]);

    useEffect(() => {
        const fetchTeamColors = async() => {
            try {
                const response = await fetch('/api/makeTeam');
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

            <div className=" flex m-auto">
                <div className=" bg-[#93c5fd] max-h-full rounded-lg">
                    <div
                        className='bg-blue-200 flex flex-col justify-evenly p-5 m-12 rounded-lg max-h-min	'>
                        hello
                        <br/>
                        <br/>

                        <br/>

                        <br/>
                        v hi

                    </div>
                </div>

            </div>

        </div>

    )
}

export default makeSubTeam