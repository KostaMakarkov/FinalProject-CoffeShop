import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }

  myMenuArry:MenuDemo[] = [];
  deleteIcon = faTrashAlt;


  changeList(value: string){
    if(value == 'all'){
      this.api.getAllMenuDishes().subscribe(data => this.myMenuArry = data);
    }
    else{
    this.api.getDishesByCategory(value).subscribe(data => this.myMenuArry = data);
    }
  }


moveTo(dish){
  localStorage.setItem('dishToEdit', dish);
  this.router.navigate([`user-settings/manage-menu/edit-menu`])
}

deleteDish(dishId){
  const areYouSure = prompt('Are you sure you want to delete this dish?')
  if(areYouSure == 'yes'){
    this.api.deleteDish(dishId).subscribe();
    window.location.reload();
  }
}



  ngOnInit(): void {
  }
}
