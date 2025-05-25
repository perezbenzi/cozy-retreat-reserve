
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
import { useTranslation } from '@/hooks/useTranslation';

const RoomListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roomType, setRoomType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'price-low' | 'price-high'>('price-low');
  const [capacity, setCapacity] = useState<number | null>(null);
  const { t } = useTranslation();
  
  // Ensure all rooms have valid images
  const validatedRooms = rooms.map(room => ({
    ...room,
    images: room.images.map(img => 
      img || "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    )
  }));
  
  // Filter and sort rooms
  const filteredRooms = validatedRooms
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
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">{t.rooms.ourRooms}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.rooms.roomsDescription}
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8 p-6 bg-card rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">{t.rooms.searchAndFilter}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="col-span-1 md:col-span-3 lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t.rooms.searchPlaceholder}
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
                    <SelectValue placeholder={t.rooms.roomType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.rooms.allTypes}</SelectItem>
                    <SelectItem value="dorm">{t.rooms.dormitory}</SelectItem>
                    <SelectItem value="private">{t.rooms.privateRoom}</SelectItem>
                    <SelectItem value="deluxe">{t.rooms.deluxeRoom}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Capacity Filter */}
              <div>
                <Select 
                  value={capacity?.toString() || 'any'} 
                  onValueChange={(value) => setCapacity(value === 'any' ? null : parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.rooms.capacity} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t.rooms.anyCapacity}</SelectItem>
                    <SelectItem value="1">1+ {t.rooms.person}</SelectItem>
                    <SelectItem value="2">2+ {t.rooms.people}</SelectItem>
                    <SelectItem value="4">4+ {t.rooms.people}</SelectItem>
                    <SelectItem value="6">6+ {t.rooms.people}</SelectItem>
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
                    {t.rooms.price}: {sortOrder === 'price-low' ? t.rooms.lowToHigh : t.rooms.highToLow}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {t.rooms.showing} {filteredRooms.length} {filteredRooms.length === 1 ? t.rooms.room : t.rooms.ourRooms.toLowerCase()}
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
              <h3 className="text-lg font-medium mb-2">{t.rooms.noRoomsFound}</h3>
              <p className="text-muted-foreground mb-4">
                {t.rooms.noRoomsDescription}
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setRoomType('all');
                setCapacity(null);
              }}>
                {t.rooms.resetFilters}
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
