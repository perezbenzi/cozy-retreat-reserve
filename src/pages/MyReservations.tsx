
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Loader2, Clock, Trash } from "lucide-react";

interface Reservation {
  id: string;
  room_id: string;
  room_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const MyReservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  // Fetch reservations on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setReservations(data || []);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        toast.error('Failed to load reservations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, [user]);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Handle reservation cancellation
  const cancelReservation = async (id: string) => {
    if (!user) return;
    
    setCancelling(id);
    
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update the local state
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === id
            ? { ...reservation, status: 'cancelled' }
            : reservation
        )
      );
      
      toast.success('Reservation cancelled successfully');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      toast.error('Failed to cancel reservation');
    } finally {
      setCancelling(null);
    }
  };

  // Group reservations by status
  const activeReservations = reservations.filter(r => r.status !== 'cancelled');
  const cancelledReservations = reservations.filter(r => r.status === 'cancelled');
  
  return (
    <>
      <Navbar />
      
      <main className="mt-16 py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-semibold mb-8">My Reservations</h1>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : reservations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No reservations found</h3>
                <p className="text-muted-foreground mb-6">You haven't made any reservations yet.</p>
                <Button asChild>
                  <a href="/rooms">Browse Rooms</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Active Reservations */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming & Active Reservations</CardTitle>
                  <CardDescription>Your confirmed and pending reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeReservations.length === 0 ? (
                    <p className="text-center py-6 text-muted-foreground">No active reservations</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Room</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Guests</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activeReservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                              <TableCell className="font-medium">{reservation.room_name}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>
                                    {formatDate(reservation.check_in)} - {formatDate(reservation.check_out)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{reservation.guests}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{reservation.total_price}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={statusColors[reservation.status]}>
                                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" disabled={cancelling === reservation.id}>
                                      {cancelling === reservation.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <>
                                          <Trash className="h-4 w-4 mr-1" /> Cancel
                                        </>
                                      )}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to cancel your reservation at {reservation.room_name}? 
                                        This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => cancelReservation(reservation.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Yes, Cancel Reservation
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Cancelled Reservations */}
              {cancelledReservations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cancelled Reservations</CardTitle>
                    <CardDescription>Your previously cancelled bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Room</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Guests</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Cancelled On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cancelledReservations.map((reservation) => (
                            <TableRow key={reservation.id} className="opacity-60">
                              <TableCell className="font-medium">{reservation.room_name}</TableCell>
                              <TableCell>
                                {formatDate(reservation.check_in)} - {formatDate(reservation.check_out)}
                              </TableCell>
                              <TableCell>{reservation.guests}</TableCell>
                              <TableCell>${reservation.total_price}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{formatDate(reservation.created_at)}</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default MyReservations;
