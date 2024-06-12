import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const cookieValue = req
        .cookies
        .get('TeamColor')
        ?.value;
   
    console.log(cookieValue);

    cookies().delete("TeamColor");

    return NextResponse.json({
        message: 'hello'
    }, {status: 300});
}