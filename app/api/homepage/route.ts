import pool from "@/app/libs/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieValue = req.cookies.get("user")?.value;
  let TeamColor = "";
  if (cookieValue) {
    const parsedCookie = JSON.parse(cookieValue);
    TeamColor = parsedCookie.TeamColor;
  }
  console.log(TeamColor);

  const db = await pool.getConnection();
  const query =
    "SELECT row_number() over () as place, Parent_TeamId , TeamColor , sum(Points) as points from team_subsets left join teams on team_subsets.Parent_TeamId = teams.TeamId group by Parent_TeamId order by points desc where TeamColor = Blue";
  const [rows] = await db.execute(query, TeamColor);

  db.release();

  return NextResponse.json(rows);
}
