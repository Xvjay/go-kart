import pool from '@/app/libs/mysql';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
    const { Email, Password } = await request.json();
    const query = 'SELECT * FROM users WHERE Email = ?';

    const db = await pool.getConnection();
    const [rows]: [any[], any] = await db.execute(query, [Email]);

    if (rows.length === 0) {
        db.release();
        return NextResponse.json({
            message: "User not found"
        }, { status: 401 });
    }

    const query2 = 'SELECT Id,Email FROM users WHERE Email = ? AND Password = ?';
    const [rows2]: [any[], any] = await db.execute(query2, [Email, Password]);

    if (rows2.length === 0) {
        db.release();
        return NextResponse.json({
            message: "Invalid password"
        }, { status: 402 });
    }

    const currUser = rows2[0];
    db.release();

    const serializedCookie = serialize('user', JSON.stringify(currUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    const response = NextResponse.json({
        message: "User found"
    }, { status: 200 });

    response.headers.set('Set-Cookie', serializedCookie);

    return response;
}
