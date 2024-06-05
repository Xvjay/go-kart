import {NextResponse} from "next/server";
import pool from "@/app/libs/mysql";


export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'SELECT Name FROM users WHERE Id = 1';
        const [rows] = await db.execute(query)
        db.release()

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, {status: 500})
    }
}

export async function POST(request : Request) {
    const {Name, Email, Password} = await request.json();
    const query = 'INSERT INTO users (Name, Email, Password) VALUES (?, ?, ?)';

    const db = await pool.getConnection();
    const [result] = await db.execute(query, [Name, Email, Password]);
    db.release();
    return NextResponse.json({ message: "User created successfully" }, { status: 200 });


}

