import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  userProfile = new FormGroup({

    id: new FormControl(),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    nif: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', [Validators.required]),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    photoUrl: new FormControl('')
  });
  
  user: User | undefined;
  isUpdate: boolean = false;
 
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (!id)
      return;

      this.httpClient.get<User>(`http://localhost:3000/users/filter-by-id/${id}`).subscribe(user => {
      this.isUpdate = true

        this.userProfile.reset({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          nif: user.nif,
          password: user.password,
          street: user.street,
          city: user.city,
          postalCode: user.postalCode,
          photoUrl: user.photoUrl
        });
      });
    });
    

  }

  save(): void {

    const user: User = {
      id: this.userProfile.get('id')?.value ?? 0,
      firstName: this.userProfile.get('firstName')?.value ?? '',
      lastName: this.userProfile.get('lastName')?.value ?? '',
      email: this.userProfile.get('email')?.value ?? '',
      phone: this.userProfile.get('phone')?.value ?? '',
      nif: this.userProfile.get('nif')?.value ?? '',
      password: this.userProfile.get('password')?.value ?? '',
      street: this.userProfile.get('street')?.value ?? '',
      city: this.userProfile.get('city')?.value ?? '',
      postalCode: this.userProfile.get('postalCode')?.value ?? '',
      photoUrl: this.userProfile.get('photoUrl')?.value ?? ''
    }


 

      if(this.isUpdate){
      const urlForUpdate = 'http://localhost:3000/users/' + user.id;
      this.httpClient.put<User>(urlForUpdate, user).subscribe(data => this.router.navigate(['/login']));
    } else {
      const url = 'http://localhost:3000/users/';
        this.httpClient.post<User>(url, user).subscribe(data => this.router.navigate(['/']));
    }  

  }
  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return o1 === o2;
    }
  }



}

