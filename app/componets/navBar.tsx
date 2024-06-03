import React from 'react'
import Link from "next/link"
import BackButton from './buttons/backButton'
import {Popover} from '@headlessui/react'

const NavBar = () => {
    return (

        <Popover
            className='container mx-auto flex items-center borer-b-2 px-6 py-2 h-24'>
            <h1>GoKart</h1>
            <div className='grow'>
                <div className='hidden flex items-center justify-center gap-2 md:gap-8'>

                    <Link href='home'>Home</Link>
                    <Link href='home'>Home</Link>
                    <Link href='home'>Home</Link>

                </div>
            </div>

            
            <div className='hidden'>
                <BackButton/>
            </div>
        </Popover>

    )
}

export default NavBar