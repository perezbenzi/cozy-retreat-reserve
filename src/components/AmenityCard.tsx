
import { Amenity } from '@/types';
import { Home, Wifi, User, Lock, Users } from 'lucide-react';

interface AmenityCardProps {
  amenity: Amenity;
}

const AmenityCard = ({ amenity }: AmenityCardProps) => {
  // Map amenity icons to Lucide React icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'wifi':
        return <Wifi className="w-8 h-8" />;
      case 'user':
        return <User className="w-8 h-8" />;
      case 'users':
        return <Users className="w-8 h-8" />;
      case 'lock':
        return <Lock className="w-8 h-8" />;
      case 'home':
      default:
        return <Home className="w-8 h-8" />;
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-md">
      <div className="mb-4 text-accent">{renderIcon(amenity.icon)}</div>
      <h3 className="font-medium text-lg mb-2">{amenity.name}</h3>
      <p className="text-sm text-muted-foreground">{amenity.description}</p>
    </div>
  );
};

export default AmenityCard;
