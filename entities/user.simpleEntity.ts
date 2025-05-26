import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: any | string | Number | undefined

    @Column()
    name: string;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    address: string

    @Column()
    city: string

    @Column()
    phone: Number

} 