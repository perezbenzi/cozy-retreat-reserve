import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, User, Home, Clock, Phone, MapPin } from 'lucide-react';
const About = () => {
  return <>
      <Navbar />
      
      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[300px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Hostel common area" className="w-full h-full object-cover brightness-50" />
          </div>
          <div className="container-custom relative z-10 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About TravelStay</h1>
            <p className="text-xl max-w-2xl">
              Creating a home away from home for travelers from around the world since 2015
            </p>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-6">
                  TravelStay was founded in 2015 with a simple mission: to create a place where travelers can feel at home while exploring new destinations.
                </p>
                <p className="text-muted-foreground mb-6">
                  What started as a small 10-bed hostel has now grown into one of the city's most beloved accommodation options, welcoming thousands of guests from over 100 countries each year.
                </p>
                <p className="text-muted-foreground">
                  Our team of passionate travelers understands what makes a great hostel experience, and we're dedicated to providing clean, comfortable, and social spaces that foster connections between guests.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80" alt="TravelStay founders" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at TravelStay
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <User className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-medium text-xl mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We believe in creating spaces that foster connection and friendship between travelers from diverse backgrounds.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Home className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-medium text-xl mb-2">Comfort</h3>
                <p className="text-muted-foreground">
                  Clean, comfortable accommodations that make you feel at home, no matter how far you've traveled.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-medium text-xl mb-2">Local Experience</h3>
                <p className="text-muted-foreground">
                  We help our guests discover authentic local experiences beyond the typical tourist attractions.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-medium text-xl mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We maintain high standards in everything we do, from cleanliness to customer service.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-medium text-xl mb-2">Flexibility</h3>
                <p className="text-muted-foreground">
                  We understand travel plans change, and we strive to be as accommodating as possible.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="text-accent h-6 w-6" />
                </div>
                <h3 className="font-medium text-xl mb-2">Responsiveness</h3>
                <p className="text-muted-foreground">
                  Our staff is always available to help with questions, recommendations, or assistance.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The friendly faces behind TravelStay
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{
              name: "Alex Johnson",
              role: "Founder & Manager",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              bio: "Passionate traveler who has visited over 40 countries."
            }, {
              name: "Maria Garcia",
              role: "Guest Relations",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              bio: "Always ready with local recommendations and a warm smile."
            }, {
              name: "David Kim",
              role: "Facilities Manager",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              bio: "Ensures everything is in perfect working order."
            }, {
              name: "Sarah Chen",
              role: "Events Coordinator",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              bio: "Organizes social activities and local tours for our guests."
            }].map((member, index) => <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover object-center" />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-accent text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Come Stay With Us</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Experience our unique hospitality and make memories that will last a lifetime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/rooms" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base border ">
                  Browse Rooms
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-primary-foreground/70 hover:bg-primary-foreground/20 w-full sm:w-auto text-zinc-950">
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
export default About;