import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
    private apiServerUrl = environment.apiBaseUrl;
    
    constructor(private http: HttpClient) {}

    public getAllCars(sortPrice: boolean,sortClass: boolean): Observable<Car[]>{
        console.log(sortClass);
        // if(sortPrice){
        //     return this.http.get<any>(`${this.apiServerUrl}/car/economy/asc/${sortClass}`);
        // }
        // return this.http.get<any>(`${this.apiServerUrl}/car/eco
        return this.http.get<any>(`${this.apiServerUrl}/car/all`);

    }

    public getAvailableCars(pickupDate: string, returnDate: string, carClass: string, price: boolean){
        if (price){
            return this.http.get<any>(`${this.apiServerUrl}/car/available/byprice/${pickupDate}/${returnDate}/${carClass}`);    
        }
        else{
            return this.http.get<any>(`${this.apiServerUrl}/car/available/${pickupDate}/${returnDate}/${carClass}`);
        }
        // return this.http.get<any>(`${this.apiServerUrl}/available}`,search);
    }

    getReservationById(key: string): Car {
        throw new Error('Method not implemented.');
    }
}