export { default } from 'next-auth/middleware'
export const config = {
  matcher: ['/create-prompt', '/profile/:path*', '/update-prompt'],
}
