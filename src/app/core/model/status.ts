export enum ReservationStatus {
  booked,
  rescheduled,
  completed,
  cancelled
}
 export function getReservationStatusName(status) {
   if (status == ReservationStatus.booked) {
     return 'Booked';
   } else if (status == ReservationStatus.rescheduled) {
     return 'Rescheduled';
   } else if (status == ReservationStatus.cancelled) {
     return 'Cancelled';
   } else if (status == ReservationStatus.completed) {
     return 'Completed';
   }

   return 'All';
 }
