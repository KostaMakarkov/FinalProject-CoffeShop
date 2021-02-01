import { AddressDemo } from "./address-demo";

export class UserDemo {
    firstname: String;
    lastname: String;
    password: String;
    email: String;
    dateOfBirth: String;
    phone: Number;
    address: AddressDemo;
    agree: boolean;
    position: String;
    constructor(firstname, lastname, password, email, dateOfBirth, phone, address, agree, position){
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.phone = phone;
        this.address = address;
        this.agree = agree;
        this.position = position;
    }
}
