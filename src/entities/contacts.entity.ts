import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 100})
    fullName: string;

    @Column({length:120})
    phone: string;

    @Column({length:120})
    email: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    registrationDate: Date;

    @ManyToOne(() => User )
    user: User;
}
// yarn typeorm migration:create -n createContatos -p src/migrations
