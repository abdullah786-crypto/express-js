import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.simpleEntity";

export class Employee {

    @PrimaryGeneratedColumn()
    id: any

    @Column(() => User)
    properties: User

}