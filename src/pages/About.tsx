
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Shield, Heart, Leaf, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      
      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[300px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt={t.about.title}
              className="w-full h-full object-cover brightness-50" 
            />
          </div>
          <div className="container-custom relative z-10 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.about.title}</h1>
            <p className="text-xl mb-2">{t.about.subtitle}</p>
            <p className="text-lg text-white/90">
              {t.about.description}
            </p>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-4">{t.about.ourStory}</h2>
                <p className="text-muted-foreground mb-6">
                  {t.about.storyDescription}
                </p>
                
                <h3 className="text-2xl font-semibold mb-4">{t.about.ourMission}</h3>
                <p className="text-muted-foreground">
                  {t.about.missionDescription}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80" 
                  alt="Hostel common area" 
                  className="rounded-lg object-cover h-48 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80" 
                  alt="Hostel bedroom" 
                  className="rounded-lg object-cover h-48 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80" 
                  alt="Hostel kitchen" 
                  className="rounded-lg object-cover h-48 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80" 
                  alt="Hostel social area" 
                  className="rounded-lg object-cover h-48 w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.about.whyChooseUs}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.primeLocation}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.primeLocationDesc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.modernFacilities}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.modernFacilitiesDesc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.vibrantCommunity}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.vibrantCommunityDesc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent text-xl font-bold">$</span>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.affordablePrices}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.affordablePricesDesc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent text-lg font-bold">24/7</span>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.support247}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.support247Desc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.safeSecure}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.safeSecureDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.about.meetOurTeam}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.about.teamDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Sarah Johnson", role: t.about.manager, image: "https://images.unsplash.com/photo-1494790108755-2616b612b047?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                { name: "Mike Chen", role: t.about.receptionist, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                { name: "Emma Wilson", role: t.about.coordinator, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
                { name: "Carlos Rodriguez", role: t.about.housekeeping, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
              ].map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-medium text-lg mb-1">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.about.ourValues}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.hospitalityTitle}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.hospitalityDesc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.communityTitle}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.communityDesc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.sustainabilityTitle}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.sustainabilityDesc}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t.about.integrityTitle}</h3>
                  <p className="text-muted-foreground text-sm">{t.about.integrityDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">{t.about.visitUs}</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              {t.about.visitUsDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/rooms" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  {t.home.browseRooms}
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

export default About;
