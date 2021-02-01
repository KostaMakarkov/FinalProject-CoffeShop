import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';
import { faSeedling, faCheckDouble, faThumbsDown, faPlus, faTrashAlt, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { Orderdemo } from '../orderdemo';
import { DishPrice } from '../dish-price';
import { DishNameAndPrice } from '../DishNameAndPrice';


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
  menuOrderingPrices:MenuDemo[]=[];


  veganIcon = faSeedling;
  checkIcon = faCheckDouble;
  plusIcon = faPlus;
  trashIcon = faTrashAlt;
  backIcon = faArrowAltCircleLeft;
  activateIcon:boolean = false; 

  cartList:DishPrice[] = [];
  currentOrder:MenuDemo[]=[]
  totalSum:number = 0;
  showCurrentOrder = [];
  errMsg:string = '';
  selectedNotEmpty:boolean = false;

  calculateSum(){
    this.showCurrentOrder.forEach(ele => {
      this.totalSum += ele.price
    });
  }

  goBackTo(){
    this.router.navigate(['/']);
  }


  selectedSize(dishId, name, price){
    const newDish = new DishPrice(dishId);
    this.cartList.push(newDish);
    const newDishString = JSON.stringify(this.cartList);
    localStorage.setItem('dishId', newDishString);

    //---------------------------------------------//

    const checkOutDish = new DishNameAndPrice(name, price, dishId);
    this.showCurrentOrder.push(checkOutDish);
    const checkOutDishString = JSON.stringify(this.showCurrentOrder);
    localStorage.setItem('addDish', checkOutDishString);
    this.totalSum += price;
  };


  clearOrder(){
    localStorage.removeItem('dishId');
    localStorage.removeItem('addDish');
    window.location.reload();
  }

  removeItem(dishId){
    const newShowCurrentOrder = this.showCurrentOrder.filter( (dish) => {return dish.dishId != dishId});
    const newCartList = this.cartList.filter( (dish) => {return dish.dishID != dishId});
    localStorage.setItem('addDish', JSON.stringify(newShowCurrentOrder));
    localStorage.setItem('dishId' , JSON.stringify(newCartList));
    window.location.reload();
  }

  proceedToCheckout(){
    const cartToServer = localStorage.getItem('dishId');
    if(cartToServer == null){
      this.errMsg = 'Cannot checkout empty cart!'
    }
    else{
      this.api.getCurrentOrders(cartToServer).subscribe(data => this.currentOrder = data);
      this.router.navigate(['checkout']);
    }
  }

  check(){
    console.log(this.cartList);
    console.log(this.showCurrentOrder);
    
  }

  ngOnInit(): void {
    this.api.getDishesByCategory(`COFFEE`).subscribe(data => this.myCoffeeArry = data);
    this.api.getDishesByCategory(`CHOCOLATEMILK`).subscribe(data => this.myHotChocolateArry = data);
    this.api.getDishesByCategory(`TEA`).subscribe(data => this.myTeaArry = data);
    let savedDishId = JSON.parse(localStorage.getItem('dishId'));
    let savedAddDish = JSON.parse(localStorage.getItem('addDish'));
    if(savedDishId){
      savedDishId.forEach(ele => {
        this.cartList.push(ele);
      });
      if(savedAddDish){
        savedAddDish.forEach(ele => {
          this.showCurrentOrder.push(ele);
          this.totalSum += ele.dishPrice
        });
      }
      
    }
  };
  
};
