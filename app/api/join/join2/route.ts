import pool from '@/app/libs/mysql';
import {serialize} from 'cookie';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
    const cookieValue = req
    .cookies
    .get('TeamColor')
    ?.value;
    let userId = '';
    if (cookieValue) {
        const parsedCookie = JSON.parse(cookieValue);
        userId = parsedCookie.TeamColor;
    }
    console.log(userId);


    const db = await pool.getConnection();
    const query = ' SELECT teams.*, team_subsets.Parent_TeamId, team_subsets.Child_TeamId FROM team_subsets LEFT JOIN teams ON teams.TeamId = team_subsets.Child_TeamId WHERE teams.TeamId = team_subsets.Child_TeamId AND team_subsets.Parent_TeamId = ?';
    const [rows] = await db.execute(query ,[2])

    return NextResponse.json(rows)
}