import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Reservation } from "../reservation";
import { ReservationService } from "../reservation.service";
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from "../dialog-body/dialog-body.component";

@Component({
    selector: 'navigation-bar',
    styleUrls: ['./navigationbar.component.css'],
    templateUrl: './navigationbar.component.html'
})
export class NavigationBar{
    reservation: Reservation;

    constructor(private reservationService: ReservationService, private matDialog: MatDialog){}

    ngOnInit(){
        this.reservation = {id: 0, amount: 0, pickupDate: '', returnDate: '', carId: 0,customerId: 0, reservationStatus: ''}
    }

    public getReservation(key: string):void{     
        this.reservationService.getReservationById(key).subscribe(
            (response: Reservation) => {
                console.log(response);
                //   console.log(this.reservation);
              this.reservation = response;
            
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
    }

    openDialog(key: string) {
        const dialogConfig = new MatDialogConfig();
        this.getReservation(key);

        // this.reservation.id = 1;
        // this.reservation.pickupDate = '2022-01-01';
        // this.reservation.returnDate = '2022-01-31';
        // this.reservation.amount = 1000;

        const reservationData = `
        Reservation Id: ${this.reservation.id}
        Reservation PickupDate: ${this.reservation.pickupDate}
        Reservation ReturnDate: ${this.reservation.returnDate}
        Reservation Amount: ${this.reservation.amount}
        `;

        dialogConfig.data = reservationData;
        this.matDialog.open(DialogBodyComponent, dialogConfig);
    }
}