import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { getRounds, hashSync } from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 120})
    fullName: string;

    @Column({length:60, unique:true})
    password: string;

    @Column({length:120})
    phone: string;

    @Column({length:120})
    email: string;

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

    @CreateDateColumn({type:"date"})
    createdAt: string;
  
    @UpdateDateColumn({type:"date"})
    updatedAt: string;
  
    @DeleteDateColumn({ nullable: true , type:"date"})
    deletedAt: string;
}

