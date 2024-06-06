import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
    const router = useRouter();
    const logout = async () => {
        const res = await fetch("/api/logout", {
            method: 'GET',
        });
        router.push('/');
    }

    return (
        <button id="button1" type="button" onClick={logout}>
            LOGOUT
        </button>
    );
}

export default LogoutButton;
