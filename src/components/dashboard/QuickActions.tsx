
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";

const QuickActions = () => {
  return (
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
  );
};

export default QuickActions;
