import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { DecodedToken } from './token.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  userEmail = new BehaviorSubject<string>(this.getCurrentEmail());
 
  isAdmin = new BehaviorSubject<boolean>(this.getIsAdmin());
  isUser = new BehaviorSubject<boolean>(this.getIsUser());

  constructor() { }

  hasToken(): boolean {
    return localStorage.getItem("jwt_token") !== null;
  }


  handleLogin(token: string){

    localStorage.setItem("jwt_token", token);
    this.isLoggedIn.next(true);
   
    this.userEmail.next(this.getCurrentEmail());
    this.isAdmin.next(this.getIsAdmin());
    this.isUser.next(this.getIsUser());
    
        
  }

  getCurrentEmail(){

    const token = localStorage.getItem("jwt_token");
    if(!token) return '';

    const decodedToken = jwtDecode(token) as DecodedToken;
    
   return decodedToken.email;
    

  }

  getIsAdmin() {
    const token = localStorage.getItem("jwt_token");
    if(!token) return false;

    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.role === 'admin'; 
  }

   getIsUser() {
    const token = localStorage.getItem("jwt_token");
    if(!token) return false;

    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.role === 'user'; 
  } 

  logout(){
    localStorage.removeItem("jwt_token");
    this.isLoggedIn.next(false);
    
    this.userEmail.next('');
    this.isAdmin.next(false);
    //this.isUser.next(false);
  }
}
