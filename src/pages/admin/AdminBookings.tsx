
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingFilters from "@/components/admin/BookingFilters";
import BookingsTable from "@/components/admin/BookingsTable";
import BookingCalendar from "@/components/admin/BookingCalendar";
import GuestProfileModal from "@/components/admin/GuestProfileModal";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";
import { BookingWithGuest } from "@/types/admin";
import { GuestProfile } from "@/types/admin";

const AdminBookings = () => {
  const { t } = useAdminTranslation();
  const { 
    selectedGuestId, 
    isGuestProfileModalOpen, 
    setGuestProfileModalOpen 
  } = useAdminStore();
  
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  
  // Mock query for bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["adminBookings"],
    queryFn: async () => {
      // In a real application, this would be an API call
      return [
        {
          id: "1",
          userId: "user1",
          roomId: "room101",
          roomName: "Deluxe King Room",
          roomImage: "https://images.unsplash.com/photo-1551776235-dde6d482980b?q=80&w=2940&auto=format&fit=crop",
          checkInDate: "2025-05-15",
          checkOutDate: "2025-05-18",
          numberOfGuests: 2,
          totalPrice: 450,
          status: "confirmed" as const,
          createdAt: "2025-05-01",
          guestName: "John Smith",
          guestEmail: "john@example.com"
        },
        {
          id: "2",
          userId: "user2",
          roomId: "room102",
          roomName: "Standard Twin Room",
          roomImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=3174&auto=format&fit=crop",
          checkInDate: "2025-05-20",
          checkOutDate: "2025-05-25",
          numberOfGuests: 2,
          totalPrice: 750,
          status: "pending" as const,
          createdAt: "2025-05-02",
          guestName: "Sarah Johnson",
          guestEmail: "sarah@example.com"
        },
        {
          id: "3",
          userId: "user3",
          roomId: "room103",
          roomName: "Superior Suite",
          roomImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=3870&auto=format&fit=crop",
          checkInDate: "2025-05-10",
          checkOutDate: "2025-05-13",
          numberOfGuests: 3,
          totalPrice: 620,
          status: "cancelled" as const,
          createdAt: "2025-05-03",
          guestName: "Michael Brown",
          guestEmail: "michael@example.com"
        }
      ] as BookingWithGuest[];
    }
  });

  // Mock query for guest profile
  const { data: guestProfile, isLoading: guestLoading } = useQuery({
    queryKey: ["guestProfile", selectedGuestId],
    enabled: !!selectedGuestId && isGuestProfileModalOpen,
    queryFn: async () => {
      // In a real application, this would be an API call
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
        bookingHistory: [
          {
            id: "1",
            userId: selectedGuestId || "",
            roomId: "room101",
            roomName: "Deluxe King Room",
            roomImage: "https://images.unsplash.com/photo-1551776235-dde6d482980b?q=80&w=2940&auto=format&fit=crop",
            checkInDate: "2025-05-15",
            checkOutDate: "2025-05-18",
            numberOfGuests: 2,
            totalPrice: 450,
            status: "confirmed" as const,
            createdAt: "2025-05-01"
          },
          {
            id: "4",
            userId: selectedGuestId || "",
            roomId: "room104",
            roomName: "Standard Double Room",
            roomImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=3174&auto=format&fit=crop",
            checkInDate: "2025-04-10",
            checkOutDate: "2025-04-15",
            numberOfGuests: 2,
            totalPrice: 600,
            status: "confirmed" as const,
            createdAt: "2025-04-01"
          }
        ]
      } as GuestProfile;
    }
  });

  const closeGuestModal = () => {
    setGuestProfileModalOpen(false);
  };

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
