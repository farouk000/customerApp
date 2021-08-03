import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../dashboard/dashboard.component.css','./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapseShow(classes:any) {
    this.collapseShow = classes;
  }

}
