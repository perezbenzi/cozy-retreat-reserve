
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Booking } from "@/types";
import BookingItem from "./BookingItem";
import PastBookingItem from "./PastBookingItem";
import EmptyBookingsState from "./EmptyBookingsState";

interface BookingsTabProps {
  bookings: Booking[];
  type: 'upcoming' | 'past';
  onModify: (bookingId: string) => void;
  onCancel: (bookingId: string) => void;
}

const BookingsTab = ({ bookings, type, onModify, onCancel }: BookingsTabProps) => {
  const isUpcoming = type === 'upcoming';
  const title = isUpcoming ? "Upcoming Bookings" : "Past Bookings";
  const description = isUpcoming 
    ? "Manage your upcoming reservations" 
    : "View your booking history";
  
  const emptyTitle = isUpcoming ? "No upcoming bookings" : "No booking history";
  const emptyDescription = isUpcoming 
    ? "You don't have any upcoming reservations." 
    : "You haven't made any bookings yet.";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {isUpcoming ? (
              bookings.map((booking) => (
                <BookingItem 
                  key={booking.id}
                  booking={booking} 
                  onModify={onModify} 
                  onCancel={onCancel}
                />
              ))
            ) : (
              bookings.map((booking) => (
                <PastBookingItem key={booking.id} booking={booking} />
              ))
            )}
          </div>
        ) : (
          <EmptyBookingsState 
            title={emptyTitle}
            description={emptyDescription}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsTab;
