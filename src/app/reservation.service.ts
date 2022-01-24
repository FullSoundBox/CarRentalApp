import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public getReservations():Observable<Reservation[]>{
    return this.http.get<any>(`${this.apiServerUrl}/reservation/all`);
  }
  
}