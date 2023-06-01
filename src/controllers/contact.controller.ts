import { Request, Response } from "express";
import {
  createContactService,
  getContactByIdService,
  listContactsService
//   updateContactService,
//   deleteContactService,
} from "../services/contact/contact.service"
import { IContactReq } from "../interfaces/contact.interface";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

export const createContactController = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      throw new AppError('Missing bearer token', 401);
    }
  
    const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY!);
    
    const userId = decodedToken.id;
    
    const contactData: IContactReq = req.body;
    const newContact = await createContactService(userId, contactData);

    return res.status(201).json(newContact);
    
};

export async function allContactsListController(request:Request, response: Response): Promise<Response>{

    const allList = await listContactsService()

    return response.status(200).json(allList)
    
}


export const getContactByIdController = async (req: Request, res: Response) => {

  const contactId = req.params.id;

  const contact = await getContactByIdService(Number(contactId));

  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  return res.status(200).json(contact);
};

// export const updateContactController = async (req: Request, res: Response) => {

//   const { contactId } = req.params;
//   const contactData: Partial<IContactReq> = req.body;

//   const updatedContact = await updateContactService(Number(contactId), contactData);

//   if (!updatedContact) {
//     return res.status(404).json({ error: "Contact not found" });
//   }

//   return res.status(200).json(updatedContact);
  
// };

// export const deleteContactController = async (req: Request, res: Response) => {

//   const { contactId } = req.params;

//   const deleted = await deleteContactService(Number(contactId));

//   if (!deleted) {
//     return res.status(404).json({ error: "Contact not found" });
//   }

//   return res.status(200).json({ message: "Contact deleted successfully" });
 
// };