import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditcard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import{FormGroup,FormBuilder,FormControl,Validators, NumberValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  creditCard: string;
  expirationDate: string;
  securityCode: string;
  creditCardId:number;
  haveCreditCard:boolean = false;
  saveCard:boolean;
  selectedCard:number;
  PaymentForm:FormGroup;
  CreditCardForm:FormGroup;
  card:CreditCard;
  tempCard:CreditCard;
  creditCards:CreditCard[] = [];
  isDifferent:boolean = false;

  @Input() rentForPayment: Rental;
  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private userService:UserService,
    private localStorageService:LocalstorageService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserCreditCardList();
    this.createPaymentForm();
  }

  createPaymentForm()
  {
    this.PaymentForm = this.formBuilder.group({
      customerID:[""],
      creditCardNumber:["", Validators.required],
      expirationDate:["", Validators.required],
      securityCode:["", Validators.required],
      price:[""]
    });
  }

  addPayment() {
    let id = this.localStorageService.getIdDecodeToken();
    let rent: Rental = this.rentForPayment;
    rent.customerID = id;
    let paymentModel:Payment
   
    if(this.haveCreditCard == true && this.isDifferent == true)
    {
      this.saveCreditCard();
      paymentModel = this.paymentWithNewCreditCardModel();
    }
    else if(this.haveCreditCard == true)
    {
       paymentModel = this.paymentWithSelectedCreditCardModel();
    }
    else{
      this.saveCreditCard();
      paymentModel = this.paymentWithNewCreditCardModel();
    }
    this.paymentService.addPayment(paymentModel).subscribe((response) => {
      this.toastrService.success(
        'Your payment transaction has been completed successfully', "success"
      );
    });

    this.rentalService.addRental(rent).subscribe((response) => {
      this.toastrService.success(
        'Car rental process has been completed successfully', "success"
      );
    });

  }

  saveCreditCard()
  {
    if(this.saveCard == true)
    {
      let card:CreditCard ={
        customerID:this.localStorageService.getIdDecodeToken(),
        ownerName: this.localStorageService.getUserNameDecodeToken(),
        creditCardNumber: this.creditCard,
        expirationDate:this.expirationDate,
        securityCode:this.securityCode
      }
      this.userService.addCreditCard(card).subscribe(response_2 => {
        this.toastrService.success(
          'Your credit card information has been successfully saved', "success"
        );
      })
    }
  }

  paymentWithSelectedCreditCardModel()
  {
    let id = this.localStorageService.getIdDecodeToken();
    let paymentModel:Payment = {
      customerID : id,
      price : this.rentForPayment.price,
      creditCardNumber: this.tempCard.creditCardNumber,
      expirationDate : this.tempCard.expirationDate,
      securityCode : this.tempCard.securityCode,
    }
    return paymentModel;
  }

  paymentWithNewCreditCardModel()
  {
    let id = this.localStorageService.getIdDecodeToken();
    let paymentModel:Payment =  Object.assign({}, this.PaymentForm.value);
    paymentModel.customerID = id;
    paymentModel.price = this.rentForPayment.price;
    return paymentModel;
  }

  getUserCreditCardList()
  {
    let id = this.localStorageService.getIdDecodeToken();
    this.userService.getAllCreditCard(id).subscribe(response => {
      this.creditCards = response.data;
      if(this.creditCards.length > 0) 
      {
        this.haveCreditCard = true;
      }
    });
  }

  getSelectedCreditCard(card:CreditCard)
  {
    this.tempCard = card;
  }

  addNewCard()
  {
    this.isDifferent = true;
  }
}
