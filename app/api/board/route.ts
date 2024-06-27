import pool from '@/app/libs/mysql';
import {NextResponse} from 'next/server';

export async function GET() {

    const db = await pool.getConnection();
    const query = 'SELECT Parent_TeamId , TeamColor , sum(Points) as points from team_subsets left join teams on team_subsets.Parent_TeamId = teams.TeamId group by Parent_TeamId order by points desc';
    const [rows] = await db.execute(query)

    db.release();



    return NextResponse.json(rows)

}