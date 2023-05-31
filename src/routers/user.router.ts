import { Router } from "express";
import { allUserListController, createUserController, softDeleteUserController, updadeUserController, getUserByIdController } from "../controllers/user.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { checkIfEmailUserExistsMiddleware } from "../middlewares/verifyEmailUser.middleware";
import { verifyIfIdUserExistsMiddleware } from "../middlewares/verifyIdUserExists.middleware";
import verifyIsAdminOrSameUserMiddleware from "../middlewares/verifyIsAdminOrSameUser.middleware";
import verifyIsAdminUserMiddleware from "../middlewares/verifyIsAdminUser.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import { userReqSchema, userUpdateSchema } from "../schemas/users.schema";

const userRoutes:Router = Router() 

userRoutes.post('', checkIfEmailUserExistsMiddleware, ensureDataIsValidMiddleware(userReqSchema),  createUserController) //users	Criação de usuário
userRoutes.get('', verifyTokenIsValidMiddleware, verifyIsAdminUserMiddleware, allUserListController  ) //users	Lista todos os usuários
userRoutes.get('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, verifyIsAdminOrSameUserMiddleware, getUserByIdController  ) //users	Lista todos os usuários
userRoutes.patch('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, verifyIsAdminOrSameUserMiddleware,  checkIfEmailUserExistsMiddleware,  ensureDataIsValidMiddleware(userUpdateSchema),  updadeUserController) //users/:id	Atualiza um usuário
userRoutes.delete('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, verifyIsAdminOrSameUserMiddleware,   softDeleteUserController ) //users/:id	Realiza um soft delete no usuário

export default userRoutes