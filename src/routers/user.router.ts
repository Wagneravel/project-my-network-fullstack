import { Router } from "express";
import { allUserListController, createUserController, softDeleteUserController, updadeUserController, getUserByIdController } from "../controllers/user.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { checkIfEmailUserExistsMiddleware } from "../middlewares/verifyEmailUser.middleware";
import { verifyIfIdUserExistsMiddleware } from "../middlewares/verifyIdUserExists.middleware";
import verifyIsAdminOrSameUserMiddleware from "../middlewares/verifyIsAdminOrSameUser.middleware";
import verifyIsAdminUserMiddleware from "../middlewares/verifyIsAdminUser.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import { userReqSchema, userUpdateSchema } from "../schemas/users.schema";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';



const userRoutes:Router = Router() 
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criação de usuário
 *     description: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReqSchema'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       409:
 *         description: Email de usuário já existe
 */
userRoutes.post('', checkIfEmailUserExistsMiddleware, ensureDataIsValidMiddleware(userReqSchema),  createUserController)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários
 *     responses:
 *       200:
 *         description: Sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 */
userRoutes.get('', verifyTokenIsValidMiddleware, verifyIsAdminUserMiddleware, allUserListController  ) 
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Lista usuário usando id
 *     description: Retorna um usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 */
userRoutes.get('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, verifyIsAdminOrSameUserMiddleware, getUserByIdController  )
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualizar usuário
 *     description: Atualiza os dados de um usuário existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do usuário.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateSchema'
 *     responses:
 *       200:
 *         description: Sucesso. Retorna os dados atualizados do usuário.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Usuário não encontrado.
 */
userRoutes.patch('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, verifyIsAdminOrSameUserMiddleware,  checkIfEmailUserExistsMiddleware,  ensureDataIsValidMiddleware(userUpdateSchema),  updadeUserController) 
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     description: Realiza a exclusão de um usuário existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do usuário.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso. Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 */
userRoutes.delete('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, verifyIsAdminOrSameUserMiddleware,   softDeleteUserController ) 

export default userRoutes