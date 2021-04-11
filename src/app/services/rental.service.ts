import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44308/api';

  constructor(private httpClient: HttpClient) {}

  getRentals():Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "/rentals/getall";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDtos():Observable<ListResponseModel<RentalDto>>
  {
    let newPath = this.apiUrl + "/rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  addRental(rental:Rental):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + "/rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  checkFindeks(carId:number, customerId:number):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + "/rentals/checkfindeks?carId=" + carId + "&customerId=" + customerId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
