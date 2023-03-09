import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./user-entity";

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    place: string;


    @ManyToMany(type => User, user => user.places)
    users: User[];
}
