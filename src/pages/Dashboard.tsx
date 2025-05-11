
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings } from '@/data/roomData';
import { Booking } from '@/types';
import { toast } from "@/components/ui/sonner";
import { 
  Calendar,
  User,
  Key,
  Mail,
  Edit,
  Trash2,
  Clock,
} from 'lucide-react';

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
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-10 h-10 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Full Name</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">john.doe@example.com</p>
                        <p className="text-xs text-muted-foreground">Email</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Key className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">••••••••</p>
                        <p className="text-xs text-muted-foreground">Password</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Edit Profile</Button>
                </CardFooter>
              </Card>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" /> 
                      Book a Room
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" /> 
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Bookings</CardTitle>
                      <CardDescription>
                        Manage your upcoming reservations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {upcomingBookings.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingBookings.map((booking) => (
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
                                        onClick={() => modifyBooking(booking.id)}
                                      >
                                        <Edit className="w-4 h-4 mr-1" /> Modify
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => cancelBooking(booking.id)}
                                      >
                                        <Trash2 className="w-4 h-4 mr-1" /> Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 mx-auto text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No upcoming bookings</h3>
                          <p className="text-muted-foreground mt-1">
                            You don't have any upcoming reservations.
                          </p>
                          <Button className="mt-4">
                            Book a Room
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="past">
                  <Card>
                    <CardHeader>
                      <CardTitle>Past Bookings</CardTitle>
                      <CardDescription>
                        View your booking history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {pastBookings.length > 0 ? (
                        <div className="space-y-4">
                          {pastBookings.map((booking) => (
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
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 mx-auto text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No booking history</h3>
                          <p className="text-muted-foreground mt-1">
                            You haven't made any bookings yet.
                          </p>
                          <Button className="mt-4">
                            Book a Room
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
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
