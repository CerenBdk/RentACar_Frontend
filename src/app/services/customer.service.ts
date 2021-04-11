import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDto } from '../models/customerDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44308/api';

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>
  {
    let newPath = this.apiUrl + "/customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDtos():Observable<ListResponseModel<CustomerDto>>
  {
    let newPath = this.apiUrl + "/customers/getcustomerdetails";
      return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }

  getCustomerDtoByMail(mail:string):Observable<ListResponseModel<CustomerDto>>
  {
    let newPath = this.apiUrl + "/customers/getcustomerdetailbymail?mail=" + mail;
    return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }

}
