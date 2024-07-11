import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await pool.getConnection();
  const query =
    "SELECT t1.TeamId AS ParentTeamId, t1.TeamColor AS ParentTeamColor, t1.CaptainId AS ParentCaptainId, t2.TeamId AS ChildTeamId, t2.TeamColor AS ChildTeamColor, t2.CaptainId AS ChildCaptainId FROM  team_subsets ts JOIN  teams t1 ON ts.Parent_TeamId = t1.TeamId JOIN teams t2 ON ts.Child_TeamId = t2.TeamId;";
  const [rows] = await db.execute(query);
  db.release();

  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { points, color } = await request.json();
  console.log(points);
  console.log(color);

  const db = await pool.getConnection();
  const query1 = "SELECT Points from team_subsets where Child_TeamId = ?;";
  const [curPoints]: [any[], any[]] = await db.execute(query1, [color]);
  const curPointss = curPoints.map((row) => row.Points);

  let totalPoint = curPointss[0] + parseInt(points);

  const query2 = "UPDATE team_subsets SET Points = ? WHERE Child_TeamId = ?";
  const [rows] = await db.execute(query2, [totalPoint, color]);
  db.release();

  return NextResponse.json(
    {
      message: "sdfsdfsdfsdf",
    },
    { status: 201 }
  );
}
