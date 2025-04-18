import pool from "@/app/libs/mysql";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let cookieValue = req.cookies.get("TeamColor")?.value;

  while (!cookieValue) {
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        cookieValue = req.cookies.get("TeamColor")?.value;
        resolve();
      }, 100);
    });
  }

  const parsedCookie = JSON.parse(cookieValue);
  cookieValue = parsedCookie[0]?.TeamId;

  console.log(cookieValue);

  const db = await pool.getConnection();
  const query = `
        SELECT teams.*, team_subsets.Parent_TeamId, team_subsets.Child_TeamId
        FROM team_subsets
        LEFT JOIN teams ON teams.TeamId = team_subsets.Child_TeamId
        WHERE teams.TeamId = team_subsets.Child_TeamId AND team_subsets.Parent_TeamId = ?
    `;
  const [rows] = await db.execute(query, [cookieValue]);
  db.release();

  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const cookieValue = request.cookies.get("user")?.value;
  let userId = "";
  if (cookieValue) {
    const parsedCookie = JSON.parse(cookieValue);
    userId = parsedCookie.Id;
  }
  console.log("byebye" + userId);

  const cookieValue2 = request.cookies.get("SubTeamColor")?.value;
  let userId2 = "";
  if (cookieValue2) {
    const parsedCookie1 = JSON.parse(cookieValue2);
    userId2 = parsedCookie1.Child_TeamId;
  }
  console.log("hello" + userId2);

  const { TeamColor } = await request.json();
  console.log("bye" + TeamColor);
  const query =
    "SELECT teams.*, team_subsets.Parent_TeamId, team_subsets.Child_TeamId FROM team_" +
    "subsets LEFT JOIN teams ON teams.TeamId = team_subsets.Child_TeamId where TeamCo" +
    "lor = ?";
  const db = await pool.getConnection();
  const [row] = await db.execute(query, [TeamColor]);

  const query1 = "  SELECT TeamId from teams where TeamColor = ?";

  const db1 = await pool.getConnection();
  const [row1]: [any[], any] = await db1.execute(query1, [TeamColor]);
  const curPointss = row1.map((row) => row.TeamId);

  console.log(curPointss[0]);

  const serializedCookie = serialize("SubTeamColor", JSON.stringify(row), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  if (userId && curPointss[0]) {
    try {
      const query =
        "INSERT INTO subteam_users (SubteamId , UserId) values (?, ?)";
      const db = await pool.getConnection();
      const [row]: [any[], any] = await db.execute(query, [
        curPointss[0],
        userId,
      ]);
    } catch {
      return NextResponse.json(
        {
          message: "An error has happen",
        },
        { status: 201 }
      );
    }
  }

  const response = NextResponse.json(
    {
      message: "You have been added to group",
    },
    { status: 200 }
  );

  response.headers.set("Set-Cookie", serializedCookie);

  return response;
}
