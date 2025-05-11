import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully. We'll get back to you soon!");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  return <>
      <Navbar />
      
      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[250px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Contact us" className="w-full h-full object-cover brightness-50" />
          </div>
          <div className="container-custom relative z-10 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-2xl">
              Have questions or need assistance? We're here to help!
            </p>
          </div>
        </section>
        
        {/* Contact Info & Form Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Our Location</h3>
                      <p className="text-muted-foreground text-sm">
                        123 Traveler Street<br />
                        Downtown, City 12345<br />
                        Country
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Phone</h3>
                      <p className="text-muted-foreground text-sm">
                        Reception: +1 (555) 123-4567<br />
                        Bookings: +1 (555) 765-4321<br />
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground text-sm">
                        General: info@travelstay.com<br />
                        Reservations: bookings@travelstay.com<br />
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">Hours</h3>
                      <p className="text-muted-foreground text-sm">
                        Reception: 24/7<br />
                        Check-in: 2:00 PM - 11:00 PM<br />
                        Check-out: Before 11:00 AM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium">
                            Your Name
                          </label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium">
                            Email Address
                          </label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help you?" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium">
                          Your Message
                        </label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Please describe your question or request" rows={6} required />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold mb-4">Find Us on the Map</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're conveniently located in the heart of the city, just 5 minutes from Central Station.
              </p>
            </div>
            
            {/* Map placeholder - in a real app, would integrate Google Maps or similar */}
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive map will be integrated here</p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quick answers to common questions about staying with us
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[{
              question: "What are your check-in and check-out times?",
              answer: "Check-in is available from 2:00 PM to 11:00 PM. Check-out is before 11:00 AM. If you need early check-in or late check-out, please contact us in advance."
            }, {
              question: "Do you offer airport transfers?",
              answer: "Yes, we offer airport transfers for an additional fee. Please contact us at least 48 hours before your arrival to arrange this service."
            }, {
              question: "Is breakfast included?",
              answer: "Yes, a complimentary continental breakfast is included with all bookings. It's served from 7:00 AM to 10:00 AM daily."
            }, {
              question: "Do you have a luggage storage service?",
              answer: "Yes, we offer free luggage storage for guests both before check-in and after check-out."
            }, {
              question: "Is there a curfew?",
              answer: "No, there is no curfew. Guests can enter and exit the hostel 24/7 with their keycard."
            }, {
              question: "Do you have private rooms available?",
              answer: "Yes, we offer both dormitory-style rooms and private rooms to suit different preferences and budgets."
            }].map((faq, index) => <Card key={index} className="p-6">
                  <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>)}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>;
};
export default Contact;