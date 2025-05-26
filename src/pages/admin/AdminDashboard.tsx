
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@/components/admin/DashboardCard";
import BookingsTable from "@/components/admin/BookingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, User, Hotel } from "lucide-react";
import { BookingWithGuest } from "@/types/admin";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";

const AdminDashboard = () => {
  const { t } = useAdminTranslation();
  
  // Mock queries for dashboard data
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      // In a real application, this would be an API call
      return {
        arrivalsToday: 5,
        departuresToday: 3,
        occupancyRate: 75,
        revenueToday: 1250
      };
    }
  });

  // Mock query for recent bookings
  const { data: recentBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["recentBookings"],
    queryFn: async () => {
      // In a real application, this would be an API call
      return [
        {
          id: "1",
          userId: "user1",
          roomId: "room101",
          roomName: "Deluxe King Room",
          roomImage: "https://images.unsplash.com/photo-1551776235-dde6d482980b?q=80&w=2940&auto=format&fit=crop",
          checkInDate: "2025-05-15",
          checkOutDate: "2025-05-18",
          numberOfGuests: 2,
          totalPrice: 450,
          status: "confirmed" as const,
          createdAt: "2025-05-01",
          guestName: "John Smith",
          guestEmail: "john@example.com",
          guestPhone: "+1234567890"
        },
        {
          id: "2",
          userId: "user2",
          roomId: "room102",
          roomName: "Standard Twin Room",
          roomImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=3174&auto=format&fit=crop",
          checkInDate: "2025-05-20",
          checkOutDate: "2025-05-25",
          numberOfGuests: 2,
          totalPrice: 750,
          status: "pending" as const,
          createdAt: "2025-05-02",
          guestName: "Sarah Johnson",
          guestEmail: "sarah@example.com",
          guestPhone: "+1987654321"
        }
      ] as BookingWithGuest[];
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.dashboard}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title={t.arrivalsToday}
          value={statsLoading ? "..." : stats?.arrivalsToday || 0}
          icon={<User className="h-4 w-4" />}
          loading={statsLoading}
        />
        <DashboardCard
          title={t.departuresToday}
          value={statsLoading ? "..." : stats?.departuresToday || 0}
          icon={<Calendar className="h-4 w-4" />}
          loading={statsLoading}
        />
        <DashboardCard
          title={t.occupancyRate}
          value={statsLoading ? "..." : `${stats?.occupancyRate || 0}%`}
          icon={<Hotel className="h-4 w-4" />}
          loading={statsLoading}
        />
        <DashboardCard
          title={t.revenueToday}
          value={statsLoading ? "..." : `$${stats?.revenueToday || 0}`}
          icon={<DollarSign className="h-4 w-4" />}
          loading={statsLoading}
        />
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">{t.recentBookings}</TabsTrigger>
          <TabsTrigger value="upcoming">{t.upcomingArrivals}</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>{t.recentBookings}</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingsTable
                bookings={recentBookings || []}
                isLoading={bookingsLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>{t.upcomingArrivals}</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingsTable
                bookings={recentBookings?.filter(booking => 
                  booking.status === "confirmed" ||
                  booking.status === "pending"
                ) || []}
                isLoading={bookingsLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
