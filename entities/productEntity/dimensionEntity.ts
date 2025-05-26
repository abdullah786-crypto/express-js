import { Column, Entity } from "typeorm";

@Entity()
export class DimensionEntity {

    @Column()
    height: number

    @Column()
    width: number

    @Column()
    inches: number
}