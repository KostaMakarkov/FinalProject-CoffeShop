export class OrderSummary {
    city: String;
    street: String;
    apartment: String;
    zipcode: Number;
    orderNote: String;
    deliveryNote: String;
    additionalNote:String;
    constructor(city, street, apartment, zipcode, orderNote, deliveryNote, additionalNote){
        this.city = city;
        this.street = street;
        this.apartment = apartment;
        this.zipcode = zipcode;
        this.orderNote = orderNote;
        this.deliveryNote = deliveryNote;
        this.additionalNote = additionalNote;
    }
}
