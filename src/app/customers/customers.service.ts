import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers:any=[];
  url="https://localhost:5001/api/Customers";
  constructor(private http:HttpClient) { }
  getcustomers(){
    this.customers=this.http.get(this.url);
    return this.customers;
      }
      deleteCustomer(id:number){
        return this.http.delete(`${this.url}/${id}`);
      }
      addCustomer(customer:any){
        console.log(customer);
        return this.http.post(this.url,customer);
       }
       updateCustomer(id:any,customer:any)
       {
         return this.http.put(this.url+'/'+id,customer) ;
       }
}
