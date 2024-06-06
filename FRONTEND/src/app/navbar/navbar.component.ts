import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
collapsed=  true;
isLoggedIn = false;

userEmail: string | undefined;
isAdmin = false;
isUser = false;

constructor(private authService: AuthenticationService,
  private router: Router
){
  this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
 
  this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
  this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  this.authService.isUser.subscribe(isUser => this.isUser = isUser);

}

logout(){
  this.authService.logout();
  this.router.navigate(['/home']);
}
}