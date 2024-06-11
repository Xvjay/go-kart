import pool from '@/app/libs/mysql';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    const db = await pool.getConnection();
    const query = 'SELECT TeamColor FROM teams';
    const [rows] = await db.execute(query)

    return NextResponse.json(rows)
}

export async function POST(request: Request){

    const { TeamColor  } = await request.json();
    const color = TeamColor;
    const serializedCookie = serialize('TeamColor', JSON.stringify(color), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    const response = NextResponse.json({
        message: "User found"
    }, { status: 201 });

    response.headers.set('Set-Cookie', serializedCookie);

    return response;


}
