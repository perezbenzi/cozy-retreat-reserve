
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { useAdminTranslation } from "@/hooks/useAdminTranslation";
import { Languages } from "lucide-react";

const AdminSettings = () => {
  const { t, adminLanguage, setAdminLanguage, availableLanguages } = useAdminTranslation();
  
  const handleLanguageChange = (newLanguage: 'en' | 'es') => {
    setAdminLanguage(newLanguage);
    toast.success(t.languageUpdated);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.settings}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            {t.languageSettings}
          </CardTitle>
          <CardDescription>
            {t.adminLanguageDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-language">{t.adminLanguage}</Label>
            <Select value={adminLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger id="admin-language" className="w-full max-w-xs">
                <SelectValue placeholder={t.selectLanguage} />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.systemSettings}</CardTitle>
          <CardDescription>
            {t.generalSettings}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t.developmentSection}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
