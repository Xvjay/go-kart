import {NextRequest, NextResponse} from 'next/server';

export function middleware(req : NextRequest) {
    console.log('req', req.nextUrl.pathname);

    const teamColor = req
        .cookies
        .get('TeamColor');
    console.log(teamColor);

    const userCookie = req
        .cookies
        .get('user');
    console.log(userCookie);
    const currentPath = req.nextUrl.pathname;

    const isStaticFile = currentPath.startsWith('/_next/') || currentPath.startsWith('/static/');
    if (isStaticFile) {
        return NextResponse.next();
    }

    if (userCookie && currentPath === "/") {
        return NextResponse.redirect(new URL('/homepage', req.url));
    } else if (teamColor && currentPath === "/join" || teamColor && currentPath === "/homepage" ) {
        return NextResponse.redirect(new URL('/homepage2', req.url));

    } else {
        return NextResponse.next();
    }

}
export const config = {
    matcher: ["/", "/api/login" , "/join" , "/homepage"]
};
