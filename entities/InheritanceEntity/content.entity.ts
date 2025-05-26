import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Content {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title: string

    @Column()
    description: string

}