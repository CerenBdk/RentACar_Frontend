import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isVerified: boolean = false;
  userName:string
  userMail:string;
  claim:string;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.IsUserVerified();
    if(this.isVerified){
    this.getUserName();
    this.getUserClaim();
    }
  }

  IsUserVerified() {
    if (this.authService.isAuthenticated()) {
      this.isVerified = true;
    } else {
      this.isVerified = false;
    }
  }

  getUserName() {
    this.userName = this.localStorageService.getUserNameDecodeToken();
  }

  getUserClaim() {
    this.claim = this.localStorageService.getClaimsDecodeToken();
  }

  logOut() {
    this.localStorageService.removeLocalStorage("token");
    this.toastrService.info("You logged out", "info");
    this.ngOnInit();
  }
}
