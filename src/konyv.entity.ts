import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class Konyv{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    szerzo: string;

    @Column()
    cim: string;

    @Column('int')
    hossz: number;
}