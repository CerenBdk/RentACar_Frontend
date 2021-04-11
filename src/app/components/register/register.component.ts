import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  register()
  {
    if(this.registerForm.valid)
    {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.success(response.message, "success");
        localStorage.setItem("token", response.data.token);
        window.location.reload();
      },responseError => {
        this.toastrService.error(responseError, "error");
      });
    }
  }

}
