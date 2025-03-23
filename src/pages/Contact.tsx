
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
      });
      
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: 'Address',
      details: '123 Main Street, Suite 500\nNew York, NY 10001'
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: 'Phone',
      details: '+1 (555) 123-4567\n+1 (555) 987-6543'
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: 'Email',
      details: 'info@banquethub.com\nsupport@banquethub.com'
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: 'Hours',
      details: 'Monday-Friday: 9AM - 6PM\nWeekends: 10AM - 4PM'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Contact Us</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We'd love to hear from you. Get in touch with our team.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="Booking Inquiry">Booking Inquiry</option>
                      <option value="Venue Information">Venue Information</option>
                      <option value="Partnership">Partnership Opportunity</option>
                      <option value="Support">Customer Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </motion.div>
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((item, index) => (
                    <div key={item.title} className="flex">
                      <div className="mr-4 mt-1">{item.icon}</div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Google Map Placeholder */}
                <div className="rounded-lg overflow-hidden border border-border h-64 bg-black/5">
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-muted-foreground">Map Loading...</p>
                    {/* In a real application, you would embed a Google Map here */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
