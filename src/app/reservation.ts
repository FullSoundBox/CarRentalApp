export interface Reservation{
  id: number;
  amount: number;
  pickupDate: string;
  returnDate: string;
  reservationStatus: string;
  carId: number;
  customerId: number;
}
