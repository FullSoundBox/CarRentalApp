import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getReservations():Observable<Reservation[]>{
    return this.http.get<any>(`${this.apiServerUrl}/reservation/all`);
  }

  public getReservationById(id: string):Observable<Reservation>{
    return this.http.get<any>(`${this.apiServerUrl}/reservation/${id}`);
  }

  public newReservation(reservation: Reservation):Observable<Reservation>{
    return this.http.post<any>(`${this.apiServerUrl}/reservation/add/${reservation.id}`,reservation);
  }
  
}
