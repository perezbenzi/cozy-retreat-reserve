
import { useState } from 'react';
import { MoreHorizontal, Eye, Edit, X, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminReservation } from "@/types/admin";
import { updateReservationStatus } from "@/services/adminReservationsService";
import { toast } from "@/components/ui/sonner";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";

interface BookingsTableProps {
  bookings: AdminReservation[];
  isLoading?: boolean;
  onBookingUpdate?: () => void;
}

const BookingsTable = ({ bookings, isLoading, onBookingUpdate }: BookingsTableProps) => {
  const { t } = useAdminTranslation();
  const [updatingBookings, setUpdatingBookings] = useState<Set<string>>(new Set());

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleViewBooking = (booking: AdminReservation) => {
    // TODO: Implement booking details modal
    toast.info(`Viewing booking ${booking.id.substring(0, 8)}...`);
    console.log('Viewing booking:', booking);
  };

  const handleEditBooking = (booking: AdminReservation) => {
    // TODO: Implement booking edit functionality
    toast.info(`Editing booking ${booking.id.substring(0, 8)}...`);
    console.log('Editing booking:', booking);
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setUpdatingBookings(prev => new Set(prev).add(bookingId));
    
    try {
      await updateReservationStatus(bookingId, newStatus);
      toast.success(`Booking status updated to ${newStatus}`);
      onBookingUpdate?.();
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    } finally {
      setUpdatingBookings(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookingId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading bookings...</span>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No bookings found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={booking.guest_avatar || undefined} />
                    <AvatarFallback>
                      {booking.guest_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{booking.guest_name}</div>
                    <div className="text-sm text-muted-foreground">{booking.guest_email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{booking.room_name}</div>
                <div className="text-sm text-muted-foreground">
                  ID: {booking.id.substring(0, 8)}...
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{formatDate(booking.check_in)}</div>
                  <div className="text-muted-foreground">to {formatDate(booking.check_out)}</div>
                </div>
              </TableCell>
              <TableCell>{booking.guests}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                ${booking.total_price}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewBooking(booking)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditBooking(booking)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Booking
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {booking.status !== 'confirmed' && (
                      <DropdownMenuItem 
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        disabled={updatingBookings.has(booking.id)}
                      >
                        {updatingBookings.has(booking.id) ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        Confirm
                      </DropdownMenuItem>
                    )}
                    {booking.status !== 'cancelled' && (
                      <DropdownMenuItem 
                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                        disabled={updatingBookings.has(booking.id)}
                        className="text-destructive"
                      >
                        {updatingBookings.has(booking.id) ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <X className="mr-2 h-4 w-4" />
                        )}
                        Cancel
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
