import { Column, Entity } from "typeorm";

@Entity()
export class Question {

    @Column()
    answerCount: string
}