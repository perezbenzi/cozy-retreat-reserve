
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
  guestAvatar?: string;
}

export interface AdminReservation {
  id: string;
  user_id: string;
  room_id: string;
  room_name: string;
  room_image: string | null;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  guest_name: string;
  guest_email: string;
  guest_avatar: string | null;
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
