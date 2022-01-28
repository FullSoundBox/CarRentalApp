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
    reservation: Reservation;

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
        dialogConfig.data = "some data";
        this.matDialog.open(DialogBodyComponent, dialogConfig);
    }
}