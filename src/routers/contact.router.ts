import express from 'express';
import {
  createContactController,
  getContactByIdController
} from '../controllers/contact.controller';

import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { verifyIfIdUserExistsMiddleware } from "../middlewares/verifyIdUserExists.middleware";
import verifyIsAdminOrSameUserMiddleware from "../middlewares/verifyIsAdminOrSameUser.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import { contactReqSchema } from "../schemas/contact.schema";

const contactRouter = express.Router();

contactRouter.post('', verifyTokenIsValidMiddleware, ensureDataIsValidMiddleware(contactReqSchema), createContactController);
contactRouter.get('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, getContactByIdController  ) 
contactRouter.get('/:id', verifyTokenIsValidMiddleware, verifyIfIdUserExistsMiddleware, getContactByIdController  ) 


export default contactRouter;




















// // Obter informações de um contato específico de um usuário
// router.get('/users/:userId/contacts/:contactId', getContactController);

// // Atualizar um contato existente de um usuário
// router.put('/users/:userId/contacts/:contactId', updateContactController);

// // Excluir um contato existente de um usuário
// router.delete('/users/:userId/contacts/:contactId', deleteContactController);