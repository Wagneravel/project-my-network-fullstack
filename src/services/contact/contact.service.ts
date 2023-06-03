import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact, User } from "../../entities";
import { IContactReq, IContactReturn, IMultipleContactsReturn } from "../../interfaces/contact.interface";
import { contactResponseSchema, returnMultipleContactsSchema } from "../../schemas/contact.schema";
import { AppError } from "../../errors";
import { plainToInstance } from "class-transformer";

export const createContactService = async (userId: number, contactData: IContactReq): Promise<IContactReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new AppError("User not found", 404);
    }
  
    const contact: Contact = contactRepository.create({
      user,
      ...contactData,
    });
  
    
    await contactRepository.save(contact);

    const newContact = contactResponseSchema.parse(contact);

    return newContact;
};




export const listContactsService = async (): Promise<IMultipleContactsReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
    const contacts: Contact[] | null = await contactRepository.find();
  
    
    return returnMultipleContactsSchema.parse(contacts)
}





export const getContactByIdService = async (contactId: number): Promise<IContactReturn | null> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Contact | null = await contactRepository.findOne({
    where: {
        id: Number(contactId),
    },
    relations: {
      user: {
        contacts: true
      }
    } 
  });

  if (!contact) {
    return null;
  }

  const ccc = contact.user

  return plainToInstance(User,contact);
};





export const deleteContactService = async (contactId: number) => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Contact | null = await contactRepository.findOne({
    where: {
      id: Number(contactId)
    }});
     

  if (!contact) {
    return false;
  }

  await contactRepository.delete(contactId);

  return true;
};






export const updateContactService = async (
  contactId: number,
  contactData: Partial<IContactReq>
): Promise<IContactReturn | null> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Contact | null = await contactRepository.findOne({
    where: {
      id: contactId
    }});

  if (!contact) {
    return null;
  }

  await contactRepository.update(contactId, contactData);

  const updatedContact: Contact | null = await contactRepository.findOne({
    where: {
      id: contactId
    }});

  const updatedContactData = contactResponseSchema.parse(updatedContact);

  return updatedContactData;
};

