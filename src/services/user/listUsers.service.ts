import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IUsersReturn } from "../../interfaces/user.interfaces";
import { returnMultipleUsersSchema } from "../../schemas/users.schema";
import { plainToInstance } from "class-transformer";

export const listUsersService = async (): Promise<IUsersReturn> => {

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const users: User[] = await userRepository.find();

  
  return plainToInstance(User,returnMultipleUsersSchema.parse(users)) 
}

