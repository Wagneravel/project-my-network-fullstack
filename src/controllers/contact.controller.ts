// import { Request, Response } from "express";
// import {
//   createContactService,
//   getContactByIdService,
//   updateContactService,
//   deleteContactService,
// } from "../services/contact/contact.service"
// import { IContactReq } from "../interfaces/contact.interface";

// export const createContactController = async (req: Request, res: Response) => {

//   const { userId } = req.params;
//   const contactData: IContactReq = req.body;

//   const newContact = await createContactService(Number(userId), contactData);

//   return res.status(201).json(newContact);
  
// };

// export const getContactByIdController = async (req: Request, res: Response) => {

//   const { contactId } = req.params;

//   const contact = await getContactByIdService(Number(contactId));

//   if (!contact) {
//     return res.status(404).json({ error: "Contact not found" });
//   }

//   return res.status(200).json(contact);
// };

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