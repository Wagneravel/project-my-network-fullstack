import { NextFunction, Request, Response} from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import { User } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

async function verifyIsAdminOrSameUserMiddleware(req:Request, response:Response, next:NextFunction){

    const userId = req.user.id
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const userS = await userRepository.findOne({
        where: {
        id: Number(userId)
        },
    });
    console.log(userS?.admin)

    if(userS?.admin === false && req.user.id !== Number(req.params.id)){
        throw new AppError("Insufficient permission", 403);
    }
	return next();
}
export default verifyIsAdminOrSameUserMiddleware

