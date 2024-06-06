import { House } from "src/houses/houses.model";
import { User } from "src/users/users.model";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({type: 'date'})
    entryDate: Date;

    @Column({type: 'date'})
    departureDate: Date;

    @Column({nullable: false})
    destination: string;

    @Column({type: 'decimal', precision: 14, scale: 2})
    price: number;

    @Column({nullable: false})
    people?: number;

    /* @Column({nullable: false})
    destination?: string; */

  /*   @Column({nullable: false})
    available: boolean; */

    @ManyToOne(() => User, {eager: true})
    user: User;

    @ManyToOne(() => House, {eager: true})
    house: House;

    

   /*  @Column({nullable: false})
    totalPrice: number; */



}
