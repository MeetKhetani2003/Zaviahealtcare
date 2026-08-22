import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login';
  const isInquiryApi = req.nextUrl.pathname === '/api/inquiries' && req.method === 'GET';

  if (isAdminRoute || isInquiryApi) {
    const sessionCookie = req.cookies.get('admin_session')?.value;
    const expectedSession = process.env.ADMIN_PASSWORD || 'admin_secret';

    if (sessionCookie === expectedSession) {
      return NextResponse.next();
    }

    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/inquiries'],
};
