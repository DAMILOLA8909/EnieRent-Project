import React from 'react'
import { Shield, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All properties undergo strict verification process'
    },
    {
      icon: Clock,
      title: 'Fast Process',
      description: 'Find and secure your home in days, not weeks'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Join thousands of satisfied tenants and landlords'
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your <span className="text-primary">Dream Home</span>?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of Nigerians who have found their perfect home through EnieRent. 
              Our platform makes renting simple, secure, and stress-free.
            </p>
            
            <div className="space-y-6 mb-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                Browse Properties
              </Button>
              <Button variant="outline" size="lg">
                List Your Property
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-xl border">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Start Your Search Today
              </h3>
              
              <div className="space-y-4">
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <div className="font-semibold mb-2">For Tenants</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="size-2 bg-primary rounded-full"></span>
                      Search verified properties
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 bg-primary rounded-full"></span>
                      Schedule virtual tours
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 bg-primary rounded-full"></span>
                      Secure online booking
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="font-semibold mb-2">For Landlords</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="size-2 bg-secondary rounded-full"></span>
                      List properties for free
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 bg-secondary rounded-full"></span>
                      Get verified tenant leads
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 bg-secondary rounded-full"></span>
                      Manage properties easily
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button className="w-full">
                  Create Free Account
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}