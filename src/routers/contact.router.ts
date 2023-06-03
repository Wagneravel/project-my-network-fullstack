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

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const contactRouter = express.Router();
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Criação de contato
 *     description: Cria um novo contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactReqSchema'
 *     responses:
 *       200:
 *         description: Contato criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
contactRouter.post('', verifyTokenIsValidMiddleware, ensureDataIsValidMiddleware(contactReqSchema), createContactController);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Obter contato por ID
 *     description: Obtém os detalhes de um contato específico com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do contato a ser obtido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contato encontrado
 *       404:
 *         description: Contato não encontrado
 */
contactRouter.get('/:id', verifyTokenIsValidMiddleware, verifyIfIdContactExistsMiddleware, verifyIsAdminOrSameUserByContactMiddleware, getContactByIdController);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Lista de contatos
 *     description: Retorna a lista de todos os contatos
 *     responses:
 *       200:
 *         description: Sucesso
 */
contactRouter.get('', verifyTokenIsValidMiddleware, verifyIsAdminUserMiddleware, allContactsListController);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Excluir contato
 *     description: Exclui um contato com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do contato a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contato excluído com sucesso
 *       404:
 *         description: Contato não encontrado
 */
contactRouter.delete('/:id', verifyTokenIsValidMiddleware, verifyIfIdContactExistsMiddleware, verifyIsAdminOrSameUserByContactMiddleware, deleteContactController);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Atualizar contato
 *     description: Atualiza um contato com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do contato a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactUpdateSchema'
 *     responses:
 *       200:
 *         description: Contato atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Contato não encontrado
 */
contactRouter.patch('/:id', verifyTokenIsValidMiddleware, verifyIfIdContactExistsMiddleware, verifyIsAdminOrSameUserByContactMiddleware, ensureDataIsValidMiddleware(contactUpdateSchema), updateContactController);

export default contactRouter;





















// // Obter informações de um contato específico de um usuário
// router.get('/users/:userId/contacts/:contactId', getContactController);

// // Atualizar um contato existente de um usuário
// router.put('/users/:userId/contacts/:contactId', updateContactController);

// // Excluir um contato existente de um usuário
// router.delete('/users/:userId/contacts/:contactId', deleteContactController);