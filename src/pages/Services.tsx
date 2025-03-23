
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Services = () => {
  const services = [
    {
      title: 'Event Planning',
      description: 'Let our experienced team handle your event from start to finish.',
      features: [
        'Professional event coordinators',
        'Custom event design',
        'Vendor coordination',
        'Timeline management',
        'On-site event supervision'
      ],
      price: 'From $1,500',
      popular: true
    },
    {
      title: 'Catering',
      description: 'Exceptional cuisine tailored to your taste and preferences.',
      features: [
        'Customizable menu options',
        'Dietary accommodations',
        'Professional service staff',
        'Full bar services',
        'Elegant presentation'
      ],
      price: 'From $45 per person',
      popular: false
    },
    {
      title: 'Decor & Design',
      description: 'Transform your venue with our creative decoration services.',
      features: [
        'Theme development',
        'Floral arrangements',
        'Lighting design',
        'Table settings',
        'Custom installations'
      ],
      price: 'From $2,000',
      popular: false
    },
    {
      title: 'Full-Service Package',
      description: 'Our comprehensive service for a stress-free event experience.',
      features: [
        'Complete event planning',
        'Premium catering options',
        'Custom decoration & design',
        'Entertainment coordination',
        'Photography & videography'
      ],
      price: 'From $10,000',
      popular: false
    }
  ];

  const additionalServices = [
    {
      title: 'Entertainment',
      description: 'From DJs to live bands, we provide a range of entertainment options for your event.'
    },
    {
      title: 'Photography & Videography',
      description: 'Professional photographers and videographers to capture your special moments.'
    },
    {
      title: 'Transportation',
      description: 'Luxury transportation services for you and your guests.'
    },
    {
      title: 'Accommodation',
      description: 'Special rates at partner hotels for out-of-town guests.'
    },
    {
      title: 'Specialty Rentals',
      description: 'Unique props, furniture, and decor items to enhance your event.'
    },
    {
      title: 'Custom Services',
      description: "Can't find what you need? Contact us for custom services tailored to your requirements."
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Services</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Exceptional event services to make your special occasion memorable
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-lg border shadow-sm overflow-hidden ${
                    service.popular ? 'border-primary' : 'border-border'
                  }`}
                >
                  {service.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="text-2xl font-bold mb-4">{service.price}</div>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-2 rounded-md ${
                      service.popular 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    }`}>
                      Select Package
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Additional Services */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-card rounded-lg border border-border shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
