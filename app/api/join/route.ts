import pool from '@/app/libs/mysql';
import {serialize} from 'cookie';
import { DevBundlerService } from 'next/dist/server/lib/dev-bundler-service';
import {NextRequest, NextResponse} from 'next/server';

export async function GET() {

    const db = await pool.getConnection();
    const query = 'select * from teams left join team_subsets on teams.TeamId = team_subsets.Parent_TeamId where teams.TeamId = Parent_TeamId;';
    const [rows] = await db.execute(query)

    return NextResponse.json(rows)
}

export async function POST(request : NextRequest) {
    const cookieValue = request
        .cookies
        .get('user')
        ?.value;
    let userId = '';
    if (cookieValue) {
        const parsedCookie = JSON.parse(cookieValue);
        userId = parsedCookie.Id;
    }
    console.log(userId);

    const {TeamColor, teamCap} = await request.json();
    console.log(TeamColor)
    console.log(teamCap)
    const color = TeamColor;
    const cap = teamCap;

    if (cap == true) {
        const query = 'UPDATE teams SET CaptainId = ? WHERE TeamColor = ?';

        const db = await pool.getConnection();
        const [rows] : [any[], any] = await db.execute(query, [userId, TeamColor]);
        db.release();
        console.log("yes cap")
    }else{
        console.log("not cap");
    }

    const query = "SELECT * from teams WHERE TeamColor = ?";
    const db = await pool.getConnection();

    const [row] : [any[] , any] = await db.execute(query, [TeamColor])

    const serializedCookie = serialize('TeamColor', JSON.stringify(row), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    });

    const response = NextResponse.json({
        message: "User found"
    }, {status: 201});

    response
        .headers
        .set('Set-Cookie', serializedCookie);

    return response;

}
