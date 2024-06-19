import pool from '@/app/libs/mysql';

import {NextResponse} from 'next/server';

export async function GET() {

    const db = await pool.getConnection();
    const query = 'select * from teams left join team_subsets on teams.TeamId = team_subsets.Parent' +
            '_TeamId where teams.TeamId = Parent_TeamId;';
    const [rows] = await db.execute(query)

    return NextResponse.json(rows)
}

export async function POST(req : Request) {

    const {teamColor, subTeams} = await req.json();
    console.log(teamColor)
    console.log(subTeams)
    const db = await pool.getConnection();
    const query = 'INSERT INTO teams (TeamColor) VALUES (?)';
    const [rows] = await db.execute(query, [teamColor])
    const id = 'SELECT teamId FROM teams where (TeamColor) = ?'
    const [ids] : [any[], any[]] = await db.execute(id, [teamColor])
    const teamIds = ids.map(row => row.teamId);
    console.log(teamIds[0]);

    for (let i = 1; i <= subTeams; i++) {

        const query2 = 'INSERT INTO teams (TeamColor) VALUES (?)';
        const sub = teamColor + "_" + i
        const [rows1] = await db.execute(query2, [sub])
        const subid = 'SELECT teamId FROM teams where (TeamColor) = ?'
        const [subId] : [any[], any[]] = await db.execute(subid, [sub])
        const subIds = subId.map(row => row.teamId);

        const query3 = 'INSERT INTO team_subsets (Parent_TeamId , Child_TeamId) values (? , ?)'
        const [subSets] = await db.execute(query3, [teamIds[0], subIds[0]])

    }

    return NextResponse.json({
        message: 'hello'
    }, {status: 200});
}