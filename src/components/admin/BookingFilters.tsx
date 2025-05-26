
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";

const BookingFilters = () => {
  const { t } = useAdminTranslation();
  const { 
    statusFilter, 
    setStatusFilter, 
    dateFilter, 
    setDateFilter 
  } = useAdminStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate || undefined);
    
    if (selectedDate) {
      setDateFilter({
        start: selectedDate,
        end: selectedDate
      });
    } else {
      setDateFilter({ start: null, end: null });
    }
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDate(undefined);
    setStatusFilter("all");
    setDateFilter({ start: null, end: null });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="w-full sm:w-1/3">
          <div className="relative">
            <Input
              placeholder={t.searchBookings}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          </div>
        </div>
        
        <div className="w-full sm:w-1/4">
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder={t.filterByStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allStatuses}</SelectItem>
              <SelectItem value="confirmed">{t.confirmed}</SelectItem>
              <SelectItem value="pending">{t.pending}</SelectItem>
              <SelectItem value="cancelled">{t.cancelled}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{t.pickDate}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleSearch}>{t.search}</Button>
          <Button variant="outline" onClick={handleClearFilters}>{t.clear}</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
