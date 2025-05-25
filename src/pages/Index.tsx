
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import RoomCard from '@/components/RoomCard';
import TestimonialCard from '@/components/TestimonialCard';
import AmenityCard from '@/components/AmenityCard';
import { rooms, testimonials, amenities, galleryImages } from '@/data/roomData';
import { MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Index = () => {
  const { t } = useTranslation();
  // Only show 3 featured rooms on homepage
  const featuredRooms = rooms.slice(0, 3);

  return (
    <>
      <Navbar />
      
      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Hostel interior" 
              className="w-full h-full object-cover brightness-50" 
            />
          </div>
          <div className="container-custom relative z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                {t.home.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-white/90">
                {t.home.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/rooms" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">{t.home.browseRooms}</Button>
                </Link>
                <Link to="/booking" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-white/70 hover:bg-white/20 w-full sm:w-auto text-zinc-950">
                    {t.home.bookNow}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-4">{t.home.welcomeTitle}</h2>
                <p className="text-muted-foreground mb-4">
                  {t.home.welcomeDescription1}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t.home.welcomeDescription2}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-accent" />
                  <span>{t.home.locationInfo}</span>
                </div>
                <Link to="/about">
                  <Button variant="outline">{t.home.learnMore}</Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80" alt="Hostel common area" className="rounded-lg object-cover h-48 w-full" />
                <img src="https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80" alt="Hostel bedroom" className="rounded-lg object-cover h-48 w-full" />
                <img src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80" alt="Hostel kitchen" className="rounded-lg object-cover h-48 w-full" />
                <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1287&q=80" alt="Hostel social area" className="rounded-lg object-cover h-48 w-full" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Rooms Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.home.featuredRoomsTitle}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t.home.featuredRoomsDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/rooms">
                <Button variant="outline">{t.home.viewAllRooms}</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Amenities Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.home.amenitiesTitle}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t.home.amenitiesDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map((amenity) => (
                <AmenityCard key={amenity.id} amenity={amenity} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.home.galleryTitle}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t.home.galleryDescription}
              </p>
            </div>
            
            <Gallery images={galleryImages} />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.home.testimonialsTitle}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t.home.testimonialsDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Location Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.home.locationTitle}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t.home.locationDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden h-80 bg-muted">
                {/* Map placeholder - will be replaced with an actual map */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    {t.home.mapPlaceholder}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4 text-xl">{t.home.howToFindUs}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1 text-base">{t.home.addressLabel}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t.home.addressText}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1 text-base">{t.home.publicTransport}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t.home.publicTransportText}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1 text-base">{t.home.fromAirport}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t.home.fromAirportText}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/contact">
                    <Button>{t.home.contactForDirections}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">{t.home.readyToBook}</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              {t.home.readyToBookDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto border">
                  {t.home.bookNow}
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-primary-foreground/70 hover:bg-primary-foreground/20 w-full sm:w-auto text-zinc-950">
                  {t.nav.contact}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
