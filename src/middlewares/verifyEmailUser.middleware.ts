import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Email } from "../entities";
import { AppError } from "../errors";

export const checkIfEmailUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const emailRepository: Repository<Email> = AppDataSource.getRepository(Email)
  
    if(!req.body.email && req.method == "PATCH"){
        return  next();
    }
  
    const emailUser = await emailRepository.findOne({
        where: {
            email: req.body.email
        }
    });

    if (emailUser) {
        throw new AppError('Email already exists', 409)
    }
    
    return  next();
};
