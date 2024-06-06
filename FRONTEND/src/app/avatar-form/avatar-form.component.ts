import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar-form',
  standalone: true,
  imports: [NgbAlert, RouterLink],
  templateUrl: './avatar-form.component.html',
  styleUrl: './avatar-form.component.css'
})
export class AvatarFormComponent implements OnInit {

  photoFile: File | undefined;
  photoPreview: string | undefined;
  user: User | undefined;
  showConfirmMessage = false;
  
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:3000/users/account')
    .subscribe(user => this.user = user); // traes el usuario
  }

  onFileChange(event: Event) {

    let target = event.target as HTMLInputElement;

    if (target.files !== null && target.files.length > 0) {
      this.photoFile = target.files[0]; // extraer el primer archivo

      // Opcional: Mostrar la imagen por pantalla para previsualizarla antes de subirla
      let reader = new FileReader();
      reader.onload = event => this.photoPreview = reader.result as string;
      reader.readAsDataURL(this.photoFile);
    }

  }
  // creamos el formulario para subir la foto al servidor
  save() {
    let formData = new FormData();
    if(this.photoFile) {
      formData.append('file', this.photoFile);
    } 
    // enviamos la foto
    this.httpClient.post<User>('http://localhost:3000/users/avatar', formData)
    .subscribe(user => {
      this.photoFile = undefined;
      this.photoPreview = undefined;
      this.user = user;
      this.showConfirmMessage = true
    })
  }

}
