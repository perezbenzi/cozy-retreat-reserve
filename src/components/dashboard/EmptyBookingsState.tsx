
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyBookingsStateProps {
  title: string;
  description: string;
}

const EmptyBookingsState = ({ title, description }: EmptyBookingsStateProps) => {
  return (
    <div className="text-center py-12">
      <Calendar className="w-16 h-16 mx-auto text-muted-foreground" />
      <h3 className="mt-6 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground mt-2 mb-6">
        {description}
      </p>
      <Button asChild>
        <Link to="/rooms">Book a Room</Link>
      </Button>
    </div>
  );
};

export default EmptyBookingsState;
