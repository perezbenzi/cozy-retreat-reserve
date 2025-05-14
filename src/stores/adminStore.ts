
import { create } from 'zustand';
import { Booking } from '@/types';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface AdminState {
  // Filters
  statusFilter: string;
  dateFilter: DateRange;
  // Selected items
  selectedBooking: Booking | null;
  selectedGuestId: string | null;
  // Calendar view
  calendarView: 'month' | 'week' | 'day';
  currentDate: Date;
  // UI State
  isGuestProfileModalOpen: boolean;
  isBookingModalOpen: boolean;
  // Actions
  setStatusFilter: (status: string) => void;
  setDateFilter: (range: DateRange) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setSelectedGuestId: (id: string | null) => void;
  setCalendarView: (view: 'month' | 'week' | 'day') => void;
  setCurrentDate: (date: Date) => void;
  setGuestProfileModalOpen: (open: boolean) => void;
  setBookingModalOpen: (open: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  // Initial state
  statusFilter: 'all',
  dateFilter: { start: null, end: null },
  selectedBooking: null,
  selectedGuestId: null,
  calendarView: 'month',
  currentDate: new Date(),
  isGuestProfileModalOpen: false,
  isBookingModalOpen: false,

  // Actions
  setStatusFilter: (status) => set({ statusFilter: status }),
  setDateFilter: (range) => set({ dateFilter: range }),
  setSelectedBooking: (booking) => set({ selectedBooking: booking }),
  setSelectedGuestId: (id) => set({ selectedGuestId: id }),
  setCalendarView: (view) => set({ calendarView: view }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setGuestProfileModalOpen: (open) => set({ isGuestProfileModalOpen: open }),
  setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),
}));
