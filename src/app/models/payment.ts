export interface Payment{
    id?:number,
    customerID:number;
    price:number;
    creditCardNumber:string;
    expirationDate:string;
    securityCode:string;
}