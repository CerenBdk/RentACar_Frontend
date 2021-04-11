import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/cardto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDtos: CarDto[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  filterText = '';
  filterBrandText="";
  filterColorText="";
  brandId: number;
  colorId: number;
  path = 'https://localhost:44308/Images/';

  constructor(
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      
      // if (params['brandId']) {
      //   this.getCarsByBrandId(params['brandId']);
      // } else if (params['colorId']) {
      //    this.getCarsByColorId(params['colorId']);
      // } 
      if (params['brandId'] && params['colorId']) {
        this.getFilteredCars(params['brandId'], params['colorId']);
      }
      else {
        this.getAllCarDtos();
        this.getColors();
        this.getBrands();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarDtos(id: number) {
    this.carService.getCarDtos(id).subscribe((response) => {
      this.carDtos = response.data;
    });
  }

  getAllCarDtos() {
    this.carService.getAllCarDtos().subscribe((response) => {
      this.carDtos = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getFilteredCars(brandId: number, colorId: number) {
    if(brandId == null)
    {
      this.carService.getCarsByColorId(colorId).subscribe(response => {
        this.carDtos = response.data;
      })
    }
    else if(colorId == null)
    {
      this.carService.getCarsByBrandId(brandId).subscribe(response => {
        this.carDtos = response.data;
      })
    }
    else{
    this.carService.getFilteredCars(brandId, colorId).subscribe((response) => {
      this.carDtos = response.data;
      if(this.carDtos.length == 0)
      {
        this.toastrService.error("No cars matching your search were found.");
      }
    });
  }
  }
  getSelectedColorId(colorId: number) {
    if(this.colorId == colorId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getSelectedBrandId(brandId: number) {
    if(this.brandId == brandId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
