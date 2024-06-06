import { User } from "./user.model";

export interface Payment {

    id: number;
    creditCard: boolean;
    biZum: boolean;
    payPal: boolean;
    users: User;
}