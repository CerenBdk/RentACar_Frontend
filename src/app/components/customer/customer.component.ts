import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerDto } from 'src/app/models/customerDto';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:Customer[] = [];
  customerDtos:CustomerDto[] = [];
  mail = localStorage.getItem("email");

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomerDtos();
    this.getCustomerDtoBySenpai();
  }

  getCustomers()
  {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    });
  }

  getCustomerDtos()
  {
    this.customerService.getCustomerDtos().subscribe(response => {
      this.customerDtos = response.data;
    });
  }

  getCustomerDtoBySenpai()
  {
    this.customerService.getCustomerDtoByMail(this.mail).subscribe(response => {
        console.log(response.data);
    });
  }
}
