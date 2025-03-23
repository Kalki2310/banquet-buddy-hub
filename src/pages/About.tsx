import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'With over 15 years in event management, Sarah founded BanquetHub with a vision to revolutionize the banquet booking experience.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'David Chen',
      role: 'Operations Director',
      bio: 'David ensures our venues and services exceed expectations, focusing on operational excellence and customer satisfaction.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Event Planning Manager',
      bio: "Emily's creative approach to event planning has helped hundreds of clients create unforgettable experiences.",
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Michael Washington',
      role: 'Client Relations',
      bio: "Michael's dedication to client satisfaction ensures that every customer receives personalized attention and care.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80'
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About BanquetHub</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Creating memorable experiences through exceptional venues and service
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-lg">
                  <p>
                    BanquetHub began in 2018 with a simple idea: make booking venues for special occasions as seamless and stress-free as possible.
                  </p>
                  <p>
                    After experiencing the challenges of finding and booking the perfect venue firsthand, our founder Sarah Johnson assembled a team of event planning professionals and tech experts to create a platform that would revolutionize the industry.
                  </p>
                  <p>
                    What started as a small startup with just five venue partners has grown into a comprehensive platform featuring hundreds of premium venues across the country, serving thousands of satisfied customers.
                  </p>
                  <p>
                    Our mission remains unchanged: to connect people with extraordinary venues and services that make their special occasions truly memorable.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80" 
                  alt="BanquetHub team" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Our Values
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Excellence',
                  description: 'We are committed to excellence in every aspect of our service, from the venues we partner with to the support we provide.'
                },
                {
                  title: 'Innovation',
                  description: 'We continuously innovate our platform and services to provide the best possible experience for our clients.'
                },
                {
                  title: 'Integrity',
                  description: 'We operate with honesty, transparency, and ethical practices in all our dealings with clients and partners.'
                },
                {
                  title: 'Customer Focus',
                  description: 'Our clients are at the center of everything we do, and their satisfaction is our highest priority.'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-card rounded-lg border border-border shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Meet Our Team
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
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

export default About;
