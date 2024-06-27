import pool from "@/app/libs/mysql";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const { Email, Password } = await request.json();
  const query = "SELECT * FROM users WHERE Email = ?";
  const query1 = "SELECT * FROM users WHERE Name = ?";

  const db = await pool.getConnection();
  const [email]: any = await db.execute(query, [Email]);
  const email_1 = email.map((row: { Email: any }) => row.Email);
  console.log(email_1[0]);
  const [user]: any = await db.execute(query1, [Email]);
  const user_1 = user.map((row: { Name: any }) => row.Name);
  console.log(user_1[0]);

  if (email_1[0] === undefined) {
    if (user_1[0] === undefined) {
      db.release();
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 201 }
      );
    }
  }

  const query2 = "SELECT Id,Email FROM users WHERE Email = ? AND Password = ?";
  const query2_1 = "SELECT Id,Name FROM users WHERE Name = ? AND Password = ?";

  const query3 =
    "SELECT Parent_TeamId as TeamId, TeamColor, CaptainId  FROM users left join subte" +
    "am_users on users.Id = subteam_users.UserId left join team_subsets on subteam_us" +
    "ers.SubteamId = team_subsets.Child_TeamId left join teams on team_subsets.Parent" +
    "_TeamId = teams.TeamId where Email = ?";
    const query3_1=
    "SELECT Parent_TeamId as TeamId, TeamColor, CaptainId  FROM users left join subte" +
    "am_users on users.Id = subteam_users.UserId left join team_subsets on subteam_us" +
    "ers.SubteamId = team_subsets.Child_TeamId left join teams on team_subsets.Parent" +
    "_TeamId = teams.TeamId where Name = ?";
  const query4 =
    "SELECT Child_TeamId as TeamId, TeamColor, CaptainId , Parent_TeamId FROM users l" +
    "eft join subteam_users on users.Id = subteam_users.UserId left join team_subsets" +
    " on subteam_users.SubteamId = team_subsets.Child_TeamId left join teams on team_" +
    "subsets.Child_TeamId = teams.TeamId where Email = ?";
    const query4_1 =
    "SELECT Child_TeamId as TeamId, TeamColor, CaptainId , Parent_TeamId FROM users l" +
    "eft join subteam_users on users.Id = subteam_users.UserId left join team_subsets" +
    " on subteam_users.SubteamId = team_subsets.Child_TeamId left join teams on team_" +
    "subsets.Child_TeamId = teams.TeamId where Name = ?";
  const [ver1]: any = await db.execute(query2, [Email, Password]);
  console.log(ver1[0])

  const [ver2]: any = await db.execute(query2_1, [Email, Password]);
  console.log(ver2[0])



  const [rows3]: any = await db.execute(query3, [Email]);
  const [rows3_1]: any = await db.execute(query3_1, [Email]);

  const [rows4]: any = await db.execute(query4, [Email]);
  const [rows4_1]: any = await db.execute(query4_1, [Email]);

  let currUser;
  let currTeam; 
  let currSubTeam;

  if (ver1[0] === undefined || ver1 === "") {
   
    if (ver2[0] === undefined || ver2 === "") {
      db.release();
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        { status: 203 }
      );
    }

    if(ver1[0] !== undefined){ //using email


        currUser = ver1[0];
        currTeam = rows3[0];
        currSubTeam = rows4[0];
        
   
     }else if(ver2[0] !== undefined) { // using username
        currUser = ver2[0];
        currTeam = rows3_1[0];
        currSubTeam = rows4_1[0];
     }else{
       db.release();
       return NextResponse.json(
         {
           message: "Error",
         },
         { status: 202 }
       );
     
     }

  } 


  db.release();

  const serializedCookie2 = serialize("TeamColor", JSON.stringify(currTeam), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  const serializedCookie = serialize("user", JSON.stringify(currUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  const serializedCookie3 = serialize(
    "SubTeamColor",
    JSON.stringify(currSubTeam),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    }
  );

  const response = NextResponse.json(
    {
      message: "Login successful",
    },
    { status: 200 }
  );

  response.headers.append("Set-Cookie", serializedCookie);
  response.headers.append("Set-Cookie", serializedCookie2);

  response.headers.append("Set-Cookie", serializedCookie3);

  return response;
}
