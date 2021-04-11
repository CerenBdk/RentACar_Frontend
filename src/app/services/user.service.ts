import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditcard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserForUpdate } from '../models/userforupdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44308/api/';

  constructor(private httpClient:HttpClient) { }

  getUserByMail(mail:string):Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + "users/getuserbymail?mail=" + mail;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  checkIfCustomer(userId:number):Observable<ResponseModel> {
    let newPath = this.apiUrl + "users/checkifcustomer?userId=" + userId;
    return this.httpClient.get<ResponseModel>(newPath);
  }

  userDtoUpdate(user:UserForUpdate, userId:number):Observable<ResponseModel> {
    let newPath = this.apiUrl + "users/userdtoupdate?userId=" +userId;
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

  addCreditCard(creditcard:CreditCard):Observable<ResponseModel> {
    let newPath = this.apiUrl + "creditcards/add";
    return this.httpClient.post<ResponseModel>(newPath, creditcard);
  }

  deleteCreditCard(cardId:number):Observable<ResponseModel> {
    let newPath = this.apiUrl + "creditcards/deletebycardid";
    return this.httpClient.post<ResponseModel>(newPath, cardId);
  }
  
  getAllCreditCard(customerId:number):Observable<ListResponseModel<CreditCard>>
  {
    let newPath = this.apiUrl + "creditcards/getallcreditcardbycustomerid?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

}
