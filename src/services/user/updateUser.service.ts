import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { AppError } from "../../errors"
import { IUpdateResponse } from "../../interfaces/user.interfaces"
import { returnUserSchema, userResponseSchema } from "../../schemas/users.schema"

export const updateUserService = async (newUserData: any, idUser: number): Promise<IUpdateResponse> => {
    if(!Object.keys(newUserData).length){
        throw new AppError('Body cannot be empty, must contain at least phone, fullName, admin, email or password!')
        
    }
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUserData = await userRepository.findOneBy({
        id: idUser
    })
    
    const user = userRepository.create({
        ...oldUserData,
        ...newUserData
    })

    await userRepository.save(user)

    const updateUser = userResponseSchema.parse(user)

    return updateUser
}
