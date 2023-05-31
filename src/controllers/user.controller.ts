import { Request, response, Response } from "express"
import { IUserReq } from "../interfaces/user.interfaces"
import { createUserService } from "../services/user/createUser.service"
import { softDeleteUserService } from "../services/user/deleteUser.service"
import { listUsersService } from "../services/user/listUsers.service"
import { updateUserService } from "../services/user/updateUser.service"
import { getUserByIdService } from "../services/user/listUserById.service"

export const createUserController = async (req:Request, res: Response): Promise<Response> => {

    const userData: IUserReq = req.body

    const newUser = await createUserService(userData)
    
    return res.status(201).json(newUser)
}

export async function allUserListController(request:Request, response: Response): Promise<Response>{

    const allList = await listUsersService()

    return response.status(200).json(allList)
}

export const updadeUserController = async (req:Request, res: Response): Promise<Response> => {

    const idUser = parseInt(req.params.id)
    
    const userData = req.body

    const updatedUser = await updateUserService(userData, idUser)

    return res.status(200).json(updatedUser)
}

export async function softDeleteUserController(req: Request, res: Response){

    const  id  = parseInt(req.params.id);
  
    await softDeleteUserService(id);
  
    res.status(204).json();
}

export async function getUserByIdController(req: Request, res: Response): Promise<void> {
    
    const  userId  =  req.params.id;
  
    const user = await getUserByIdService(userId);
    
    res.status(200).json(user);
  
  }