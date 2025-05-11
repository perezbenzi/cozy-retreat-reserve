
import { Card } from "@/components/ui/card";
import { Booking } from "@/types";
import { Calendar, User } from "lucide-react";

interface PastBookingItemProps {
  booking: Booking;
}

const PastBookingItem = ({ booking }: PastBookingItemProps) => {
  return (
    <Card key={booking.id} className="bg-muted/40">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3">
          <img 
            src={booking.roomImage} 
            alt={booking.roomName} 
            className="w-full h-32 sm:h-full object-cover opacity-80"
          />
        </div>
        <div className="p-4 sm:w-2/3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{booking.roomName}</h3>
            <span className={`text-sm px-2 py-1 rounded ${
              booking.status === 'cancelled' 
                ? 'bg-destructive/10 text-destructive' 
                : 'bg-muted'
            }`}>
              {booking.status}
            </span>
          </div>
          
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })} - {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <User className="w-4 h-4 mr-2" />
              <span>Guests: {booking.numberOfGuests}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="font-medium">
              Total: ${booking.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PastBookingItem;
