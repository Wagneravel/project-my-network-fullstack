import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./users.entity";
import { Email } from "./email.entity";
import { Phone } from "./phone.entity";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 100})
    fullName: string;

    @OneToMany(() => Email, email => email.contact, { cascade: true })
    @JoinColumn()
    emails: Email[];
  
    @OneToMany(() => Phone, phone => phone.contact, { cascade: true })
    @JoinColumn()
    phones: Phone[];

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    registrationDate: Date;

    @ManyToOne(() => User, user => user.contacts)
    user: User;
}
