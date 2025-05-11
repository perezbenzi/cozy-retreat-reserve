
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types";
import { Calendar, User, Clock, Edit, Trash2 } from "lucide-react";

interface BookingItemProps {
  booking: Booking;
  onModify: (bookingId: string) => void;
  onCancel: (bookingId: string) => void;
}

const BookingItem = ({ booking, onModify, onCancel }: BookingItemProps) => {
  return (
    <Card key={booking.id}>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3">
          <img 
            src={booking.roomImage} 
            alt={booking.roomName} 
            className="w-full h-32 sm:h-full object-cover"
          />
        </div>
        <div className="p-4 sm:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{booking.roomName}</h3>
              <span className="text-sm bg-accent/10 text-accent px-2 py-1 rounded">
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
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="font-medium">
              Total: ${booking.totalPrice}
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onModify(booking.id)}
              >
                <Edit className="w-4 h-4 mr-1" /> Modify
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onCancel(booking.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingItem;
