import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-admins',
  templateUrl: './gestion-admins.component.html',
  styleUrls: ['../versions/versions.component.css']
})
export class GestionAdminsComponent implements OnInit {
  public admins: any[] = []
  myadmin:any={};
  t:any={};

  constructor(public http: HttpClient, private router : Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("mytoken")
    if (token){
    this.http.get<any>("https://localhost:5001/api/Users")
     .subscribe(
       (result) => { this.admins = result },
       (error) => { console.log(error) }
     )}
     else{this.router.navigateByUrl('/');}
  }

  //delete admin
  adminDelete(id:number){
    if (confirm('Are you sure to delete this admin ?'))
      {
        this.http.delete(`https://localhost:5001/api/Users/${id}`)
      .subscribe(
        err =>{console.log(err)}
      );
      window.location.reload()
      }
  }

  //add admin
  addAdmin(){
    this.myadmin.role ="admin";
    this.http.post("https://localhost:5001/api/Users",this.myadmin).subscribe(
      (data)=>{
        alert("Ajouté avec succès");
        return data;
      },
      (err)=>{
        alert("Admin existe deja");
        console.log(err);
      }
    );
    window.location.reload()
  }

  updateAdmin(id:any,admin:any)
    {
      
      this.http.put("https://localhost:5001/api/Users"+'/'+id,admin).subscribe(
        (data)=>{
          alert("modification avec succes");
          window.location.reload();
          return data;
        },
        (err)=>{
          alert("erreur");
          console.log(err);
        }
      );
    }
    test(objet:any)
    {
 this.t=objet;
    }

}
