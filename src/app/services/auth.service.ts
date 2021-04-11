import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalstorageService } from './localstorage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44308/api';
  claims: String[];
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalstorageService,
    private userService: UserService
  ) {}

  login(login: Login) {
    let newPath = this.apiUrl + '/auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      login
    );
  }

  register(register: Register) {
    let newPath = this.apiUrl + '/auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      register
    );
  }

  isAuthenticated() {
    if (this.localStorageService.getLocalStorage('token')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(){
    if(this.localStorageService.getClaimsDecodeToken() == "admin")
    {
      return true;
    }
    else{
      return false;
    }
  }
}
