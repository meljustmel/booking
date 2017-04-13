import { User } from './user';

export class Reservation {
  $key: string;
  reservationDate: string;
  reservationFullDate: string;
  reservationTime: string;
  createdDate: string;
  client: User;
  userId: string;
  status: string;
  service: string;
}
