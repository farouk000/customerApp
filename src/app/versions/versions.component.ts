import { Component, OnInit } from '@angular/core';
import { VersionsService } from './versions.service';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.css','../customers/customers.component.css']
})
export class VersionsComponent implements OnInit {
  public versions: any[] = []
  public myversion: any = {}
  t:any={};

  constructor(private myservice: VersionsService, public http: HttpClient, private router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    let token = localStorage.getItem("mytoken")
    if (token){
    this.getallversions();
    }else{this.router.navigateByUrl('/');}
  }
  getallversions()
  {
    this.myservice.getversions().subscribe(
      (data: any)=>{
        this.versions=data;
        console.log(data);
      },
      (err: any)=>{
        console.log(err);
      }
    );
    console.log(this.versions);
    }

    versionDelete(id:number){
      if (confirm('Are you sure to delete this version?'))
      {
        this.myservice.deleteVersion(id)
                  .subscribe(
                    (result) => {this.toastr.success("Supprimée avec succes");},
                    err =>{console.log(err);
                      this.toastr.error("Erreur");}
                  );
      window.location.reload()
      }
    }

    addVersion(){
      this.myversion.date=new Date() ;
      this.myversion.isDeleted=0;
      var reponse=this.myservice.addVersion(this.myversion).subscribe(
        (data)=>{
          this.toastr.success("Ajoutée avec succes");
          window.location.reload();
          return data;
        },
        (err)=>{this.toastr.error("Erreur");
        }
      );
      console.log(reponse);
      this.myversion={};
    }
    
    updateVersion(id:any,version:any)
    {
      version.isDeleted=version.isDeleted-0;
      this.myservice.updateVersion(id,version).subscribe(
        (data)=>{
          this.toastr.success("Modifiée avec succes");
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
