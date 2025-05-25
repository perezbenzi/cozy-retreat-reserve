
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const AdminSettings = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.admin.settings}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.admin.systemSettings}</CardTitle>
          <CardDescription>
            {t.admin.generalSettings}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t.admin.developmentSection}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
