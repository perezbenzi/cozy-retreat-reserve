
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoomCard from '@/components/RoomCard';
import { rooms } from '@/data/roomData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Search, ArrowDownUp } from 'lucide-react';

const RoomListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roomType, setRoomType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'price-low' | 'price-high'>('price-low');
  const [capacity, setCapacity] = useState<number | null>(null);
  
  // Filter and sort rooms
  const filteredRooms = rooms
    .filter(room => {
      // Filter by search query
      if (searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !room.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by room type
      if (roomType !== 'all' && room.type !== roomType) {
        return false;
      }
      
      // Filter by capacity
      if (capacity && room.capacity < capacity) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'price-low') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  
  return (
    <>
      <Navbar />
      
      <main className="mt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Our Rooms</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect accommodation that suits your needs, from comfortable dormitories to private rooms.
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8 p-6 bg-card rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Search & Filter</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="col-span-1 md:col-span-3 lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search rooms by name or features..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Room Type Filter */}
              <div>
                <Select 
                  value={roomType} 
                  onValueChange={(value) => setRoomType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="dorm">Dormitory</SelectItem>
                    <SelectItem value="private">Private Room</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Capacity Filter */}
              <div>
                <Select 
                  value={capacity?.toString() || ''} 
                  onValueChange={(value) => setCapacity(value ? parseInt(value) : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Capacity</SelectItem>
                    <SelectItem value="1">1+ Person</SelectItem>
                    <SelectItem value="2">2+ People</SelectItem>
                    <SelectItem value="4">4+ People</SelectItem>
                    <SelectItem value="6">6+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort Order */}
              <div>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => setSortOrder(sortOrder === 'price-low' ? 'price-high' : 'price-low')}
                >
                  <span className="flex items-center">
                    <ArrowDownUp className="w-4 h-4 mr-2" />
                    Price: {sortOrder === 'price-low' ? 'Low to High' : 'High to Low'}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}
            </p>
          </div>
          
          {/* Room Listings */}
          {filteredRooms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No rooms match your search criteria</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search term to find available rooms.
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setRoomType('all');
                setCapacity(null);
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default RoomListing;
