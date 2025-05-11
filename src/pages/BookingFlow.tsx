
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { 
  CalendarIcon, 
  User,
  CheckCircle2,
  CreditCard,
  Loader2
} from 'lucide-react';
import { rooms } from '@/data/roomData';
import { format } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const BookingFlow = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const selectedRoom = rooms.find(room => room.id === roomId);
  const { user } = useAuth();
  
  // Booking steps
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState('1');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  
  // Fetch unavailable dates for this room
  useEffect(() => {
    if (!roomId) return;
    
    const fetchUnavailableDates = async () => {
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('check_in, check_out')
          .eq('room_id', roomId)
          .eq('status', 'confirmed');
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Convert reservation dates to array of unavailable dates
          const blockedDates: Date[] = [];
          
          data.forEach(reservation => {
            const checkIn = new Date(reservation.check_in);
            const checkOut = new Date(reservation.check_out);
            
            // Block all dates between check-in and check-out
            const currentDate = new Date(checkIn);
            while (currentDate <= checkOut) {
              blockedDates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
          });
          
          setUnavailableDates(blockedDates);
        }
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
        toast.error('Failed to load availability data');
      }
    };
    
    fetchUnavailableDates();
  }, [roomId]);
  
  // Calculate total nights and price
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return nights * (selectedRoom?.price || 0);
  };
  
  // Check if a date is already booked
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      unavailableDate.getDate() === date.getDate() &&
      unavailableDate.getMonth() === date.getMonth() &&
      unavailableDate.getFullYear() === date.getFullYear()
    );
  };
  
  // Handle next step
  const nextStep = () => {
    if (currentStep === 1) {
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select both check-in and check-out dates");
        return;
      }
      
      if (checkInDate >= checkOutDate) {
        toast.error("Check-out date must be after check-in date");
        return;
      }
      
      // For demo purposes, we'll just proceed to the next step
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!firstName || !lastName || !email || !phone) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      // For demo purposes, we'll just proceed to the next step
      setCurrentStep(3);
    }
  };
  
  // Handle booking confirmation
  const confirmBooking = async () => {
    if (!user || !selectedRoom || !checkInDate || !checkOutDate) {
      toast.error("Missing required information");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format dates in ISO format for DB storage
      const checkIn = checkInDate.toISOString().split('T')[0];
      const checkOut = checkOutDate.toISOString().split('T')[0];
      
      // Create reservation in Supabase
      const { data, error } = await supabase
        .from('reservations')
        .insert({
          user_id: user.id,
          room_id: selectedRoom.id,
          room_name: selectedRoom.name,
          check_in: checkIn,
          check_out: checkOut,
          guests: parseInt(guests),
          total_price: calculateTotalPrice(),
          status: 'confirmed'
        })
        .select();
      
      if (error) throw error;
      
      toast.success("Booking confirmed successfully!");
      setTimeout(() => {
        navigate('/reservations');
      }, 1500);
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Pre-populate user data from Supabase profile if available
  useEffect(() => {
    if (!user) return;
    
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          if (data.first_name) setFirstName(data.first_name);
          if (data.last_name) setLastName(data.last_name);
        }
        
        // Always set email from auth
        if (user.email) setEmail(user.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  if (!selectedRoom) {
    return (
      <>
        <Navbar />
        <main className="mt-16 py-12">
          <div className="container-custom">
            <div className="text-center py-12">
              <h1 className="text-3xl font-semibold mb-4">Room Not Found</h1>
              <p className="text-muted-foreground mb-6">
                Sorry, the room you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate('/rooms')}>
                View All Rooms
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <main className="mt-16 py-12 bg-secondary/30">
        <div className="container-custom max-w-5xl">
          <h1 className="text-3xl font-semibold mb-6 text-center">Book Your Stay</h1>
          
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-accent text-accent-foreground' : 'bg-secondary border border-muted-foreground/30 text-muted-foreground'
                }`}>
                  1
                </div>
                <div className={`h-1 w-12 md:w-24 ${
                  currentStep >= 2 ? 'bg-accent' : 'bg-secondary'
                }`}></div>
              </div>
              
              <div className="flex items-center">
                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-accent text-accent-foreground' : 'bg-secondary border border-muted-foreground/30 text-muted-foreground'
                }`}>
                  2
                </div>
                <div className={`h-1 w-12 md:w-24 ${
                  currentStep >= 3 ? 'bg-accent' : 'bg-secondary'
                }`}></div>
              </div>
              
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep >= 3 ? 'bg-accent text-accent-foreground' : 'bg-secondary border border-muted-foreground/30 text-muted-foreground'
              }`}>
                3
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-sm">
              <div className={`${currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'} text-center w-1/3`}>
                Dates
              </div>
              <div className={`${currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'} text-center w-1/3`}>
                Details
              </div>
              <div className={`${currentStep >= 3 ? 'text-foreground' : 'text-muted-foreground'} text-center w-1/3`}>
                Confirmation
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-12 gap-6">
            {/* Main Booking Form */}
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1 && "Select Dates"}
                    {currentStep === 2 && "Guest Information"}
                    {currentStep === 3 && "Confirm Your Booking"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Choose your check-in and check-out dates"}
                    {currentStep === 2 && "Fill in your personal details"}
                    {currentStep === 3 && "Review and confirm your reservation"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Step 1: Date Selection */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="check-in">Check-in Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkInDate ? (
                                  format(checkInDate, "MMMM dd, yyyy")
                                ) : (
                                  <span>Select date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                              <Calendar
                                mode="single"
                                selected={checkInDate}
                                onSelect={setCheckInDate}
                                disabled={(date) => {
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  return date < today || isDateUnavailable(date);
                                }}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="check-out">Check-out Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOutDate ? (
                                  format(checkOutDate, "MMMM dd, yyyy")
                                ) : (
                                  <span>Select date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                              <Calendar
                                mode="single"
                                selected={checkOutDate}
                                onSelect={setCheckOutDate}
                                disabled={(date) => {
                                  // Disable dates before selected check-in date
                                  // or dates that are already booked
                                  return date < (checkInDate || new Date()) || 
                                         isDateUnavailable(date);
                                }}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger id="guests">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(selectedRoom.capacity)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Guest Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests (optional)</Label>
                        <textarea
                          id="specialRequests"
                          className="w-full min-h-[100px] p-2 border rounded-md"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Confirmation */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Booking Summary</h3>
                        
                        <div className="bg-muted p-4 rounded-md space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Room:</span>
                            <span className="font-medium">{selectedRoom.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Check-in:</span>
                            <span>{checkInDate?.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Check-out:</span>
                            <span>{checkOutDate?.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Guests:</span>
                            <span>{guests}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nights:</span>
                            <span>{calculateNights()}</span>
                          </div>
                          <div className="flex justify-between font-medium border-t pt-2">
                            <span>Total Price:</span>
                            <span>${calculateTotalPrice()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Guest Information</h3>
                        
                        <div className="bg-muted p-4 rounded-md space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span>{firstName} {lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span>{email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone:</span>
                            <span>{phone}</span>
                          </div>
                          {specialRequests && (
                            <div>
                              <span className="text-muted-foreground">Special Requests:</span>
                              <p className="mt-1">{specialRequests}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          By clicking "Confirm Booking", you agree to our terms and conditions and privacy policy.
                        </p>
                        
                        <div className="flex items-center">
                          <CheckCircle2 className="text-accent mr-2 h-5 w-5" />
                          <span className="text-sm">
                            Your booking will be confirmed instantly.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {currentStep > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(currentStep - 1)}
                      disabled={isSubmitting}
                    >
                      Back
                    </Button>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button onClick={nextStep}>
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      onClick={confirmBooking} 
                      className="bg-accent hover:bg-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Confirm Booking
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
            
            {/* Summary Card */}
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[4/3] rounded-md overflow-hidden">
                    <img 
                      src={selectedRoom.images[0]} 
                      alt={selectedRoom.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-medium text-lg">{selectedRoom.name}</h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {selectedRoom.description}
                  </p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Capacity: {selectedRoom.capacity} {selectedRoom.capacity === 1 ? 'person' : 'people'}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Price per night</span>
                      <span className="font-medium">${selectedRoom.price}</span>
                    </div>
                    
                    {checkInDate && checkOutDate && (
                      <>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Nights</span>
                          <span>{calculateNights()}</span>
                        </div>
                        
                        <div className="flex justify-between pt-2 border-t font-medium">
                          <span>Total</span>
                          <span>${calculateTotalPrice()}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BookingFlow;
