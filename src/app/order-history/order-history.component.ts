import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private router:Router) { }
  backIcon = faArrowAltCircleLeft;

  goBackTo(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
