import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stat:any={};
  constructor(private router : Router, public http: HttpClient) { }

  ngOnInit(): void {
    let token = localStorage.getItem("mytoken")
    if (token){
      this.http.get("https://localhost:5001/api/stats")
      .subscribe(
        (result) => { this.stat = result },
        (error) => { console.log(error) }
      )
    }
    else{this.router.navigateByUrl('/');}
  }

}
