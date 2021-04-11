import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastInjector, ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  brands:Brand[] = [];
  colors:Color[] = [];
  carAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getAllBrands();
    this.getAllColors();
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

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandID: ['', Validators.required],
      colorID: ['', Validators.required],
      name: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.isRented = false;
      this.carService.addCar(carModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      }, responseError => {
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error");          
          }
        }
      });
    }
    else{
        this.toastrService.error("Please fill in all fields on the form","Error");
    }
  }
}
