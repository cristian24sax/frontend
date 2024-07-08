import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    // Redirige a /dashboard si el path es /
    if (url.pathname === '/') {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
  {
    // Puedes personalizar el comportamiento aquí
  }
);

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
