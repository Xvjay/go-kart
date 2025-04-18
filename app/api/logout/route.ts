import {NextResponse} from "next/server";

export async function GET() {
    try {

        const response = NextResponse.json({message: "Logout :)", success: true})
        response
            .cookies
            .set("user", "", {
                httpOnly: true,
                expires: new Date(0)
            });
        response
            .cookies
            .set("TeamColor", "", {
                httpOnly: true,
                expires: new Date(0)
            });
        response
            .cookies
            .set("SubTeamColor", "", {
                httpOnly: true,
                expires: new Date(0)
            });
        return response;

    } catch (error : any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500});

    }

}