
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '@/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={room.images[currentImageIndex]} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        
        {room.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-primary hover:bg-background/90"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-primary hover:bg-background/90"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
          {room.type === 'dorm' ? 'Dormitory' : room.type === 'private' ? 'Private Room' : 'Deluxe Room'}
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-lg">{room.name}</h3>
          <div className="flex items-center">
            <span className="font-semibold text-lg">${room.price}</span>
            <span className="text-xs text-muted-foreground ml-1">/night</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {room.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index} 
              className="text-xs bg-secondary px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs bg-secondary px-2 py-1 rounded">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <Link to={`/booking/${room.id}`} className="w-full">
          <Button className="w-full">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
