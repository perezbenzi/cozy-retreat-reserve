
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuración</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
          <CardDescription>
            Administra las configuraciones generales del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección está en desarrollo y tendrá opciones para configurar el sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
