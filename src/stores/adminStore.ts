
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking } from '@/types';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

type AdminLanguage = 'en' | 'es';

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
  // Admin Settings
  adminLanguage: AdminLanguage;
  // Actions
  setStatusFilter: (status: string) => void;
  setDateFilter: (range: DateRange) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setSelectedGuestId: (id: string | null) => void;
  setCalendarView: (view: 'month' | 'week' | 'day') => void;
  setCurrentDate: (date: Date) => void;
  setGuestProfileModalOpen: (open: boolean) => void;
  setBookingModalOpen: (open: boolean) => void;
  setAdminLanguage: (language: AdminLanguage) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // Initial state
      statusFilter: 'all',
      dateFilter: { start: null, end: null },
      selectedBooking: null,
      selectedGuestId: null,
      calendarView: 'month',
      currentDate: new Date(),
      isGuestProfileModalOpen: false,
      isBookingModalOpen: false,
      adminLanguage: 'es',

      // Actions
      setStatusFilter: (status) => set({ statusFilter: status }),
      setDateFilter: (range) => set({ dateFilter: range }),
      setSelectedBooking: (booking) => set({ selectedBooking: booking }),
      setSelectedGuestId: (id) => set({ selectedGuestId: id }),
      setCalendarView: (view) => set({ calendarView: view }),
      setCurrentDate: (date) => set({ currentDate: date }),
      setGuestProfileModalOpen: (open) => set({ isGuestProfileModalOpen: open }),
      setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),
      setAdminLanguage: (language) => set({ adminLanguage: language }),
    }),
    {
      name: 'admin-settings-storage',
      partialize: (state) => ({ adminLanguage: state.adminLanguage }),
    }
  )
);
