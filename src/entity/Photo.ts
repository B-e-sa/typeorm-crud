import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm"
import { User } from "./User"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description: string | undefined

    @Column()
    filename!: string

    @Column()
    views!: number

    @Column()
    isPublished!: boolean

    @OneToMany(() => Photo, (user) => user.photos)
    @JoinTable()
    photos!: Photo[]

}