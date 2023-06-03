import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schema";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const loginRoutes:Router = Router() 


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login
 *     description: Realiza o login de um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       200:
 *         description: Sucesso. Login realizado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       401:
 *         description: Credenciais inválidas.
 */
loginRoutes.post("", ensureDataIsValidMiddleware(loginSchema), createLoginController)

export default loginRoutes


