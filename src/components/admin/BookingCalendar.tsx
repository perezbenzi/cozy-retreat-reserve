
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminStore } from "@/stores/adminStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

const BookingCalendar = () => {
  const { currentDate, setCurrentDate } = useAdminStore();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  // Mock bookings data - would come from an API in a real application
  const [bookings] = useState([
    {
      id: "1",
      title: "Room 101",
      start: new Date(2025, 4, 15),
      end: new Date(2025, 4, 18),
      resourceId: "room-101",
      status: "confirmed" as const,
    },
    {
      id: "2",
      title: "Room 102",
      start: new Date(2025, 4, 20),
      end: new Date(2025, 4, 25),
      resourceId: "room-102",
      status: "pending" as const,
    },
  ]);

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between py-2">
        <Button variant="ghost" size="sm" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <h2 className="text-lg font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button variant="ghost" size="sm" onClick={nextMonth}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    let day = startDate;

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center py-2 font-semibold text-sm" key={i}>
          {format(addDays(day, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const dayBookings = bookings.filter(booking => 
          isSameDay(booking.start, day) || 
          isSameDay(booking.end, day) || 
          (booking.start < day && booking.end > day)
        );

        days.push(
          <div
            className={`min-h-[100px] p-1 border ${
              !isSameMonth(day, monthStart)
                ? "bg-muted/20 text-muted-foreground"
                : "bg-background"
            }`}
            key={day.toString()}
          >
            <div className="text-right text-sm p-1">{formattedDate}</div>
            <div className="space-y-1">
              {dayBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`text-xs p-1 rounded truncate ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex-1">{rows}</div>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-full">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
