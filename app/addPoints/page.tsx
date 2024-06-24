"use client";

import React, {useEffect, useState} from 'react';
import NavBar from '../componets/navBar';
import Link from 'next/link';
import Script from 'next/script';

interface ChildTeam {
    ChildTeamId : number;
    ChildTeamColor : string;
    ChildCaptainId : number;
}
interface ParentTeam {
    ParentTeamId : number;
    ParentTeamColor : string;
    ParentCaptainId : number;
    children : ChildTeam[];
}

const addPoints = () => {
    const [teamMembers,
        setTeamMembers] = useState < ParentTeam[] > ([]);
    const [curPoint,
        setCurPoint] = useState('');

    useEffect(() => {
        const fetchTeamColors = async() => {
            try {
                const response = await fetch('/api/addPoints');
                const data = await response.json();

                const groupedData = data.reduce((acc : any, current : any) => {
                    const {
                        ParentTeamId,
                        ParentTeamColor,
                        ChildTeamId,
                        ChildTeamColor,
                        ParentCaptainId,
                        ChildCaptainId
                    } = current;

                    if (!acc[ParentTeamId]) {
                        acc[ParentTeamId] = {
                            ParentTeamId,
                            ParentTeamColor,
                            ParentCaptainId,
                            children: []
                        };
                    }

                    acc[ParentTeamId]
                        .children
                        .push({ChildTeamId, ChildTeamColor, ChildCaptainId});

                    return acc;
                }, {});

                console.log('Grouped data:', groupedData);

                setTeamMembers(Object.values(groupedData));
            } catch (error) {
                console.error('Error fetching team colors:', error);
            }
        };

        fetchTeamColors();
    }, []);

    
    const change = async(childTeamId : any) => {
        const response = await fetch('/api/addPoints', {
            method: 'POST',
            body: JSON.stringify({points: curPoint , color: childTeamId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    };



    return (
        <div className='bg-blue-200 flex flex-col h-screen'>
            <NavBar/>
            <div className='flex m-auto text-center'>
                <div className="bg-[#93c5fd] max-h-full rounded-lg text-center p-1">
                    ADD POINTS
                    <div
                        className='bg-blue-200 flex flex-col justify-evenly p-6 m-5 rounded-lg max-h-min'>
                        <ul className='flex flex-col'>
                            {teamMembers.map((parent, index) => (
                                <li key={index} className="p-4 bg-blue-900 m-2 rounded-lg">
                                    <div className="text-white">
                                        <div className="font-bold">{parent['ParentTeamColor']}</div>
                                        {parent
                                            .children
                                            .map((child : any, childIndex : any) => (
                                                <div key={childIndex} className="text-white ml-4">
                                                    {child.ChildTeamColor}
                                                    <input
                                                        className='text-black'
                                                        type='number'
                                                        placeholder='Add Points'
                                                        onChange={e => setCurPoint(e.target.value)}/>
                                                    <button id='button1' onClick={ () => change(child.ChildTeamId)}>add</button>
                                                    <br/>
                                                </div>
                                            ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <br/>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default addPoints;
