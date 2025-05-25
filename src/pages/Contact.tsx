
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
      toast.success(t.contact.messageSent);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      
      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[250px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt={t.contact.title}
              className="w-full h-full object-cover brightness-50" 
            />
          </div>
          <div className="container-custom relative z-10 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.contact.title}</h1>
            <p className="text-xl max-w-2xl">
              {t.contact.subtitle}
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
                      <h3 className="font-medium text-lg mb-2">{t.contact.ourLocation}</h3>
                      <p className="text-muted-foreground text-sm whitespace-pre-line">
                        {t.contact.address}
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
                      <h3 className="font-medium text-lg mb-2">{t.contact.phone}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t.contact.receptionPhone}<br />
                        {t.contact.bookingsPhone}<br />
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
                      <h3 className="font-medium text-lg mb-2">{t.contact.email}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t.contact.generalEmail}<br />
                        {t.contact.reservationsEmail}<br />
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
                      <h3 className="font-medium text-lg mb-2">{t.contact.hours}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t.contact.reception247}<br />
                        {t.contact.checkInHours}<br />
                        {t.contact.checkOutHours}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">{t.contact.sendMessage}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-medium">
                            {t.contact.yourName}
                          </label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="John Doe" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-medium">
                            {t.contact.emailAddress}
                          </label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="john@example.com" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium">
                          {t.contact.subject}
                        </label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange} 
                          placeholder={t.contact.subjectPlaceholder}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium">
                          {t.contact.yourMessage}
                        </label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          placeholder={t.contact.messagePlaceholder}
                          rows={6} 
                          required 
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? t.contact.sending : t.contact.sendMessage}
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
              <h2 className="text-3xl font-semibold mb-4">{t.contact.findUsOnMap}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.contact.mapDescription}
              </p>
            </div>
            
            {/* Map placeholder - in a real app, would integrate Google Maps or similar */}
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">{t.contact.mapPlaceholder}</p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">{t.contact.faq}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.contact.faqDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { question: t.contact.checkInQuestion, answer: t.contact.checkInAnswer },
                { question: t.contact.transferQuestion, answer: t.contact.transferAnswer },
                { question: t.contact.breakfastQuestion, answer: t.contact.breakfastAnswer },
                { question: t.contact.luggageQuestion, answer: t.contact.luggageAnswer },
                { question: t.contact.curfewQuestion, answer: t.contact.curfewAnswer },
                { question: t.contact.privateRoomsQuestion, answer: t.contact.privateRoomsAnswer }
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
