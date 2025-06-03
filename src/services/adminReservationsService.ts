
import { supabase } from "@/integrations/supabase/client";
import { AdminReservation, BookingWithGuest } from "@/types/admin";

export const adminReservationsService = {
  // Fetch all reservations with guest information
  async getAllReservations(): Promise<BookingWithGuest[]> {
    console.log("Fetching all reservations from database");
    
    const { data, error } = await supabase
      .from('admin_reservations_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }

    console.log("Fetched reservations:", data);

    // Transform database data to match component interface
    return data.map((reservation: AdminReservation): BookingWithGuest => ({
      id: reservation.id,
      userId: reservation.user_id,
      roomId: reservation.room_id,
      roomName: reservation.room_name,
      roomImage: reservation.room_image || '',
      checkInDate: reservation.check_in,
      checkOutDate: reservation.check_out,
      numberOfGuests: reservation.guests,
      totalPrice: reservation.total_price,
      status: reservation.status as 'confirmed' | 'pending' | 'cancelled',
      createdAt: reservation.created_at,
      guestName: reservation.guest_name,
      guestEmail: reservation.guest_email,
      guestPhone: undefined // Not available in current schema
    }));
  },

  // Update reservation status
  async updateReservationStatus(reservationId: string, status: string): Promise<void> {
    console.log(`Updating reservation ${reservationId} status to ${status}`);
    
    const { error } = await supabase
      .from('reservations')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', reservationId);

    if (error) {
      console.error("Error updating reservation status:", error);
      throw error;
    }
  },

  // Delete/Cancel reservation
  async cancelReservation(reservationId: string): Promise<void> {
    console.log(`Cancelling reservation ${reservationId}`);
    
    const { error } = await supabase
      .from('reservations')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', reservationId);

    if (error) {
      console.error("Error cancelling reservation:", error);
      throw error;
    }
  }
};

// Export individual functions for easier importing
export const { getAllReservations, updateReservationStatus, cancelReservation } = adminReservationsService;
