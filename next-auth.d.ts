import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: 'buyer' | 'seller' | 'admin';
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        id: string;
        role: 'buyer' | 'seller' | 'admin';
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: string;
        role: 'buyer' | 'seller' | 'admin';
    }
}