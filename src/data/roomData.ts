
import { Room, Testimonial, Amenity } from '@/types';

// Room data
export const rooms: Room[] = [
  {
    id: '1',
    name: 'Mixed Dorm',
    type: 'dorm',
    description: 'Our comfortable mixed dorm features 6 custom-built beds with privacy curtains, individual reading lights, and power outlets. Perfect for solo travelers looking to meet new friends.',
    price: 25,
    capacity: 6,
    images: [
      'https://images.unsplash.com/photo-1596194073282-a203a22e14b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvc3RlbCUyMGRvcm18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvc3RlbCUyMGRvcm18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    amenities: ['Locker', 'Reading Light', 'Power Outlet', 'Privacy Curtains', 'Shared Bathroom'],
    availability: [
      { startDate: '2025-05-15', endDate: '2025-05-20' },
      { startDate: '2025-05-22', endDate: '2025-05-30' },
    ]
  },
  {
    id: '2',
    name: 'Female Dorm',
    type: 'dorm',
    description: 'A female-only dorm with 4 beds, providing extra privacy and security. Includes private lockers, reading lights, and access to a female-only bathroom.',
    price: 30,
    capacity: 4,
    images: [
      'https://images.unsplash.com/photo-1630514969818-94aefc42e524?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGhvc3RlbCUyMGRvcm18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvc3RlbCUyMGRvcm18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    amenities: ['Female-Only', 'Locker', 'Reading Light', 'Power Outlet', 'Privacy Curtains', 'Female-Only Bathroom'],
    availability: [
      { startDate: '2025-05-12', endDate: '2025-05-25' },
      { startDate: '2025-05-27', endDate: '2025-06-10' },
    ]
  },
  {
    id: '3',
    name: 'Private Room',
    type: 'private',
    description: 'A cozy private room with a comfortable queen bed, perfect for couples or travelers seeking more privacy. Includes an ensuite bathroom, mini-fridge, and a small desk.',
    price: 70,
    capacity: 2,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG9zdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvc3RlbCUyMHJvb218ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    amenities: ['Queen Bed', 'Ensuite Bathroom', 'Mini-fridge', 'Desk', 'Air Conditioning', 'TV'],
    availability: [
      { startDate: '2025-05-10', endDate: '2025-05-18' },
      { startDate: '2025-05-20', endDate: '2025-05-30' },
    ]
  },
  {
    id: '4',
    name: 'Deluxe Suite',
    type: 'deluxe',
    description: 'Our premium deluxe suite offers ultimate comfort with a king-size bed, spacious living area, and a private balcony overlooking the city. Perfect for extended stays or special occasions.',
    price: 120,
    capacity: 2,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ],
    amenities: ['King Bed', 'Private Balcony', 'Ensuite Bathroom', 'Kitchenette', 'Air Conditioning', 'TV', 'Workspace'],
    availability: [
      { startDate: '2025-05-12', endDate: '2025-05-16' },
      { startDate: '2025-05-18', endDate: '2025-05-25' },
    ]
  },
];

// Testimonial data
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    comment: 'The staff were incredibly friendly and the atmosphere was perfect for meeting other travelers. The beds were comfortable and the common areas were always clean.',
    date: '2025-04-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4,
    comment: 'Great location and excellent value for money. The breakfast was simple but good and the wifi was reliable. Would definitely stay here again!',
    date: '2025-04-10'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 5,
    comment: 'This was my first hostel experience and it exceeded all my expectations. The rooms were clean, the staff was helpful, and I made friends from all over the world.',
    date: '2025-03-22'
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    comment: 'Excellent facilities and a great social atmosphere. The location made it easy to explore the city and the staff gave great recommendations for local spots.',
    date: '2025-03-15'
  },
];

// Amenity data
export const amenities: Amenity[] = [
  {
    id: '1',
    name: 'Free WiFi',
    icon: 'wifi',
    description: 'High-speed wireless internet available throughout the property'
  },
  {
    id: '2',
    name: 'Shared Kitchen',
    icon: 'home',
    description: 'Fully equipped kitchen with all utensils and appliances'
  },
  {
    id: '3',
    name: '24/7 Reception',
    icon: 'user',
    description: 'Our friendly staff is available around the clock to assist you'
  },
  {
    id: '4',
    name: 'Secure Lockers',
    icon: 'lock',
    description: 'Secure storage for your valuables included with every bed'
  },
  {
    id: '5',
    name: 'Common Lounge',
    icon: 'users',
    description: 'Comfortable social space with games and entertainment'
  },
  {
    id: '6',
    name: 'Laundry Facilities',
    icon: 'home',
    description: 'Self-service laundry machines available for guest use'
  }
];

// Gallery images
export const galleryImages = [
  'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590856029826-c7a73142d2ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];

// Mock bookings data
export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: 'user123',
    roomId: '1',
    roomName: 'Mixed Dorm',
    roomImage: 'https://images.unsplash.com/photo-1596194073282-a203a22e14b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvc3RlbCUyMGRvcm18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    checkInDate: '2025-05-15',
    checkOutDate: '2025-05-18',
    numberOfGuests: 1,
    totalPrice: 75,
    status: 'confirmed',
    createdAt: '2025-04-30T14:20:00Z'
  },
  {
    id: '2',
    userId: 'user123',
    roomId: '3',
    roomName: 'Private Room',
    roomImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG9zdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    checkInDate: '2025-06-10',
    checkOutDate: '2025-06-12',
    numberOfGuests: 2,
    totalPrice: 140,
    status: 'pending',
    createdAt: '2025-05-01T10:15:00Z'
  }
];
