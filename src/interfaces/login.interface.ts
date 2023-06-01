import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";
import { userResponseSchema } from "../schemas/users.schema";

export type iLogin = z.infer<typeof loginSchema>
export type iReturnToken = z.infer<typeof userResponseSchema>