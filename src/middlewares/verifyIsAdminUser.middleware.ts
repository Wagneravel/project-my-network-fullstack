import { NextFunction, Request, Response} from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import { User } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

async function verifyIsAdminUserMiddleware(req:Request, response:Response, next:NextFunction): Promise<Response | void>{

    const userId = req.user.id
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const userS = await userRepository.findOne({
        where: {
        id: Number(userId)
        },
    });
    console.log(userS?.admin)


    if(userS?.admin === false){
        throw new AppError("Insufficient permission", 403);
    }
	return next();
}
export default verifyIsAdminUserMiddleware

