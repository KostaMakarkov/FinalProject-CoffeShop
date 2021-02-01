export class AddressChange {
    addressCity: String;
    addressStreet: String;
    addressApartment: Number;
    addressZip: Number;
    email: String;
    constructor(addressCity, addressStreet, addressApartment,addressZip, email){
        this.addressCity = addressCity;
        this.addressStreet = addressStreet;
        this.addressApartment = addressApartment;
        this.addressZip = addressZip;
        this.email = email;
    }
}
