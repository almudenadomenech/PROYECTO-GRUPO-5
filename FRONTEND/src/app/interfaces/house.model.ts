import { User } from "./user.model";

export interface House {

  id: number;

  title: string;
  address: string;
  phone: string;
  email: string;
  places: string;
  bedrooms: number;
  bathrooms: number;
  price: number;

  meters: number;
  destination: string;

  petFriendly: boolean;
  pool: boolean;
  garden: boolean;
  terrace: boolean;
  wifi: boolean;
  air: boolean;
  people: number;

  description: string;
  photoUrl: string;

  users?: User;
 

}