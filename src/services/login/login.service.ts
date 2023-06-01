import { compare } from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iLogin, iReturnToken} from "../../interfaces/login.interface";

interface ILoginResponse {
  token: string;
  user: {
    email: string;
    id: number;
    fullName: string;
    phone: string;
    admin: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

require('dotenv').config();

export async function createLoginService(loginData: iLogin): Promise<ILoginResponse> {
  
  const userRepository: Repository<User> = AppDataSource.getRepository(User)  

  const user = await userRepository.findOne({ where: { email: loginData.email } });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatches = await compare(loginData.password, user.password);

  if (!passwordMatches) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { user },
    String(process.env.SECRET_KEY),
    { expiresIn: process.env.EXPIRES_IN!, subject: String(user.id) }
  );

  const loginResponse: ILoginResponse = {
    token,
    user: {
      email: user.email,
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      admin: user.admin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    },
  };

  return loginResponse;
}
