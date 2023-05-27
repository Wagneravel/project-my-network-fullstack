import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Contact } from "./contacts.entity";
import { Email } from "./email.entity";
import { Phone } from "./phone.entity";
import { getRounds, hashSync } from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 100})
    fullName: string;

    @Column({length:120})
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashInsertPassword(){
        const isEncrypted = getRounds(this.password)
            if(!isEncrypted){
                this.password = hashSync(this.password, 10)
            }
    }

    @Column({ default: false })
    admin: boolean;

    @OneToMany(() => Email, email => email.user, { cascade: true })
    @JoinColumn()
    emails: Email[];
  
    @OneToMany(() => Phone, phone => phone.user, { cascade: true })
    @JoinColumn()
    phones: Phone[];

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    registrationDate: Date;

    @OneToMany(() => Contact, contact => contact.user, { cascade: true })
    @JoinColumn()
    contacts: Contact[];
}

