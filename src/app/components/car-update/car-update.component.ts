import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastInjector, ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/cardto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  brands:Brand[] = [];
  colors:Color[] = [];
  carId:number;
  car:CarDto;
  carUpdateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService:ToastrService,
    private activetedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
    this.createCarUpdateForm();
    if(params['carId'])
    {
      this.carId = params['carId'];
      this.getCarDtoById(params['carId']);
    }
    this.getAllBrands();
    this.getAllColors();
    
  });
  }

  getAllBrands()
  {
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
    });
  }

  getAllColors()
  {
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandID: [''],
      colorID: [''],
      name: [''],
      modelYear: [''],
      dailyPrice: [''],
      description: [''],
      findeks:['']
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.id =this.carId;
      this.carService.updateCar(carModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      });
    }
    else{
        this.toastrService.error("Please fill in all fields on the form","Error");
    }
  }

  getCarDtoById(id:number)
  {
    this.carService.getCarDtos(id).subscribe(response =>{
      this.car = response.data[0];
    });
  }
}
