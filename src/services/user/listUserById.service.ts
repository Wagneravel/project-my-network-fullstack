import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IUserReq, IUserReturn } from "../../interfaces/user.interfaces"
import { plainToInstance } from "class-transformer";

export async function getUserByIdService(userId: string): Promise<IUserReq> {
  
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: Number(userId)
    },
    relations: {
      contacts: {
        // user: true
      }
    }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return plainToInstance(User, user);
}
