import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./users.entity";
import { Contact } from "./contacts.entity";

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => User, user => user.emails)
  user: User;

  @ManyToOne(() => Contact, contact => contact.emails)
  contact: Contact;
}
