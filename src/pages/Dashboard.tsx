
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings } from '@/data/roomData';
import { Booking } from '@/types';
import { toast } from "@/components/ui/sonner";

// Import refactored components
import UserProfile from '@/components/dashboard/UserProfile';
import QuickActions from '@/components/dashboard/QuickActions';
import BookingsTab from '@/components/dashboard/BookingsTab';

const Dashboard = () => {
  const [userBookings] = useState<Booking[]>(mockBookings);
  
  const cancelBooking = (bookingId: string) => {
    toast.info(`This is a demo. Booking ${bookingId} would be cancelled here.`);
  };
  
  const modifyBooking = (bookingId: string) => {
    toast.info(`This is a demo. Booking ${bookingId} would be modified here.`);
  };
  
  // Filter bookings by status
  const upcomingBookings = userBookings.filter(
    booking => new Date(booking.checkInDate) > new Date() && booking.status !== 'cancelled'
  );
  
  const pastBookings = userBookings.filter(
    booking => new Date(booking.checkOutDate) < new Date() || booking.status === 'cancelled'
  );
  
  return (
    <>
      <Navbar />
      
      <main className="mt-16 py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-semibold mb-8">My Dashboard</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar - User Info */}
            <div className="md:col-span-1">
              <UserProfile />
              
              <div className="mt-6">
                <QuickActions />
              </div>
            </div>
            
            {/* Main Content - Bookings */}
            <div className="md:col-span-2">
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                  <TabsTrigger value="past">Past Bookings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <BookingsTab 
                    bookings={upcomingBookings}
                    type="upcoming"
                    onModify={modifyBooking}
                    onCancel={cancelBooking}
                  />
                </TabsContent>
                
                <TabsContent value="past">
                  <BookingsTab 
                    bookings={pastBookings}
                    type="past"
                    onModify={modifyBooking}
                    onCancel={cancelBooking}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Dashboard;
