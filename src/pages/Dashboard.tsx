import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings } from '@/data/roomData';
import { Booking } from '@/types';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from '@/hooks/useTranslation';

// Import refactored components
import UserProfile from '@/components/dashboard/UserProfile';
import QuickActions from '@/components/dashboard/QuickActions';
import BookingsTab from '@/components/dashboard/BookingsTab';

const Dashboard = () => {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin, adminLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Redirect admins to admin dashboard
  useEffect(() => {
    if (!adminLoading && isAdmin === true) {
      console.log("Dashboard: User is admin, redirecting to admin dashboard");
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, adminLoading, navigate]);

  // Don't render if user is admin (will be redirected)
  if (!adminLoading && isAdmin === true) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Fetch user bookings from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      
      try {
        console.log("Fetching bookings for user:", user.id);
        const { data, error } = await supabase
          .from('reservations')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) {
          console.error("Error fetching bookings:", error);
          toast.error("Failed to load your bookings");
          // Fallback to mock data if there's an error
          setUserBookings(mockBookings);
        } else if (data) {
          console.log("Bookings data from Supabase:", data);
          // Transform Supabase data to match our Booking type
          const formattedBookings: Booking[] = data.map(booking => ({
            id: booking.id,
            roomId: booking.room_id,
            roomName: booking.room_name,
            roomImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Default image
            userId: booking.user_id,
            checkInDate: booking.check_in,
            checkOutDate: booking.check_out,
            numberOfGuests: booking.guests,
            totalPrice: booking.total_price,
            status: validateBookingStatus(booking.status),
            createdAt: booking.created_at,
          }));
          setUserBookings(formattedBookings);
        } else {
          // If no data, use mock data
          setUserBookings(mockBookings);
        }
      } catch (error) {
        console.error("Error in booking fetch:", error);
        // Fallback to mock data
        setUserBookings(mockBookings);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);
  
  // Helper function to validate booking status
  const validateBookingStatus = (status: string): "confirmed" | "pending" | "cancelled" => {
    if (status === "confirmed" || status === "pending" || status === "cancelled") {
      return status as "confirmed" | "pending" | "cancelled";
    }
    // Default to "confirmed" if an invalid status is provided
    return "confirmed";
  };
  
  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
        
      if (error) {
        toast.error("Failed to cancel booking");
        console.error("Error cancelling booking:", error);
        return;
      }
      
      // Update local state
      setUserBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' } 
            : booking
        )
      );
      
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error in cancel booking:", error);
    }
  };
  
  const modifyBooking = (bookingId: string) => {
    toast.info(`This is a demo. Booking ${bookingId} would be modified here.`);
  };
  
  // Fix the filtering logic for upcoming bookings
  // A booking is upcoming if: 
  // 1. The check-out date is in the future (not just check-in)
  // 2. AND it's not cancelled
  const upcomingBookings = userBookings.filter(
    booking => 
      new Date(booking.checkOutDate) >= new Date() && 
      booking.status !== 'cancelled'
  );
  
  // Past bookings are either already completed or cancelled
  const pastBookings = userBookings.filter(
    booking => 
      new Date(booking.checkOutDate) < new Date() || 
      booking.status === 'cancelled'
  );
  
  console.log("All bookings:", userBookings);
  console.log("Upcoming bookings:", upcomingBookings);
  console.log("Past bookings:", pastBookings);
  
  return (
    <>
      <Navbar />
      
      <main className="mt-16 py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-semibold mb-8">{t.dashboard.myDashboard}</h1>
          
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
                  <TabsTrigger value="upcoming">{t.dashboard.upcomingBookings}</TabsTrigger>
                  <TabsTrigger value="past">{t.dashboard.pastBookings}</TabsTrigger>
                </TabsList>
                
                {isLoading ? (
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">{t.dashboard.loadingBookings}</p>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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
