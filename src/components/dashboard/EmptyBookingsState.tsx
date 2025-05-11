
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface EmptyBookingsStateProps {
  title: string;
  description: string;
}

const EmptyBookingsState = ({ title, description }: EmptyBookingsStateProps) => {
  return (
    <div className="text-center py-8">
      <Calendar className="w-12 h-12 mx-auto text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-1">
        {description}
      </p>
      <Button className="mt-4">
        Book a Room
      </Button>
    </div>
  );
};

export default EmptyBookingsState;
