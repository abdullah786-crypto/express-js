import { Column, Entity } from "typeorm";
import { Content } from "./content.entity";

@Entity()
export class Photo extends Content{

    @Column()
    size: string    

}