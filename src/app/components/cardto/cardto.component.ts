import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/cardto';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cardto',
  templateUrl: './cardto.component.html',
  styleUrls: ['./cardto.component.css'],
})
export class CardtoComponent implements OnInit {
  carDtos: CarDto;
  carImages: CarImage[] = [];
  path = 'https://localhost:44308/Images/';
  isRented: boolean;
  claim: string;
  isCustomer:boolean;

  constructor(
    private carService: CarService,
    private carImageService: CarimageService,
    private activetedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private localStorageSevice: LocalstorageService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDtos(params['carId']);
        this.getCarImages(params['carId']);
      }
      this.isAdmin();
      this.checkIfCustomer();
    });
  }
  getCarDtos(id: number) {
    this.carService.getCarDtos(id).subscribe((response) => {
      this.carDtos = response.data[0];
    });
  }
  getCarImages(id: number) {
    this.carImageService.getCarImages(id).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  checkIfCustomer()
  {
    var userId = this.localStorageSevice.getIdDecodeToken();
    this.userService.checkIfCustomer(userId).subscribe(response => {
      this.isCustomer = response.success;
      console.log(response.success)
    });
  }

  getImagePath(image: string) {
    let newPath = this.path + image;
    return newPath;
  }

  getRentalPage(isRented: boolean) {
    this.isRented = isRented;
    if (this.isRented == true) {
      this.toastrService.error(
        'This car has already been rented. Please choose another car.'
      );
    }   
  }
  
  isAdmin() {
    this.claim = this.localStorageSevice.getClaimsDecodeToken(); 
  }
}
