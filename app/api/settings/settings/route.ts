import pool from "@/app/libs/mysql";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieValue = req.cookies.get("TeamColor")?.value;
  const cookieValue1 = req.cookies.get("user")?.value;
  let userId = "";
  if (cookieValue1) {
    const parsedCookie = JSON.parse(cookieValue1);
    userId = parsedCookie.Id;
  }
  console.log(userId);

  const cookieValue2 = req.cookies.get("SubTeamColor")?.value;
  let userId2 = "";
  if (cookieValue2) {
    const parsedCookie1 = JSON.parse(cookieValue2);
    if (Array.isArray(parsedCookie1) && parsedCookie1.length > 0) {
      userId2 = parsedCookie1[0].TeamId;
      console.log("TeamId:", userId2);
    } else {
      userId2 = parsedCookie1.TeamId;
    }
  }
  console.log(userId2);

  const db = await pool.getConnection();
  const query1 =
    "  DELETE FROM subteam_users WHERE SubteamId = ? and UserId = ?";
  const [curPoints] = await db.execute(query1, [userId2, userId]);

  cookies().delete("TeamColor");
  cookies().delete("SubTeamColor");

  return NextResponse.json(
    {
      message: "hello",
    },
    { status: 300 }
  );
}
