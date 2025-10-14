import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const userRole = auth?.user?.role;

            console.log('Auth Check:', {
                path: nextUrl.pathname,
                isLoggedIn,
                userRole,
                user: auth?.user,
            });

            // Define protected routes
            const protectedRoutes = [
                '/checkout',
                '/cart',
                '/profile',
                '/orders',
            ];

            const sellerRoutes = [
                '/sellers',
            ];

            const isOnProtectedRoute = protectedRoutes.some(route =>
                nextUrl.pathname.startsWith(route)
            );

            const isOnSellerRoute = sellerRoutes.some(route =>
                nextUrl.pathname.startsWith(route)
            );

            // Seller route protection
            if (isOnSellerRoute) {
                if (!isLoggedIn) {
                    console.log('Not logged in, redirecting to login');
                    return false; // This will redirect to the signIn page
                }
                if (userRole !== 'seller' && userRole !== 'admin') {
                    console.log('User is not a seller, redirecting to home');
                    // Return a Response object directly for the redirect
                    return Response.redirect(new URL('/', nextUrl.origin));
                }
                console.log('Seller access granted');
                return true;
            }

            // General protected route check
            if (isOnProtectedRoute) {
                if (!isLoggedIn) {
                    console.log('Protected route, not logged in');
                    return false; // This will redirect to the signIn page
                }
                console.log('Protected route access granted');
                return true;
            }

            // Redirect logged-in users away from login/signup pages
            if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')) {
                console.log('User is logged in, redirecting to home');
                return Response.redirect(new URL('/', nextUrl.origin));
            }

            console.log('Public route access granted');
            return true;
        },
    },
    providers: [], // Add providers with an empty array
} satisfies NextAuthConfig;