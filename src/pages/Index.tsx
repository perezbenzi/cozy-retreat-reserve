
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
const Index = () => {
  // Only show 3 featured rooms on homepage
  const featuredRooms = rooms.slice(0, 3);
  return <>
      <Navbar />
      
      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Hostel interior" className="w-full h-full object-cover brightness-50" />
          </div>
          <div className="container-custom relative z-10 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                Experience Comfort & Community
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-white/90">
                Modern, affordable accommodation in the heart of the city. Connect with fellow travelers in our vibrant spaces.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/rooms" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">Browse Rooms</Button>
                </Link>
                <Link to="/booking" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-white/70 hover:bg-white/20 w-full sm:w-auto">
                    Book Now
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
                <h2 className="text-3xl font-semibold mb-4">Welcome to TravelStay</h2>
                <p className="text-muted-foreground mb-4">
                  Located in the heart of the city, TravelStay offers modern, affordable accommodation for travelers seeking both comfort and authentic local experiences.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our hostel is designed to foster connections between travelers from across the globe while providing the perfect home base for your adventures.
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-accent" />
                  <span>Just 5 minutes from Central Station and surrounded by restaurants, cafes, and attractions</span>
                </div>
                <Link to="/about">
                  <Button variant="outline">Learn More About Us</Button>
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
              <h2 className="text-3xl font-semibold mb-4">Our Rooms</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From comfortable shared dormitories to private rooms, we offer accommodation options to suit every traveler's needs and budget.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRooms.map(room => <RoomCard key={room.id} room={room} />)}
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/rooms">
                <Button variant="outline">View All Rooms</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Amenities Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Hostel Amenities</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Enjoy our range of amenities designed to make your stay comfortable, convenient, and social.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map(amenity => <AmenityCard key={amenity.id} amenity={amenity} />)}
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Photo Gallery</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Take a visual tour through our hostel spaces, rooms, and common areas.
              </p>
            </div>
            
            <Gallery images={galleryImages} />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Guest Reviews</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Read what our guests have to say about their experiences staying with us.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map(testimonial => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}
            </div>
          </div>
        </section>
        
        {/* Location Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Our Location</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Perfectly situated in the heart of the city, with easy access to public transport, restaurants, and attractions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden h-80 bg-muted">
                {/* Map placeholder - will be replaced with an actual map */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Map integration will be added via Supabase
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium mb-4">How to Find Us</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      123 Traveler Street, Downtown<br />
                      City 12345, Country
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Public Transport</h4>
                    <p className="text-muted-foreground">
                      5 minutes walk from Central Station<br />
                      Bus stops: Lines 10, 32, 45 (City Central stop)
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">From the Airport</h4>
                    <p className="text-muted-foreground">
                      Take the Airport Express to Central Station, then a 5-minute walk<br />
                      Taxi: Approximately 30 minutes (25km)
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/contact">
                    <Button>Contact Us for Directions</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Book Your Stay?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Experience our welcoming atmosphere, comfortable accommodation, and make memories with travelers from around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Now
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/20 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>;
};
export default Index;
