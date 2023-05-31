import { Request, Response } from "express";
import { iLogin } from "../interfaces/login.interface";
import { createLoginService } from "../services/login/login.service";

export async function createLoginController(request:Request, response:Response):Promise<Response>{

    const loginData:iLogin = request.body

    const token = await createLoginService(loginData)

    return response.status(200).json({token})
}

