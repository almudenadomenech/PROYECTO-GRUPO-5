import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../interfaces/register.model';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.fb.group({
    
   
    email: ['', [Validators.required, Validators.email]],
    
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]]
  },
  {validators: this.passwordConfirmValidator}
  );
  error = '';

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
  private router : Router) {}

    passwordConfirmValidator(control: AbstractControl){
      if(control.get('password')?.value === control.get('passwordConfirm')?.value){
        return null;
      } else {
        return {
          'confirmError': true
        }


      }
   
    }

  save(){

    let register: Register = {
     
      email: this.registerForm.get('email')?.value ?? '',
     // phone: this.registerForm.get('phone')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? ''
    };
    let url= 'http://localhost:3000/users/register';
    this.httpClient.post<User>(url, register)
    .subscribe({
      next: user => {
       
      this.router.navigate([`/user/${user.id}/profile`]);
      },
      error: error => {
        if (error.status === 409){
          this.error = 'Este email ya existe';
        }
       
        
      }
    });
    
  }
}

