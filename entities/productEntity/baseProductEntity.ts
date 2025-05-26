import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DimensionEntity } from "./dimensionEntity";

@Entity()
export class BaseProductEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    quantity: number

    @Column()
    price: number

    @Column(() => DimensionEntity)
    dimension:  DimensionEntity

}