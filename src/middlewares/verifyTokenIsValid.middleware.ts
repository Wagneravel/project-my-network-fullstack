import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

import "dotenv/config"

async function verifyTokenIsValidMiddleware(request: Request,  response: Response, next: NextFunction) {

  let token: string | undefined = request.headers.authorization
  
  if(!token){
    throw new AppError("Missing bearer token", 401);
  }

  token = token?.split(" ")[1]

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {

  if (error) {
    throw new AppError(error.message, 401);
  }

  request.user = {
    id: Number(decoded.sub),
    admin: decoded.admin,
  };

  return next();
});
}

export default verifyTokenIsValidMiddleware;

