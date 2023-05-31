import { z } from "zod";
import { returnMultipleUsersSchema, userReqSchema, userResponseSchema, userUpdateSchema } from "../schemas/users.schema";

export interface IUserReq extends z.infer<typeof userReqSchema> {}
export interface IUserReturn extends z.infer<typeof userResponseSchema> {}
export interface IUsersReturn extends z.infer<typeof returnMultipleUsersSchema> {}
export interface IUserUpdateRequest extends z.infer<typeof userUpdateSchema> {}
export interface IUpdateResponse extends z.infer<typeof userResponseSchema> {}
