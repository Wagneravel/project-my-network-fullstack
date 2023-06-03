import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User, Contact } from "../entities";
import { AppError } from "../errors";

export const verifyIfIdContactExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  
    const findUser = await contactRepository.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    });

    if (!findUser) {
        throw new AppError('Contact not found', 404)
    }
    return  next();
};
