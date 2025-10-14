'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { pool } from '@/../lib/db';
import { redirect } from 'next/navigation';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

const SignupFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.'}),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.'}),
    confirmPassword: z.string(),
    name: z.string().min(1, { message: 'Name is required. '}),
    role: z.enum(['buyer', 'seller', 'admin']).default('buyer'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
})

export type SignupState = {
    errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        name?: string[];
        role?: string[];
    };
    message?: string;
}

export async function signup(prevState: SignupState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        name: formData.get('name'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields.',
        };
    }

    const { email, password, name, role } = validatedFields.data;

    try {
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return {
                message: 'An account with this email already exists.',
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user to the database
        await pool.query(
            `INSERT INTO users (name, email, password_hash, role, created_at)
             VALUES ($1, $2, $3, $4, NOW())`,
            [name, email, hashedPassword, role]
        );

        console.log(`User created: ${email} with role: ${role}`);

    } catch (error) {
        console.error('Signup error:', error);
        return {
            message: 'Database error: Failed to create account.',
        };
    }

    // Redirect to the login page after successful signup
    redirect('/login?message=Account created successfully. Please log in.');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}