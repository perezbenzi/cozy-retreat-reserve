
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";
import { BookingWithGuest } from "@/types/admin";
import { Edit, Eye, MoreHorizontal, Trash, CalendarCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingsTableProps {
  bookings: BookingWithGuest[];
  isLoading?: boolean;
  onUpdateStatus?: (params: { id: string; status: string }) => void;
  onCancelReservation?: (id: string) => void;
}

const BookingsTable = ({ 
  bookings, 
  isLoading = false, 
  onUpdateStatus,
  onCancelReservation 
}: BookingsTableProps) => {
  const { t } = useAdminTranslation();
  const { 
    setSelectedBooking, 
    setGuestProfileModalOpen, 
    setSelectedGuestId 
  } = useAdminStore();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<BookingWithGuest | null>(null);

  const handleViewBooking = (booking: BookingWithGuest) => {
    setSelectedBooking(booking);
  };

  const handleEditBooking = (booking: BookingWithGuest) => {
    setSelectedBooking(booking);
    // Logic to open edit modal would go here
  };

  const handleViewGuest = (booking: BookingWithGuest) => {
    setSelectedGuestId(booking.userId);
    setGuestProfileModalOpen(true);
  };

  const confirmDelete = (booking: BookingWithGuest) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const handleDeleteBooking = () => {
    if (bookingToDelete && onCancelReservation) {
      console.log("Cancelling booking:", bookingToDelete.id);
      onCancelReservation(bookingToDelete.id);
    }
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">{t.noBookingsFound}</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{t.guest}</TableHead>
              <TableHead>{t.room}</TableHead>
              <TableHead>{t.checkIn}</TableHead>
              <TableHead>{t.checkOut}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead>{t.price}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id.slice(0, 8)}...</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{booking.guestName}</span>
                    <span className="text-xs text-muted-foreground">{booking.guestEmail}</span>
                  </div>
                </TableCell>
                <TableCell>{booking.roomName}</TableCell>
                <TableCell>
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === "confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : booking.status === "pending" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status === "confirmed" ? t.confirmed : 
                     booking.status === "pending" ? t.pending : t.cancelled}
                  </span>
                </TableCell>
                <TableCell>${booking.totalPrice}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewBooking(booking)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditBooking(booking)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Booking
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewGuest(booking)}>
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        {t.viewGuest}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={() => confirmDelete(booking)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Cancel Booking
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action will mark the booking as cancelled.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBooking}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingsTable;
