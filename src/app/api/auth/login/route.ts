import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPwd = process.env.ADMIN_PASSWORD || 'admin';

    if (username === expectedUser && password === expectedPwd) {
      // For simplicity, we use the password as the session token
      // In a production app, use a proper signed JWT or opaque token
      const sessionToken = process.env.ADMIN_PASSWORD || 'admin_secret';
      
      const cookieStore = await cookies();
      cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
