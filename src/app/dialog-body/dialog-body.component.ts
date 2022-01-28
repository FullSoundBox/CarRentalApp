import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';

@Component({
  selector: "dialog-b",
  // template: "<h1>Dialog body component</h1>",
  // template: "passed in data: ",
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  bookingCar = false;
  userResponse = false;

  constructor(private reservationService: ReservationService,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);
  }

  bookCar(){
    // this.reservationService.newReservation(this.data);
    this.dialogRef.close(true);
  }
}
