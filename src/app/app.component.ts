import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Car } from './car';
import { CarService } from './car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carrentalapp';

  public cars: Car[] = [];
  // public editCar: Car;
  
  constructor(private carService: CarService){}

  ngOnInit(){
    this.getCars();
  }

  public getCars(): void{
    this.carService.getAllCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddReservation(addForm: NgForm): void{

  }
}
