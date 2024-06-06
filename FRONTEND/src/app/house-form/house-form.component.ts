import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { House } from '../interfaces/house.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-house-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule, NgbAlert],
  templateUrl: './house-form.component.html',
  styleUrl: './house-form.component.css'
})
export class HouseFormComponent implements OnInit {


  houseForm = new FormGroup({

    id: new FormControl(),
    title: new FormControl('', Validators.required),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    places: new FormControl('', [Validators.min(2), Validators.max(20)]),
    bedrooms: new FormControl(0, [Validators.min(1), Validators.max(10)]),
    bathrooms: new FormControl(0, [Validators.min(1), Validators.max(10)]),
    price: new FormControl(0, [Validators.min(0), Validators.max(300)]),
    meters: new FormControl(0, [Validators.min(50), Validators.max(1000)]),
    destination: new FormControl('', Validators.required),
    petFriendly: new FormControl(),
    pool: new FormControl(),
    garden: new FormControl(),
    terrace: new FormControl(),
    wifi: new FormControl(),
    air: new FormControl(),
    people: new FormControl(0),
    description: new FormControl('', Validators.required),
    photoUrl: new FormControl('')
  });

  houses: House | undefined;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  photoFile: File | undefined;
  photoPreview: string | undefined;
  showConfirmMessage = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (!id)
        return;

      this.httpClient.get<House>(`http://localhost:3000/houses/${id}`).subscribe(houses => {
        this.isUpdate = true

        this.houseForm.reset({
          id: houses.id,
          title: houses.title,
          address: houses.address,
          phone: houses.phone,
          email: houses.email,
          places: houses.places,
          bedrooms: houses.bedrooms,
          bathrooms: houses.bathrooms,
          price: houses.price,
          meters: houses.meters,
          destination: houses.destination,
          petFriendly: houses.petFriendly,
          pool: houses.pool,
          garden: houses.garden,
          terrace: houses.terrace,
          wifi: houses.wifi,
          air: houses.air,
          people: houses.people,
          description: houses.description,
          photoUrl: houses.photoUrl
        });
      });

    });

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id)
        this.httpClient.get<House>(`http://localhost:3000/houses/${id}`).subscribe(houses => {
          this.isDelete = true
        });
    })

  }

  onFileChange(event: Event) {

    let target = event.target as HTMLInputElement;

    if (target.files !== null && target.files.length > 0) {
      this.photoFile = target.files[0];

      let reader = new FileReader();
      reader.onload = event => this.photoPreview = reader.result as string;
      reader.readAsDataURL(this.photoFile);
    }



  }

  save(): void {



    let formData = new FormData();



    formData.append('id', this.houseForm.get('id')?.value ?? 0);
    formData.append('title', this.houseForm.get('title')?.value ?? '');
    formData.append('address', this.houseForm.get('address')?.value ?? '');
    formData.append('phone', this.houseForm.get('phone')?.value ?? '');
    formData.append('email', this.houseForm.get('email')?.value ?? '');
    formData.append('places', this.houseForm.get('places')?.value ?? '');
    formData.append('bedrooms', this.houseForm.get('bedrooms')?.value + '');
    formData.append('bathrooms', this.houseForm.get('bathrooms')?.value + '');
    formData.append('price', this.houseForm.get('price')?.value + '');
    formData.append('meters', this.houseForm.get('meters')?.value + '');
    formData.append('destination', this.houseForm.get('destination')?.value ?? '');
    formData.append('petFriendly', this.houseForm.get('petFriendly')?.value);
    formData.append('pool', this.houseForm.get('pool')?.value);
    formData.append('garden', this.houseForm.get('garden')?.value );
    formData.append('terrace', this.houseForm.get('terrace')?.value);
    formData.append('wifi', this.houseForm.get('wifi')?.value);
    formData.append('air', this.houseForm.get('air')?.value);
    formData.append('description', this.houseForm.get('description')?.value ?? '');
    formData.append('photoUrl', this.houseForm.get('photoUrl')?.value ?? '');

    if (this.photoFile) formData.append('file', this.photoFile);

    if (this.isUpdate) {
      const id = this.houseForm.get('id')?.value;
      this.httpClient.put<House>(`http://localhost:3000/houses/${id}`, formData)
        .subscribe(house => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.houses = house;
          this.showConfirmMessage = true;
        },);

    } else {
      this.httpClient.post<House>('http://localhost:3000/houses', formData)
        .subscribe(house => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.houses = house;
          this.showConfirmMessage = true;
        });
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
