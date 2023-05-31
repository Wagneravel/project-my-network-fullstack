
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export async function softDeleteUserService(id: number): Promise<void> {


    const userRepository: Repository<User> = AppDataSource.getRepository(User);
  
    const user = await userRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if(user.deletedAt){
      throw new AppError("User was already deleted", 404);
    }

    userRepository.softDelete(user.id)
  
    await userRepository.save(user);
  }
  