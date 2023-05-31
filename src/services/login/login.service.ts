import { compare } from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iLogin } from "../../interfaces/login.interface";


require('dotenv').config();

export async function createLoginService(loginData: iLogin): Promise<string> {
  
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
    { admin: user.admin },
    String(process.env.SECRET_KEY),
    { expiresIn: process.env.EXPIRES_IN!, subject: String(user.id) }
  );

  return token;
}
