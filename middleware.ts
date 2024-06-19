import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

export function middleware(req : NextRequest) {

    const teamColor = req
        .cookies
        .get('TeamColor')
        ?.value;
    let teamColorId = '';
    if (teamColor) {
        const parsedCookie = JSON.parse(teamColor);
        teamColorId = parsedCookie.TeamColor;
    }
    console.log(teamColorId)

    const userCookie = req
        .cookies
        .get('user');

    const currentPath = req.nextUrl.pathname;

    function remove(ress: NextResponse<unknown>) {
        if (teamColorId === null) {
            ress
                .cookies
                .delete('TeamColor')
            ress
                .cookies
                .delete('SubTeamColor')
            return ress;
        }
        return ress;
    }

    if (userCookie && currentPath === "/") {

        return NextResponse.redirect(new URL('/homepage', req.url));

    } else if (teamColor && currentPath === "/homepage") {
        let ress = NextResponse.redirect(new URL('/homepage2' , req.url))
        ress = remove(ress)
        return ress


    } else if (!teamColor && currentPath === "/homepage2") {
        return NextResponse.redirect(new URL('/homepage', req.url));

    } else {
        return NextResponse.next();
    }

}
export const config = {
    matcher: ["/", "/api/login", "/join", "/homepage", "/homepage2"]
};
