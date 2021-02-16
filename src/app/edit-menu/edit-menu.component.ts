import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) {
    this.editForm = new FormGroup({
      'dishName' : new FormControl(''),
      'dishPicture' : new FormControl(''),
      'dishCategory' : new FormControl(''),
      'dishPrice' : new FormControl(''),
      'dishDescription' : new FormControl(''),
      'dishVeganOption' : new FormControl('')
    })
   }

  editForm:FormGroup;
  dishDetails:MenuDemo;

  saveChanges(){
    const editedDish = new MenuDemo(
      this.dishDetails[0].dishId,
      this.editForm.controls.dishName.value,
      this.editForm.controls.dishPicture.value,
      this.editForm.controls.dishCategory.value,
      'Regular',
      this.editForm.controls.dishPrice.value,
      this.editForm.controls.dishDescription.value,
      this.editForm.controls.dishVeganOption.value
    )
    this.api.editDish(editedDish).subscribe();
    localStorage.removeItem('dishToEdit')
    this.router.navigate(['user-settings/manage-menu'])
  }

  ngOnInit(): void {

    const selectedDish = localStorage.getItem('dishToEdit');
    this.api.getSingleDish(selectedDish).subscribe((data) => {
      this.dishDetails = data;
      this.editForm = new FormGroup({
        'dishName' : new FormControl(this.dishDetails[0].dishName),
        'dishPicture' : new FormControl(this.dishDetails[0].dishPicture),
        'dishCategory' : new FormControl(this.dishDetails[0].dishCategory),
        'dishPrice' : new FormControl(this.dishDetails[0].dishPrice),
        'dishDescription' : new FormControl(this.dishDetails[0].dishDescription),
        'dishVeganOption' : new FormControl(this.dishDetails[0].dishVeganOption)
      })
    })
    
  }

}
