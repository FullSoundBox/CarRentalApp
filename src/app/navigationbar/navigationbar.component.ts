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
    reservationService: ReservationService;
    reservation: Reservation = {};

    constructor(private matDialog: MatDialog){}

    public getReservation(key: string):Reservation{     
        this.reservationService.getReservationById(key).subscribe(
            (response: Reservation) => {
              this.reservation = response;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        );
    return this.reservation;
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();

        this.reservation.id = 1;
        this.reservation.pickupDate = '2022-01-01';
        this.reservation.returnDate = '2022-01-31';
        this.reservation.amount = 1000;

        const reservationData = `
        Reservation Id: ${this.reservation.id} '\n'
        Reservation PickupDate: ${this.reservation.pickupDate} '\n'
        Reservation ReturnDate: ${this.reservation.returnDate} '\n'
        Reservation Amount: ${this.reservation.amount}
        `;

        dialogConfig.data = reservationData;
        this.matDialog.open(DialogBodyComponent, dialogConfig);
    }
}