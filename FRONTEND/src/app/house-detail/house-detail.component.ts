import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { House } from '../interfaces/house.model';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAccordionConfig, NgbAlert, NgbModal, NgbRating, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Rating } from '../interfaces/rating.model';
import { User } from '../interfaces/user.model';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [RouterLink, NgbRatingModule, DatePipe, ReactiveFormsModule, NgbAlert],
  providers: [NgbAccordionConfig],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit {

  house: House | undefined;
  user: User | undefined;
  showConfirmMessage = false;
  
  ratings: Rating[] = [];
  isLoggedIn = false;
  // formulario para crear nuevos comentarios
  ratingForm = new FormGroup({
    score: new FormControl(0),
    comment: new FormControl('')
  });


constructor(private httpClient: HttpClient, private authService: AuthenticationService,
  private activatedRoute: ActivatedRoute
) {
  this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
 }




  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) {
        return; //
      }

      this.httpClient.get<House>('http://localhost:3000/houses/' + id)
      .subscribe(house => {
        this.house = house;
        this.showConfirmMessage = true;});

      this.httpClient.get<Rating[]>('http://localhost:3000/rating/filter-by-house/' + id)
      .subscribe(ratings => {
        this.ratings = ratings;
      });
  });
}
save() {
  const rating: Rating = {
    id: 0, 
    score: this.ratingForm.get('score')?.value ?? 0,
    comment: this.ratingForm.get('comment')?.value ?? '',
    house: this.house
  }
  this.httpClient.post<Rating>('http://localhost:3000/rating', rating)
    .subscribe(rating => {
      
      this.ratingForm.reset();
      this.httpClient.get<Rating[]>('http://localhost:3000/rating/filter-by-house/'+ this.house?.id)
      
      .subscribe(ratings => this.ratings = ratings);
    });

}

}
 
