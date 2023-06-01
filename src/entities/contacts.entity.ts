import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 100})
    fullName: string;

    @Column({length:20})
    phone: string;

    @Column({length:100})
    email: string;

    @CreateDateColumn({type:"date"})
    createdAt: string;
  
    @UpdateDateColumn({type:"date"})
    updatedAt: string;
  
    @DeleteDateColumn({ nullable: true , type:"date"})
    deletedAt: string;

    @ManyToOne(() => User, (user)=> user.contacts )
    user: User;
}
