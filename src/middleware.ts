import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get("token")?.value

    const protectedRoutes = ["/dashboard"]

    const authRoutes = ["/login", "/register"]

    const path = request.nextUrl.pathname

    if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (authRoutes.some(route => path.startsWith(route)) && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"]
}