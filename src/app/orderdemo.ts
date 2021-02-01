import { Orderdetailsdemo } from "./orderdetailsdemo";

export class Orderdemo {
    dishName : string;
    dishSize : string;
    dishPrice : number;
    dishDescription : string;
    constructor(dishName, dishSize, dishPrice, dishDescription){
        this.dishName = dishName;
        this.dishSize = dishSize;
        this.dishPrice = dishPrice;
        this.dishDescription = dishDescription;
    }
}
