import pool from "@/app/libs/mysql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieValue = req.cookies.get("TeamColor")?.value;
  let TeamColo = "";
  if (cookieValue) {
    const parsedCookie = JSON.parse(cookieValue);
    if (Array.isArray(parsedCookie) && parsedCookie.length > 0) {
      TeamColo = parsedCookie[0].TeamColor;
      console.log("TeamColor:", TeamColo);
    } else {
      TeamColo = parsedCookie.TeamColor;
    }
  }
  console.log("h" + TeamColo);

  const db = await pool.getConnection();
  const query =
    "SELECT row_number() OVER (ORDER BY SUM(Points) DESC) AS place, Parent_TeamId, TeamColor, SUM(Points) AS points FROM team_subsets LEFT JOIN teams ON team_subsets.Parent_TeamId = teams.TeamId GROUP BY Parent_TeamId, TeamColor ORDER BY points DESC";
  const [rows]: [any[], any[]] = await db.execute(query);
  db.release();

  const curPointss = rows.map((row) => row.TeamColor);

  console.log(curPointss[0]);

  const teamPlace = curPointss.findIndex((color) => color === TeamColo);
  console.log("Matching Index:", teamPlace);

  const place = teamPlace + 1;
  console.log(place);

  return NextResponse.json(place);
}
