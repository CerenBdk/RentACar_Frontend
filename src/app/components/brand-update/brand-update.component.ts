import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup;
  brands:Brand[] = [];

  constructor(private formBuilder:FormBuilder, private brandService: BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.getAllBrands();
  }

  getAllBrands()
  {
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
    });
  }

  createBrandUpdateForm()
  {
    this.brandUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required]
    });
  }
  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      });
    }
    else{
        this.toastrService.error("Please fill in all fields on the form","Error");
    }
  }
}
