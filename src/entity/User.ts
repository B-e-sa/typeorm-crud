import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar", {
        length: 20
    })
    name!: string

    @Column("varchar", {
        length: 20
    })
    nickname: string | undefined

    @Column("varchar")
    birthday!: string

    @Column("varchar")
    createdAt!: string

}