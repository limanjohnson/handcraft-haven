export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: 'buyer' | 'seller' | 'admin';
    created_at: Date;
}

export interface UserWithRelations extends User {
    ratings?: Rating[];
    wishlist?: WishList[];
}

export interface Rating {
    id: number;
    user_id: number;
    product_id?: number;
    rating: number;
    comment?: string;
    created_at: Date;
}

export interface WishList {
    id: number;
    user_id: number;
    created_at: Date;
}