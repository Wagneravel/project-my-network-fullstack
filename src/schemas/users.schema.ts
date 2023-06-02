import { hashSync } from 'bcryptjs';
import * as z from 'zod';

export const userReqSchema = z.object({
  fullName: z.string().min(5).max(120),
  email: z.string().email().max(60),
  phone: z.string().max(20),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

export const returnUserSchema = userReqSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable()
});

export const userResponseSchema = returnUserSchema
  .omit({
    password: true
  });

export const returnMultipleUsersSchema = z.array(userResponseSchema) 

export const userUpdateSchema = userReqSchema
  .pick({ fullName: true, email: true, password: true, phone: true })
  .partial();