import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderSummary } from '../order-summary';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  myOrderArry:MenuDemo[]=[];
  backIcon = faArrowAltCircleLeft;

  totalSum:number = 0;
  

  constructor(private api:ApiService, private router:Router, private auth:AuthService) {}



  

  ngOnInit(): void {
  
  }

}
