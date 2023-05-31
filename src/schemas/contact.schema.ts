// import * as z from 'zod';

// export const contactReqSchema = z.object({
//   name: z.string().min(3).max(45),
//   email: z.string().email().max(45),
//   phone: z.string().max(20),
//   createdAt: z.string(),
// });

// export const returnContactSchema = contactReqSchema.extend({
//   id: z.number(),
//   userId: z.number(),
//   updatedAt: z.string(),
//   deletedAt: z.string().nullable(),
// });

// export const contactResponseSchema = returnContactSchema;

// export const returnMultipleContactsSchema = contactResponseSchema.array();
