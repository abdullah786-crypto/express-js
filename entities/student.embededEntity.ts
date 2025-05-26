import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { User } from "./user.simpleEntity";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: any | string | Number | undefined
    
    @Column(() => User)
    properties: User
}