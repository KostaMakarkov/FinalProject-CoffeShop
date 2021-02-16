import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MenuDemo } from '../menu-demo';
import { faSeedling, faCheckDouble, faThumbsDown, faPlus, faTrashAlt, faArrowAltCircleLeft, faArrowAltCircleUp} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DishPrice } from '../dish-price';
import { DishNameAndPrice } from '../DishNameAndPrice';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private api:ApiService, private router:Router) { }

  myAppetizersArry:MenuDemo[]=[];
  myEntreesArry:MenuDemo[]=[];
  myColdBeverages:MenuDemo[]=[];
  myHotBeverages:MenuDemo[]=[];
  myDessertArry:MenuDemo[]=[];


  veganIcon = faSeedling;
  checkIcon = faCheckDouble;
  plusIcon = faPlus;
  trashIcon = faTrashAlt;
  backIcon = faArrowAltCircleLeft;
  upIcon = faArrowAltCircleUp;
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

  navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
}


  selectedDish(dish){
    const newDish = new DishPrice(dish.dishId);
    this.cartList.push(newDish);
    const newDishString = JSON.stringify(this.cartList);
    localStorage.setItem('dishId', newDishString);

    //---------------------------------------------//

    const checkOutDish = new DishNameAndPrice(dish.dishName, dish.dishPrice, dish.dishId);
    this.showCurrentOrder.push(checkOutDish);
    const checkOutDishString = JSON.stringify(this.showCurrentOrder);
    localStorage.setItem('addDish', checkOutDishString);
    this.totalSum += Number(dish.dishPrice);
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
      this.router.navigate(['/order-summary']);
    }
  }


  ngOnInit(): void {
    this.api.getDishesByCategory(`HotBeverage`).subscribe((data) => this.myHotBeverages = data);
    this.api.getDishesByCategory(`ColdBeverages`).subscribe((data) => {
      this.myColdBeverages = data
      console.log(this.myColdBeverages);
      
    });
    this.api.getDishesByCategory('Appetizer').subscribe((data) => {this.myAppetizersArry = data});
    this.api.getDishesByCategory('Entree').subscribe((data) => this.myEntreesArry = data);
    this.api.getDishesByCategory('Dessert').subscribe((data) => this.myDessertArry = data);
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
