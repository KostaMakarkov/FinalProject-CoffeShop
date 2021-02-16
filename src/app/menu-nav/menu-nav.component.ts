import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faArchive, faEdit, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  constructor(private router:Router) { }

  archiveIcon = faArchive;
  editIcon = faEdit;
  addIcon = faPlusCircle;

  moveTo(page){
    this.router.navigate([`/user-settings/manage-menu/${page}`])
  }


  ngOnInit(): void {
  }

}
