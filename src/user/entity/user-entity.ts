import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photo-entity";
import { Place } from "./place-entity";

@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column()
email: string;

@Column()
password: string;

@JoinTable()
@ManyToMany(
    type => Place, 
    (place) => place.users, 
    {
        cascade: true, //insert
    }
    )
places: Place[];

@OneToMany(()=> Photo, (photo) => photo.user)
photos: Photo[]
}