// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  Shield, 
  Users, 
  Target, 
  Star, 
  TrendingUp,
  CheckCircle,
  Heart,
  Globe,
  Award,
  Building,
  MapPin
} from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { HoverCard } from "@/components/animations/HoverCard";
import Link from "next/link";

const stats = [
  { label: "Properties Listed", value: "2,500+", icon: <Home className="h-5 w-5" /> },
  { label: "Happy Tenants", value: "15,000+", icon: <Users className="h-5 w-5" /> },
  { label: "Verified Landlords", value: "800+", icon: <Shield className="h-5 w-5" /> },
  { label: "Cities Covered", value: "25+", icon: <MapPin className="h-5 w-5" /> },
];

const values = [
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Trust & Safety",
    description: "Every property and landlord is thoroughly verified for your peace of mind."
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Customer First",
    description: "Your satisfaction drives everything we do. We're here to make renting easy."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Nationwide Reach",
    description: "From Lagos to Abuja, we connect you with properties across Nigeria."
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Excellence",
    description: "We maintain high standards in everything from listings to customer service."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    description: "15+ years in real estate"
  },
  {
    name: "David Okonkwo",
    role: "CTO",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    description: "Tech innovation expert"
  },
  {
    name: "Chioma Nwosu",
    role: "Head of Operations",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma",
    description: "Property management specialist"
  },
  {
    name: "James Adeyemi",
    role: "Customer Success",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    description: "10+ years customer service"
  }
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900 opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Since 2023</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Redefining <span className="text-primary">Rental</span> Experience in Nigeria
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  EnieRent is more than just a property platform. We're a community 
                  dedicated to making renting simple, safe, and stress-free for everyone.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/properties">
                      Browse Properties
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HoverCard>
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-secondary/10">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Our Journey</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Our Story: Building Trust in Nigerian Real Estate</h2>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Founded in 2023, EnieRent emerged from a simple observation: 
                  finding a rental property in Nigeria was often frustrating, 
                  unreliable, and sometimes even risky.
                </p>
                
                <p className="text-muted-foreground">
                  We set out to create a platform that would not only list properties 
                  but also verify them, protect tenants, and support landlords. 
                  Today, we're proud to be Nigeria's most trusted rental platform.
                </p>
                
                <div className="space-y-3 pt-4">
                  {[
                    "First to implement comprehensive property verification",
                    "Pioneered virtual tours for Nigerian rentals",
                    "Introduced secure online payments for deposits",
                    "Built a 24/7 customer support team"
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="border-2 border-primary/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-secondary/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-32 bg-gradient-to-br from-secondary/20 to-primary/20" />
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 mt-8">
                  <Card className="border-2 border-secondary/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-32 bg-gradient-to-br from-secondary/20 to-primary/20" />
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-primary/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our Values */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every interaction we have.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HoverCard>
                  <Card className="h-full border-2 hover:border-primary/50 transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate team behind EnieRent's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <HoverCard>
                  <Card className="border-2 hover:border-primary/50 transition-all overflow-hidden">
                    <CardContent className="p-0">
                      {/* Avatar */}
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <div 
                          className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-900"
                          style={{ backgroundImage: `url(${member.image})` }}
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                        <p className="text-primary font-medium mb-2">{member.role}</p>
                        <p className="text-sm text-muted-foreground">{member.description}</p>
                        
                        <div className="flex justify-center gap-2 mt-4">
                          <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                          <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                          <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16">
          <Card className="border-0 bg-gradient-to-r from-primary to-secondary overflow-hidden">
            <CardContent className="p-12 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Star className="h-12 w-12 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
                <p className="text-white/90 max-w-2xl mx-auto mb-8">
                  Join thousands of satisfied tenants who found their dream home through EnieRent.
                  Start your journey today.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/properties">
                      Browse Properties
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    <Link href="/contact">
                      Contact Our Team
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}