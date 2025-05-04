export { auth as middleware } from '@/auth';
export const config = {
  matcher: [
    // '/((?!auth).*)(.+)|/verify',
    // "/((?!api|_next/static|_next/image|favicon.ico|/|/auth).*)",
    '/((?!api|_next/static|_next/image|favicon.ico|auth|verify|home|tournaments|teams|organizers-zone|organization|dashboard|score|payment|package|$).*)',
  ],
};
