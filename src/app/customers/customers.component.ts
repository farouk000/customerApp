import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../versions/versions.component.css','./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any=[];
  mycustomer: any={};
  t: any={};
  public Versions: any[] = [];
  public Sites: any[] = [];

  constructor(private myservice: CustomersService, public http: HttpClient, private router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    let token = localStorage.getItem("mytoken")
    if (token)
    { 
    this.getallcustomers();
    this.http.get<any>("https://localhost:5001/api/Versions")
      .subscribe(
        (result) => { this.Versions = result },
        (error) => { console.log(error) }
      );
      this.http.get<any>("https://localhost:5001/api/Sites")
      .subscribe(
        (result) => { this.Sites = result },
        (error) => { console.log(error) }
      )
    }else {this.router.navigateByUrl('/'); } 
  }
  getallcustomers()
  {
    this.myservice.getcustomers().subscribe(
      (data: any)=>{
        this.customers=data;
        console.log(data);
      },
      (err: any)=>{
        console.log(err);
      }
    );
    console.log(this.customers);
    }

    customerDelete(id:number){
      if (confirm('Voulez-vous supprimer ce client?'))
      {
        this.myservice.deleteCustomer(id)
                  .subscribe(
                    (result) => {
                      this.toastr.success("Supprimé avec succès");
                      window.location.reload();
                    },
                    (error) => {console.log(error);
                      this.toastr.error("Erreur");
                      window.location.reload()
                    }
                  );
      }
    }

    addCustomer(){
      this.mycustomer.versionId=this.mycustomer.versionId-1+1;
      this.mycustomer.backOfficePort=this.mycustomer.backOfficePort-0;
      this.mycustomer.frontOfficePort=this.mycustomer.frontOfficePort-0;
      var reponse=this.myservice.addCustomer(this.mycustomer).subscribe(
        (data)=>{
          window.location.reload();
          this.toastr.success("Ajouté avec succès");
          return data;
        },
        (err)=>{
          this.toastr.error("Erreur");
        }
      );
      console.log(reponse);
      this.mycustomer={};
    }
    
    updateCustomer(id:any,customer:any)
    {
      customer.versionId=customer.versionId-1+1;
      customer.backOfficePort=customer.backOfficePort-0;
      customer.frontOfficePort=customer.frontOfficePort-0;
      this.myservice.updateCustomer(id,customer).subscribe(
        (data)=>{
          this.toastr.success("Modifié avec succès");
          window.location.reload();
          return data;
        },
        (err)=>{
          this.toastr.error("Erreur");
          console.log(err);
        }
      );
    }
    test(objet:any)
    {
      this.t=objet;
    }

}
