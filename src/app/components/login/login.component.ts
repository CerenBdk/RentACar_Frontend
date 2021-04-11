import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService, private localstorageService:LocalstorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  login()
  {
    if(this.loginForm.valid)
    {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.success("Login successful", "info");
        this.localstorageService.setLocalStorage("token", response.data.token);
        
       window.location.reload();
      },responseError => {
        this.toastrService.error(responseError, "error");
      });
    }
  }
}
