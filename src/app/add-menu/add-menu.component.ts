import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';


@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  constructor(private api:ApiService) { }

  newDishForm:FormGroup;
  msg:string = '';

  addDish(){
    const newDish = new MenuDemo(
      0,
      this.newDishForm.controls.dishName.value,
      this.newDishForm.controls.dishPicture.value,
      this.newDishForm.controls.dishCategory.value,
      'Regular',
      this.newDishForm.controls.dishPrice.value,
      this.newDishForm.controls.dishDescription.value,
      this.newDishForm.controls.dishVeganOption.value
    )
    this.api.addNewDish(newDish).subscribe();
    this.msg = 'Dish has been added!'
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  ngOnInit(): void {

    this.newDishForm = new FormGroup({
      'dishName': new FormControl('', Validators.required),
      'dishPicture': new FormControl('', Validators.required),
      'dishCategory': new FormControl('', Validators.required),
      'dishPrice': new FormControl('', Validators.required),
      'dishDescription': new FormControl('', Validators.required),
      'dishVeganOption': new FormControl('false')
    })
  }

}



//
//dishId: string;
//dishName: string;
//dishPicture: string;
//dishCategory: string;
//dishSize: string;
//dishPrice: string;
//dishDescription: string;
//dishVeganOption: string;