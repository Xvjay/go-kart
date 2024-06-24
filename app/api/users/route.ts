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
    const db = await pool.getConnection();
    const {Name, Email, Password} = await request.json();

    try {
        const query1 = 'Select Email from users where Email = (?)'
        const [result1] : [any[], any[]] = await db.execute(query1, [Email])
        const res2 = result1.map(row => row.Email);
        console.log(res2)

        if (res2[0].length > 0) {
            console.log("yes")
        } else {
            console.log("no")
            // const query2 = 'Select Name from users where Name = (?)'
            // const [user] : [any[], any[]] = await db.execute(query2, [Name])
            // const user1 = user.map(row => row.Name)
            // console.log(user1[0])

            // if (user1[0] > 1) {
            //     console.log("yes")
            // } else {
            //     console.log("no")
            // }

        }

    } catch (error) {
        return NextResponse.json({
            message: "hello"
        }, {status: 303})

    }

    // const query = 'INSERT INTO users (Name, Email, Password) VALUES (?, ?, ?)';
    // const [result] = await db.execute(query, [Name, Email, Password]);
    // db.release();
    return NextResponse.json({
        message: "User created successfully"
    }, {status: 200});

}
