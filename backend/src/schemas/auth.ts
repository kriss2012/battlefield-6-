import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long').max(30),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    playerName: z.string().optional(),
    playerId: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, 'Username or email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
  }),
});
