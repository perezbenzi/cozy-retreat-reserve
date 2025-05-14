
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  change?: number;
  loading?: boolean;
}

const DashboardCard = ({
  title,
  value,
  icon,
  description,
  change,
  loading = false,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 w-full animate-pulse bg-muted rounded"></div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {(description || change !== undefined) && (
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {description}
                {change !== undefined && (
                  <span
                    className={`ml-1 ${
                      change > 0
                        ? "text-green-500"
                        : change < 0
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {change > 0 ? "+" : ""}
                    {change}%
                  </span>
                )}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
