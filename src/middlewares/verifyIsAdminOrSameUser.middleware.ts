import { NextFunction, Request, Response} from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";


async function verifyIsAdminOrSameUserMiddleware(req:Request, response:Response, next:NextFunction){

    if(!req.user.admin && req.user.id !== Number(req.params.id)){
        throw new AppError("Insufficient permission", 403);
    }
    
	return next();
}
export default verifyIsAdminOrSameUserMiddleware

