import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Car } from './car';
import { CarService } from './car.service';
import { Reservation } from './reservation';


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
  carClass: string = '';
  public reservation: Reservation;

  public cars: Car[] = [];
  // public editCar: Car;
  
  constructor(private carService: CarService){}

  ngOnInit(){
    this.getCars();
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
        // addForm.reset();
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
}
