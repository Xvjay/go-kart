import pool from '@/app/libs/mysql';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
    const { Email, Password } = await request.json();
    const query = 'SELECT * FROM users WHERE Email = ?';

    const db = await pool.getConnection();
    const [rows]: [any[], any] = await db.execute(query, [Email]);
    db.release();

    if (rows.length === 0) {
        return NextResponse.json({
            message: "User not found"
        }, { status: 404 });
    }

    const query2 = 'SELECT Email FROM users where Email = ? and Password = ?';

    const [rows2]: [any[], any] = await db.execute(query2, [Email, Password]);

    if (rows2.length === 0) {
        return NextResponse.json({
            message: "User not found"
        }, { status: 404 });
    }

    const currUser = rows2[0];

    console.log(currUser);

    const serializedCookie = serialize('user', JSON.stringify(currUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    const response = NextResponse.json({
        message: "User found"
    }, { status: 200 });

    response.headers.set('Set-Cookie', serializedCookie);

    return response;
}
