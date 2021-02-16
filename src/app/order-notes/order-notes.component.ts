import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { OrderNotesDemo } from '../order-notes-demo';


@Component({
  selector: 'app-order-notes',
  templateUrl: './order-notes.component.html',
  styleUrls: ['./order-notes.component.css']
})
export class OrderNotesComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  notesForm:FormGroup;
  lArrowIcon = faArrowAltCircleLeft;
  rArrowIcon = faArrowAltCircleRight;

  goBackTo(){
    this.router.navigate(['/order-address'])
  }
  proceedToNext(){
    const orderNotes = new OrderNotesDemo(
      this.notesForm.controls.orderNotes.value,
      this.notesForm.controls.deliveryNotes.value,
      this.notesForm.controls.additionalNote.value
    )
    localStorage.setItem('orderNotes', JSON.stringify(orderNotes));
    this.router.navigate(['/order-payment']);
  }

  ngOnInit(): void {
    if(this.auth.loggedIn()){
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      this.notesForm = new FormGroup({
        'orderNotes' : new FormControl('None',),
        'deliveryNotes' : new FormControl('None'),
        'additionalNote' : new FormControl('None')
      })
  }

}
}
