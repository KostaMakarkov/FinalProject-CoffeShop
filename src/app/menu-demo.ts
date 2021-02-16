

export class MenuDemo {
    dishId: string;
    dishName: string;
    dishPicture: string;
    dishCategory: string;
    dishSize: string;
    dishPrice: string;
    dishDescription: string;
    dishVeganOption: boolean;
    constructor(dishId, dishName, dishPicture, dishCategory, dishSize, dishPrice, dishDescription, dishVeganOption){
        this.dishId = dishId;
        this.dishName = dishName;
        this.dishPicture = dishPicture;
        this.dishCategory = dishCategory;
        this.dishSize = dishSize;
        this.dishPrice = dishPrice;
        this.dishDescription = dishDescription;
        this.dishVeganOption = dishVeganOption;
    }
}
