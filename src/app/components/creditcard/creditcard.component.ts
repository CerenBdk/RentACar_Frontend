import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {
  addCreditCardForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private toastrService:ToastrService, private localStorageService:LocalstorageService) { }

  ngOnInit(): void {
    this.createUserUpdateForm();
  }

  createUserUpdateForm()
  {
    this.addCreditCardForm = this.formBuilder.group({
      customerID:[""],
      ownerName:["", Validators.required],
      creditCardNumber:["", Validators.required],
      expirationDate:["", Validators.required],
      securityCode:["", Validators.required]
    });
  }

  addCreditCard()
  {
    let creditCardModel =  Object.assign({}, this.addCreditCardForm.value);
    creditCardModel.customerID = Number(this.localStorageService.getIdDecodeToken());
    this.userService.addCreditCard(creditCardModel).subscribe((response) => {
      this.toastrService.success(response.message, "Success");
      window.location.reload();
    });

  }
}
