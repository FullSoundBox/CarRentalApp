import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from './customer';
import { Reservation } from './reservation';

@Injectable({
    providedIn: 'root'
  })
export class CustomerService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) {}

    public getCustomers():Observable<Customer[]>{
      return this.http.get<any>(`${this.apiServerUrl}/customer/all`);
    }

    public getReservationById(id: string): Observable<Reservation>{
      return this.http.get<any>(`${this.apiServerUrl}/reservation/${id}`);
    }
    
}