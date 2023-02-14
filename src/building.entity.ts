import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class Building{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tulajdonos: string;

    @Column('int')
    alapterulet: number;

    @Column('int')
    epiteseve: number;
}