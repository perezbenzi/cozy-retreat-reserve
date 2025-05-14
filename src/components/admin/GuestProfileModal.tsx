
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/adminStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";
import { GuestProfile } from "@/types/admin";
import { Separator } from "@/components/ui/separator";

interface GuestProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: GuestProfile | null;
  isLoading?: boolean;
}

const GuestProfileModal = ({
  isOpen,
  onClose,
  guest,
  isLoading = false,
}: GuestProfileModalProps) => {
  if (!guest && !isLoading) {
    return null;
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "GU";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`;
  };

  const handleEmailGuest = () => {
    if (guest?.email) {
      window.location.href = `mailto:${guest.email}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Guest Profile</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          guest && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={guest.profileImage} alt={guest.firstName} />
                  <AvatarFallback className="text-lg">
                    {getInitials(guest.firstName, guest.lastName)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2 text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold">
                    {guest.firstName} {guest.lastName}
                  </h2>
                  
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      <Mail className="h-4 w-4" />
                      <span>{guest.email}</span>
                    </div>

                    {guest.phone && (
                      <div className="flex items-center gap-1 justify-center md:justify-start">
                        <Phone className="h-4 w-4" />
                        <span>{guest.phone}</span>
                      </div>
                    )}

                    {guest.nationality && (
                      <div className="flex items-center gap-1 justify-center md:justify-start">
                        <MapPin className="h-4 w-4" />
                        <span>{guest.nationality}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                    <Button onClick={handleEmailGuest}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email Guest
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Stays</p>
                  <p className="text-2xl font-bold">{guest.totalStays}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${guest.totalSpent}</p>
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="info">Information</TabsTrigger>
                  <TabsTrigger value="history">Stay History</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={guest.firstName}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={guest.lastName}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={guest.email}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={guest.phone || ""}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={guest.address || ""}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        value={guest.nationality || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="pt-4">
                  {guest.bookingHistory.length > 0 ? (
                    <div className="space-y-4">
                      {guest.bookingHistory.map((booking) => (
                        <div
                          key={booking.id}
                          className="border rounded-md p-4 space-y-2"
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{booking.roomName}</h3>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {booking.numberOfGuests} guests
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                booking.status === "confirmed" 
                                  ? "bg-green-100 text-green-800" 
                                  : booking.status === "pending" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {booking.status}
                              </span>
                              <p className="font-semibold mt-2">${booking.totalPrice}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      No booking history found for this guest.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GuestProfileModal;
