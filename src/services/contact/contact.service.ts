// import { Repository } from "typeorm";
// import { AppDataSource } from "../../data-source";
// import { Contact } from "../../entities";
// import { IContactReq, IContactReturn } from "../../interfaces/contact.interface";
// import { contactResponseSchema } from "../../schemas/contact.schema";

// export const createContactService = async (userId: number, contactData: IContactReq): Promise<IContactReturn> => {
//   const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

//   const contact: Contact = contactRepository.create({
//     userId,
//     ...contactData,
//   });

//   await contactRepository.save(contact);

//   const newContact = contactResponseSchema.parse(contact);

//   return newContact;
// };

// export const getContactByIdService = async (contactId: number): Promise<IContactReturn | null> => {
//   const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

//   const contact: Contact | null = await contactRepository.findOne(contactId);

//   if (!contact) {
//     return null;
//   }

//   const contactData = contactResponseSchema.parse(contact);

//   return contactData;
// };

// export const updateContactService = async (
//   contactId: number,
//   contactData: Partial<IContactReq>
// ): Promise<IContactReturn | null> => {
//   const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

//   const contact: Contact | null = await contactRepository.findOne(contactId);

//   if (!contact) {
//     return null;
//   }

//   await contactRepository.update(contactId, contactData);

//   const updatedContact: Contact | null = await contactRepository.findOne(contactId);

//   const updatedContactData = contactResponseSchema.parse(updatedContact);

//   return updatedContactData;
// };

// export const deleteContactService = async (contactId: number): Promise<boolean> => {
//   const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

//   const contact: Contact | null = await contactRepository.findOne(contactId);

//   if (!contact) {
//     return false;
//   }

//   await contactRepository.delete(contactId);

//   return true;
// };
