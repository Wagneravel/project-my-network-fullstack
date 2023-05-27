import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./users.entity";
import { Contact } from "./contacts.entity";

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @ManyToOne(() => User, user => user.phones)
  user: User;

  @ManyToOne(() => Contact, contact => contact.phones)
  contact: Contact;
}