import pool from '@/app/libs/mysql';
import {NextResponse} from 'next/server';
import {serialize} from 'cookie';

export async function POST(request : Request) {
    const {Email, Password} = await request.json();
    const query = 'SELECT * FROM users WHERE Email = ?';

    const db = await pool.getConnection();
    const [rows] : [any[], any] = await db.execute(query, [Email]);

    if (rows.length === 0) {
        db.release();
        return NextResponse.json({
            message: "User not found"
        }, {status: 401});
    }

    const query2 = 'SELECT Id,Email FROM users WHERE Email = ? AND Password = ?';
    const query3 = 'SELECT Parent_TeamId as TeamId, TeamColor, CaptainId  FROM users left join subte' +
            'am_users on users.Id = subteam_users.UserId left join team_subsets on subteam_us' +
            'ers.SubteamId = team_subsets.Child_TeamId left join teams on team_subsets.Parent' +
            '_TeamId = teams.TeamId where Email = ?'
    const query4 = "SELECT Child_TeamId as TeamId, TeamColor, CaptainId , Parent_TeamId FROM users left" +
            " join subteam_users on users.Id = subteam_users.UserId left join team_subsets on" +
            " subteam_users.SubteamId = team_subsets.Child_TeamId left join teams on team_sub" +
            "sets.Child_TeamId = teams.TeamId where Email = ?"
    const [rows2] : [any[], any] = await db.execute(query2, [Email, Password]);
    const [rows3] : [any[], any] = await db.execute(query3, [Email]);
    const [rows4] : [any[], any] = await db.execute(query4, [Email]);

    if (rows2.length === 0) {
        db.release();
        return NextResponse.json({
            message: "Invalid password"
        }, {status: 402});
    }
    const currUser = rows2[0];
    const currTeam = rows3[0];
    const currSubTeam = rows4[0];

    db.release();

    const serializedCookie = serialize('user', JSON.stringify(currUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    });

    const serializedCookie2 = serialize('TeamColor', JSON.stringify(currTeam), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    });
    const serializedCookie3 = serialize('SubTeamColor', JSON.stringify(currSubTeam), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    });

    const response = NextResponse.json({
        message: "User found"
    }, {status: 200});

    response
        .headers
        .append('Set-Cookie', serializedCookie);
    response
        .headers
        .append('Set-Cookie', serializedCookie2);
    response
        .headers
        .append('Set-Cookie', serializedCookie3);

    return response;
}
