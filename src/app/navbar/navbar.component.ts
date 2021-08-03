import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public test : any
  constructor(private router : Router) { }

  ngOnInit(): void {
    if (localStorage.length!=0)
    {
      this.test=true;
    }
    else 
    {
      this.test=false;
    }    
  } 
  logout()
  {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("id");
    localStorage.removeItem("nom");
    localStorage.removeItem("prenom");
    window.location.reload()
  }

}
