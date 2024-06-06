import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Booking } from '../interfaces/booking.model';
import { NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { House } from '../interfaces/house.model';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { HouseDetailComponent } from '../house-detail/house-detail.component';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgbAlert, CurrencyPipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})

export class BookingFormComponent implements OnInit {

  house: House | undefined;
  totalPrice = 0;
  numDays = 0;
  people: number = 0;
  showConfirmMessage = false;
  booking: Booking | undefined;
  breakfast: number = 0;
  totalBreakfastPrice: number = 0;
  destination: HouseDetailComponent | undefined
 

  bookingForm = new FormGroup({
  
    entryDate: new FormControl(new Date()),
    departureDate: new FormControl(new Date()),
    cleaningService: new FormControl<boolean>(false),
    breakfast: new FormControl<boolean>(false),
    people: new FormControl(0),
    destination: new FormControl()
    
   
  });

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) return;

      this.httpClient.get<House>(`http://localhost:3000/houses/${id}`)
      .subscribe(house => {
        this.house = house;
      this.bookingForm.get('destination')?.setValue(house.destination);
    });
  });
  }

  calculatePrice(){

    let entryDate = this.bookingForm.get('entryDate')?.value;
    let departureDate = this.bookingForm.get('departureDate')?.value;

    if(!entryDate || !departureDate || !this.house || !this.house.price){
      return;
    }

    entryDate = new Date(entryDate);
    departureDate = new Date(departureDate); 

    const diffMilliseconds = departureDate.getTime() - entryDate.getTime(); 

    if (diffMilliseconds <= 0) {
      return;
    }
    
    this.numDays = diffMilliseconds / (1000 * 60 * 60 * 24);
    this.totalPrice = this.numDays * this.house.price;

    
    const cleaningService = this.bookingForm.get('cleaningService')?.value;
    const numDays = this.bookingForm.get('numDays')?.value;
    if(cleaningService){
    this.totalPrice += 30;
    }
    const breakfast = this.bookingForm.get('breakfast')?.value;
    const people = this.bookingForm.get('people')?.value;

    if(breakfast && people){
      this.totalBreakfastPrice = people * this.numDays * 10;
      this.totalPrice += this.totalBreakfastPrice;
    }
    
    
  }

  save(): void {

    const booking: Booking = {
      id: this.bookingForm.get('id')?.value ?? 0,
      entryDate: this.bookingForm.get('entryDate')?.value ?? new Date(),
      departureDate: this.bookingForm.get('departureDate')?.value ?? new Date(),
      people: this.bookingForm.get('people')?.value ?? 0,
      destination: this.bookingForm.get('destination')?.value ?? '',
     
      price: this.totalPrice,
      house: this.house,
              
    };

    // enviar al backend con método POST
    this.httpClient.post<Booking>('http://localhost:3000/booking', booking)
    .subscribe(booking => {
     /*  console.log(booking); */
      this.showConfirmMessage = true;
      this.booking = booking;
  });
}
}
