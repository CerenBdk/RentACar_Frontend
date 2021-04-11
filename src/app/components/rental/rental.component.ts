import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/cardto';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {

  rentalAddForm: FormGroup;
  rentals: Rental[] = [];
  rentalDtos: RentalDto[] = [];
  rental: Rental;
  isRented: boolean = false;
  findeks:boolean;

  @Input() carforrental: CarDto;
  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private localStorageSevice: LocalstorageService,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.getRentalDtos();
    this.createRentalAddForm();
    this.checkFindeks();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }

  getRentalDtos() {
    this.rentalService.getRentalDtos().subscribe((response) => {
      this.rentalDtos = response.data;
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [''],
    });
  }

  checkFindeks()
  {
    let carId:number = this.carforrental.carID;
    let customerId:number = this.localStorageSevice.getIdDecodeToken();
    this.rentalService.checkFindeks(carId, customerId).subscribe(response =>{
      this.toastrService.success(response.message, "success");
      this.findeks = true;
    },responseError => {
      this.toastrService.error(responseError.error.message, "error");
      this.findeks =  false;
    });
    return this.findeks;
  }

  createRent() {
    if(this.rentalAddForm.valid){
    let customerId = Number(this.localStorageService.getLocalStorage('id'));
    let rent: Rental = {
      carID: this.carforrental.carID,
      customerID: customerId,
      rentDate: this.rentalAddForm.controls['rentDate'].value,
      returnDate: this.rentalAddForm.controls['returnDate'].value,
      price: this.carforrental.dailyPrice,
    };
    this.rental = rent;
    this.isRented = true;
    this.toastrService.success(
      'Your rental request has been received. You are redirected to the payment page.'
    );
    }
    else{
      this.toastrService.error(
        'Please select the date to rent a car', 'Error'
      );
    }
  }
}
