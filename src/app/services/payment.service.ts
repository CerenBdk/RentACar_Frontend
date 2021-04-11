import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditcard';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44308/api';
  constructor(private httpClient: HttpClient)  {  }
  addPayment(payment:Payment):Observable<ResponseModel> {
    let newPath = this.apiUrl + "/payments/add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getCreditCardById(cardId:number):Observable<SingleResponseModel<CreditCard>> {
    let newPath = this.apiUrl + "/creditcards/getbyid?cardId=" + cardId;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }
}
