import { House } from "src/houses/houses.model";
import { User } from "src/users/users.model";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;

    @Column({length: 2000, nullable: true})
    comment: string;

    @CreateDateColumn() // genera la fecha automáticamente de la publicacion del comentario
    createdDate: Date; 

    @ManyToOne(() => User, {eager: true}) // para que te traiga el usuario
    user: User;

    @ManyToOne(() => House, {eager: true}) // para que te traiga la casa
    house: House;
}
