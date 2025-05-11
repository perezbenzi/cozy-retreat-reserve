
// User type for the authenticated user
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

// Room type for the room listings
export interface Room {
  id: string;
  name: string;
  type: 'dorm' | 'private' | 'deluxe';
  description: string;
  price: number;
  capacity: number;
  images: string[];
  amenities: string[];
  availability: {
    startDate: string;
    endDate: string;
  }[];
}

// Booking type for user bookings
export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

// Testimonial type for customer reviews
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

// Amenity type for hostel amenities
export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}
