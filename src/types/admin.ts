
import { Booking, User } from './index';

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
}

export interface GuestProfile extends User {
  phone?: string;
  address?: string;
  nationality?: string;
  bookingHistory: Booking[];
  totalStays: number;
  totalSpent: number;
  notes?: string;
}

export interface BookingWithGuest extends Booking {
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId: string;
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Resource {
  id: string;
  title: string;
  type: 'room' | 'bed';
  capacity: number;
}
