export interface User {

  id: number;

  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  nif?: string;
  password: string;


  street?: string;
  city?: string;
  postalCode?: string;
  photoUrl: string;

  role?: Role;
}
export enum Role {
  USER = 'user',
  ADMIN =  'admin'
}
