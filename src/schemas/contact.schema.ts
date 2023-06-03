import * as z from 'zod';
import { userReqSchema } from "../schemas/users.schema";

export const contactReqSchema = z.object({
  fullName: z.string().min(3).max(100),
  email: z.string().email().max(100),
  phone: z.string().max(20),
});

export const returnContactSchema = contactReqSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable()
});

export const contactResponseSchema = returnContactSchema;

export const returnMultipleContactsSchema = contactResponseSchema.array();

export const contactUpdateSchema = contactReqSchema
  .pick({ fullName: true, email: true, phone: true })
  .partial();