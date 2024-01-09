import { NextRequest, NextResponse } from 'next/server'

export const middleware = (req: NextRequest) => {
  const publicPages = ['/', '/login', '/register']

  // If the user is not logged in but is trying to access a protected route, redirect to login page
  if (
    !publicPages.includes(req.nextUrl.pathname) &&
    !req.cookies.has('token')
  ) {
    req.nextUrl.pathname = '/login'

    const response = NextResponse.redirect(req.nextUrl)
    return response
  }

  // If the user is logged in but is trying to access a public route, redirect to goals page
  if (publicPages.includes(req.nextUrl.pathname) && req.cookies.has('token')) {
    req.nextUrl.pathname = '/goals'

    const response = NextResponse.redirect(req.nextUrl)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - svg files
     */
    `/((?!api|_next/static|_next/image|favicon.ico|.*.svg$).*)`
  ]
}
