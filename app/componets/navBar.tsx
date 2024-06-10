"use client"

import React, {Fragment} from 'react'
import Link from "next/link"
import BackButton from './buttons/backButton'
import {Popover, PopoverButton, PopoverPanel, Transition} from '@headlessui/react'
import {Bars3Icon} from '@heroicons/react/16/solid'
import {BackspaceIcon} from '@heroicons/react/24/outline'
import LogoutButton from './buttons/logout'

const NavBar = () => {
    return (

        <Popover className='container mx-auto flex items-center px-6 py-2 h-24'>
            <h1>GoKart</h1>
            <div className='grow'>
                <div className='hidden sm:flex items-center justify-center gap-2 md:gap-8'>

                    <Link href='/homepage'>Home</Link>
                    <Link href='/settings'>Settings</Link>
                    <Link href='/board'>LeaderBoard</Link>

                </div>
            </div>
            <div className='flex items-center justify-end sm:hidden'>
                <PopoverButton
                    className="inline-flex items-center justify-center rounded-md bg-white p-2">
                    <span className='sr-only'>Open Menu</span>
                    <Bars3Icon className='h-6 w-6'/>
                </PopoverButton>
            </div>
            <Transition
                enter="duration-300 ease-out"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-50">
                <PopoverPanel
                    focus
                    className="absolute inset-x-0 top-0 origin-top-right trandsform p-2 transition md:hidden">
                    <div
                        className='rounded-lg bg-white shadow-lg ring-1 ring-block ring-opacity-5 divide-y-2 divide-gray-50'>
                        <div className='px-5pt-5 pb-6'>
                            <div className='flex items-center justify-end'>
                                <div className='mr-2'>
                                    <PopoverButton className="rounded-md bg-white p-2">
                                        <span className='sr-only'>Open Menu</span>
                                        <BackspaceIcon className='h-6 w-6' aria-hidden="false"/>
                                    </PopoverButton>
                                </div>
                            </div>
                            <div className='mt-4 p-3'>
                                <nav className='grid gap-y-8'>
                                    <Link href='/homepage'>Home</Link>
                                    <Link href='/settings'>Settings</Link>
                                    <Link href='/board'>LeaderBoard</Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </PopoverPanel>
            </Transition>

            <div className='hidden sm:block'>
                <LogoutButton/>
            </div>
        </Popover>

    )
}

export default NavBar