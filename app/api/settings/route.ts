import {NextRequest, NextResponse} from "next/server";
import pool from "@/app/libs/mysql";
import {serialize} from "cookie";
import { cookies } from "next/headers";

export async function POST(req : NextRequest) {
    const cookieValue = req
        .cookies
        .get('user')
        ?.value;
    let email = '';
    if (cookieValue) {
        const parsedCookie = JSON.parse(cookieValue);
        email = parsedCookie.Email;
    }
    console.log(email);

    const {Name, Email, Password} = await req.json();
    const db = await pool.getConnection();
    if (Name != "" && Email != "" && Password != "") {
        const query = 'UPDATE users SET Name = ?, Email = ?, Password = ? WHERE Email = ?';
        await db.execute(query, [Name, Email, Password, email]);

    } else if (Name != "" && Email != "") {
        const query1 = 'UPDATE users SET Name = ?, Email = ? WHERE Email = ?';
        await db.execute(query1, [Name, Email, email]);

    } else if (Name != "" && Password != "") {
        const query2 = 'UPDATE users SET Name = ?, Password = ? WHERE Email = ?';
        await db.execute(query2, [Name, Password, email]);

    } else if (Email != "" && Password != "") {
        const query3 = 'UPDATE users SET Email = ?, Password = ? WHERE Email = ?';
        await db.execute(query3, [Email, Password, email]);

    } else if (Email != "") {
        const query4 = 'UPDATE users SET Email = ? WHERE Email = ?';
        await db.execute(query4, [Email, email]);

    } else if (Name != "") {
        const query5 = 'UPDATE users SET Name = ? WHERE Email = ?';
        await db.execute(query5, [Name, email]);

    } else if (Password != "") {
        const query6 = 'UPDATE users SET Password = ? WHERE Email = ?';
        await db.execute(query6, [Password, email]);

    } else {
        NextResponse.json({
            message: 'hello'
        }, {status: 200});

    }

    if (Email != "") {
        const updatedUser = {
            Email
        };
        const serializedCookie = serialize('user', JSON.stringify(updatedUser), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        const response = NextResponse.json({
            message: 'hello'
        }, {status: 300});

        response
            .headers
            .set('Set-Cookie', serializedCookie);

        return response

    }

    return NextResponse.json({
        message: 'hello'
    }, {status: 301});
}

