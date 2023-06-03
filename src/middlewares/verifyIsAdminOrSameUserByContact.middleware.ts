import { NextFunction, Request, Response} from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import { User, Contact } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

async function verifyIsAdminOrSameUserByContactMiddleware(req:Request, response:Response, next:NextFunction){
    
    const contactId = Number(req.params.id)
    const userId = req.user.id
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);


    const userS = await userRepository.findOne({
        where: {
        id: Number(userId)
        } 
    });

    const contact: Contact | null = await contactRepository.findOne({
        where: {
            id: Number(contactId),
        },
        relations: {
          user: {
            contacts: true
          }
        } 
    });
    
    if (!contact) {
    return null;
    }

    const idUserPorContact = contact.user.id

    if(userS?.admin === false && req.user.id !== (idUserPorContact) ){
        throw new AppError("Insufficient permission", 403);
    }
	return next();
}
export default verifyIsAdminOrSameUserByContactMiddleware

