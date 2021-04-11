import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditcard';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  creditCards:CreditCard[] = [];

  constructor(private userService:UserService,
    private toastrService:ToastrService, private localStorageService:LocalstorageService) { }

  ngOnInit(): void {
    this.getAllCreditcard();
  }

  getAllCreditcard()
  {
    let customerId =this.localStorageService.getIdDecodeToken();
    this.userService.getAllCreditCard(customerId).subscribe(response => {
      this.creditCards = response.data;
    })
  }
  deleteCreditCard(cardId:number)
  {
    console.log(cardId);
    this.userService.deleteCreditCard(cardId).subscribe(response => {
      this.toastrService.success(response.message, "success");
      window.location.reload();
    }, responseError =>{
        this.toastrService.error(responseError.error.message, "error");
    });
   
  }
  
}
