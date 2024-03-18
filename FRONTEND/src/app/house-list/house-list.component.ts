import { Component, OnInit } from '@angular/core';
import { House } from '../interfaces/house.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbRatingModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css',
  providers: [NgbRatingConfig]
})
export class HouseListComponent implements OnInit{

  houses: House [] = [];

  constructor(private httpClient: HttpClient, config: NgbRatingConfig) {
    config.readonly = true;
    config.max = 5;
  }

  ngOnInit(): void {
    this.httpClient.get<House[]>('http://localhost:3000/houses')
    .subscribe(houses => this.houses = houses);
  }

  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere eliminar esta casa?");
    if (!remove) return;
    this.httpClient.delete<House>(`http://localhost:3000/houses/${id}`)
      .subscribe(() => {

        console.log('La casa ha sido eliminada');

       this.houses = this.houses.filter(house => house.id !== id);
      });
  }


}

