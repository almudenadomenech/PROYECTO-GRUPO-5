import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.model";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

   

    @Column({nullable: true})
    firstName?: string;

    @Column({nullable: true})
    lastName?: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    phone?: string;

    @Column({nullable: true})
    nif?: string;

    @Column()
    password: string;

    @Column({nullable: true})
    street?: string;

    @Column({nullable: true})
    city?: string;

    @Column({nullable: true})
    postalCode?: string;

    @Column({nullable: true}) 
    photoUrl: string;

    @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
    })
    role: Role;
        
}
