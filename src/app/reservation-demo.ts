export class ReservationDemo {
    reservationName: String;
    reservationContactNumber: Number;
    reservationCapacity: Number;
    reservationDate: String;
    constructor(reservationName, reservationContactNumber, reservationCapacity, reservationDate){
        this.reservationName = reservationName;
        this.reservationContactNumber = reservationContactNumber;
        this.reservationCapacity = reservationCapacity;
        this.reservationDate = reservationDate;
    }
}
