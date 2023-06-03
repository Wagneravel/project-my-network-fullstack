import express from 'express';
import {
  createContactController,
  getContactByIdController,
  allContactsListController,
  deleteContactController,
  updateContactController
} from '../controllers/contact.controller';

import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { verifyIfIdContactExistsMiddleware } from "../middlewares/verifyIdContactExists.middleware";
import verifyIsAdminOrSameUserMiddleware from "../middlewares/verifyIsAdminOrSameUser.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import verifyIsAdminUserMiddleware from "../middlewares/verifyIsAdminUser.middleware";
import verifyIsAdminOrSameUserByContactMiddleware from "../middlewares/verifyIsAdminOrSameUserByContact.middleware";
import { contactReqSchema, contactUpdateSchema } from "../schemas/contact.schema";



const contactRouter = express.Router();

contactRouter.post('', verifyTokenIsValidMiddleware, ensureDataIsValidMiddleware(contactReqSchema), createContactController);
contactRouter.get('/:id', verifyTokenIsValidMiddleware, verifyIfIdContactExistsMiddleware, verifyIsAdminOrSameUserByContactMiddleware, getContactByIdController  ) 
contactRouter.get('', verifyTokenIsValidMiddleware, verifyIsAdminUserMiddleware, allContactsListController  ) 
contactRouter.delete('/:id', verifyTokenIsValidMiddleware, verifyIfIdContactExistsMiddleware, verifyIsAdminOrSameUserByContactMiddleware, deleteContactController  ) 
contactRouter.patch('/:id', verifyTokenIsValidMiddleware, verifyIfIdContactExistsMiddleware, verifyIsAdminOrSameUserByContactMiddleware, ensureDataIsValidMiddleware(contactUpdateSchema),  updateContactController)

export default contactRouter;





















// // Obter informações de um contato específico de um usuário
// router.get('/users/:userId/contacts/:contactId', getContactController);

// // Atualizar um contato existente de um usuário
// router.put('/users/:userId/contacts/:contactId', updateContactController);

// // Excluir um contato existente de um usuário
// router.delete('/users/:userId/contacts/:contactId', deleteContactController);