import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';
import { faSeedling, faCheckDouble, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }


  myCoffeeArry:MenuDemo[]=[];
  myHotChocolateArry:MenuDemo[]=[];
  myTeaArry:MenuDemo[]=[];

  veganIcon = faSeedling;
  checkIcon = faCheckDouble;
  activateIcon:boolean = false; 

  cartList:any = [];
  currentOrder:MenuDemo[]=[]
  totalSum = 0;
  currentSelectedOrder;

  addToCart(dish){
    const selectedCupSizeAndPrice = JSON.parse(localStorage.getItem('selectedSize'));
    const newSelectedDish = ({
      "dishName" :dish.dishName,
      "dishSize" : selectedCupSizeAndPrice.size,
      "dishPrice" : selectedCupSizeAndPrice.price,
      "dishDescription" : dish.dishDescription
    });
    this.cartList.push(newSelectedDish);
    let cartListString = JSON.stringify(this.cartList);
    localStorage.setItem('cartList', cartListString);
    this.api.newOrder(newSelectedDish).subscribe();
    this.activateIcon = true;
    window.location.reload()
  };

  selectedSize(price,size){
    const selectedPriceAndSize = {"price":price, "size":size};
    const jsonSelected = JSON.stringify(selectedPriceAndSize);
    localStorage.setItem('selectedSize', jsonSelected);
  };
  proceedToCheckout(){
    this.router.navigate(['checkout']);
  }

  ngOnInit(): void {
    this.api.getDishesByCategory(`COFFEE`).subscribe(data => this.myCoffeeArry = data);
    this.api.getDishesByCategory(`CHOCOLATEMILK`).subscribe(data => this.myHotChocolateArry = data);
    this.api.getDishesByCategory(`TEA`).subscribe(data => this.myTeaArry = data);

  // calculate the sum of the items //  
    this.currentOrder = JSON.parse(localStorage.getItem('cartList'));
    if(this.currentOrder != null){
    this.currentOrder.forEach(ele => {
      this.totalSum += Number(ele.dishPrice);
    });
  }
  // if cartList has items then after refresh it saves them into cartList //
    const isLocalEmpty = JSON.parse(localStorage.getItem('cartList'));
    if( isLocalEmpty != null){
      this.cartList = isLocalEmpty;
      
    }
  }

}
