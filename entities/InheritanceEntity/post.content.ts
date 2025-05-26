import { Column, Entity } from "typeorm";
import { Content } from "./content.entity";

@Entity()
export class Post extends Content{

    @Column()
    viewCount: any

}