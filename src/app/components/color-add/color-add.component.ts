import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private colorService: ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm()
  {
    this.colorAddForm = this.formBuilder.group({
      name:["",Validators.required]
    });
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success");
      });
    }
    else{
        this.toastrService.error("Please fill in all fields on the form","Error");
    }
  }
}
