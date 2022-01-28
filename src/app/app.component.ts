import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Car } from './car';
import { CarService } from './car.service';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { Reservation } from './reservation';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carrentalapp';
  priceSwitch: boolean = true;
  classSwitch: boolean = true;
  pickupDate: string = '';
  returnDate: string = '';
  totalAmount: number = 0;

  carClass: string = '';
  public reservation: Reservation;

  public cars: Car[] = [];
  public selectedCar: Car;
  // public editCar: Car;
  
  constructor(private carService: CarService,
    private matDialog: MatDialog){}

  ngOnInit(){
    this.getCars();
    this.reservation = {id: 0, amount: 0, pickupDate: '', returnDate: '', carId: 0,customerId: 0}
  }

  public getCarService():CarService{ return this.carService; }

  public getCars(): void{
    this.carService.getAllCars(this.priceSwitch,this.classSwitch).subscribe(
      (response: Car[]) => {
        this.cars = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onFindAvailable(findForm: NgForm): void{
    console.log(this.pickupDate);
    console.log(this.returnDate);
    console.log(this.carClass);
    console.log(findForm.value);
    
    this.carService.getAvailableCars(this.pickupDate, this.returnDate, this.carClass,this.priceSwitch).subscribe(
      (response: Car[]) => {
        console.log(response);
        this.cars = response;
        // aForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        // addForm.reset();
      }
    );
  }

  public searchReservation(key: string): void{
    console.log(key);
    // this.carService.getReservationById(key).subscribe(
    //   (response: Reservation) => {
    //     console.log(response);
    //     this.reservation = response;
    //     // addForm.reset();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //     // addForm.reset();
    //   }
    // );
  }

  public onPriceSwitch(event: any): void {
    console.log(event);
    // this.carService.getAvailableCars(this.pickupDate, this.returnDate, this.carClass,this.priceSwitch).subscribe(
    //   (response: Car[]) => {
    //     console.log(response);
    //     this.cars = response;
    //     // addForm.reset();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //     // addForm.reset();
    //   }
    // );
  }

  public onClassSwitch(event: any): void {
    console.log(event);
    // this.carService.getAvailableCars(this.pickupDate, this.returnDate, this.carClass,this.priceSwitch).subscribe(
    //   (response: Car[]) => {
    //     console.log(response);
    //     this.cars = response;
    //     // addForm.reset();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //     // addForm.reset();
    //   }
    // );
  }

  calculatePrice(pricePerDay: number): number{
    let date1 = new Date(this.pickupDate);
    let date2 = new Date(this.returnDate);
    if (date1>date2){
      return this.totalAmount = NaN;
    }
    var Time = date2.getTime() - date1.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    return this.totalAmount = Days*pricePerDay;
  }

  reservationDialog(selected :Car){
    const dialogConfig = new MatDialogConfig();
      this.selectedCar = selected;
        const reservationData = `
        Car Id: ${this.selectedCar.carId}
        ${this.selectedCar.brand} ${this.selectedCar.model}
        Price Per Day: ${this.selectedCar.pricePerDay}
        Pickup Date: ${this.pickupDate}
        Retrun Date: ${this.returnDate}
        Total Amount: ${this.reservation.amount}
        `;
        // Total Amount: ${this.reservation.amount}

        dialogConfig.data = reservationData;
        this.matDialog.open(DialogBodyComponent, dialogConfig);
  }

  onBookCar(selected: Car){
    // console.log(selectedCar)
    this.reservation.carId = selected.carId;
    this.reservation.amount = this.calculatePrice(selected.pricePerDay);
    this.reservation.pickupDate = this.pickupDate;
    this.reservation.returnDate = this.returnDate;
    this.reservationDialog(selected);
  }
}
