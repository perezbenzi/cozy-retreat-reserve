
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingFilters from "@/components/admin/BookingFilters";
import BookingsTable from "@/components/admin/BookingsTable";
import BookingCalendar from "@/components/admin/BookingCalendar";
import GuestProfileModal from "@/components/admin/GuestProfileModal";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";
import { BookingWithGuest } from "@/types/admin";
import { GuestProfile } from "@/types/admin";
import { adminReservationsService } from "@/services/adminReservationsService";
import { toast } from "@/components/ui/sonner";

const AdminBookings = () => {
  const { t } = useAdminTranslation();
  const { 
    selectedGuestId, 
    isGuestProfileModalOpen, 
    setGuestProfileModalOpen 
  } = useAdminStore();
  
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const queryClient = useQueryClient();
  
  // Fetch real reservations from Supabase
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["adminBookings"],
    queryFn: adminReservationsService.getAllReservations,
    refetchOnWindowFocus: false,
  });

  // Mutation for updating reservation status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminReservationsService.updateReservationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Reservation status updated successfully");
    },
    onError: (error) => {
      console.error("Error updating reservation:", error);
      toast.error("Failed to update reservation status");
    },
  });

  // Mutation for cancelling reservations
  const cancelMutation = useMutation({
    mutationFn: adminReservationsService.cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Reservation cancelled successfully");
    },
    onError: (error) => {
      console.error("Error cancelling reservation:", error);
      toast.error("Failed to cancel reservation");
    },
  });

  // Mock query for guest profile (to be implemented later)
  const { data: guestProfile, isLoading: guestLoading } = useQuery({
    queryKey: ["guestProfile", selectedGuestId],
    enabled: !!selectedGuestId && isGuestProfileModalOpen,
    queryFn: async () => {
      // TODO: Implement real guest profile fetching
      return {
        id: selectedGuestId,
        email: "john@example.com",
        firstName: "John",
        lastName: "Smith",
        profileImage: "",
        phone: "+1234567890",
        address: "123 Main St, City, Country",
        nationality: "United States",
        totalStays: 5,
        totalSpent: 1850,
        bookingHistory: [],
      } as GuestProfile;
    }
  });

  const closeGuestModal = () => {
    setGuestProfileModalOpen(false);
  };

  // Handle errors
  if (error) {
    console.error("Error loading reservations:", error);
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{t.bookings}</h1>
        <div className="text-center py-10">
          <p className="text-red-600">Error loading reservations. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t.bookings}</h1>
        <div>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-[240px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">{t.listView}</TabsTrigger>
              <TabsTrigger value="calendar">{t.calendar}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <BookingFilters />

      {viewMode === "list" ? (
        <BookingsTable
          bookings={bookings || []}
          isLoading={isLoading}
          onUpdateStatus={updateStatusMutation.mutate}
          onCancelReservation={cancelMutation.mutate}
        />
      ) : (
        <BookingCalendar />
      )}

      <GuestProfileModal
        isOpen={isGuestProfileModalOpen}
        onClose={closeGuestModal}
        guest={guestProfile || null}
        isLoading={guestLoading}
      />
    </div>
  );
};

export default AdminBookings;
