import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Home, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/10 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Home className="size-6 text-primary" />
              <span className="text-xl font-bold">EnieRent</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in finding the perfect home. We connect tenants with verified landlords across Nigeria.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="size-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Browse Properties', 'How It Works', 'For Landlords', 'For Agents', 'Blog'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              {['Apartments', 'Self Contains', 'Duplexes', 'Short Lets', 'Bungalows'].map((type) => (
                <li key={type}>
                  <Link
                    href={`/properties?type=${type.toLowerCase().replace(/ /g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Allen Avenue, Ikeja, Lagos
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +234 801 234 5678
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  hello@enierent.com
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} EnieRent. All rights reserved. | 
            <Link href="/privacy" className="hover:text-primary ml-2">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-primary ml-2">Terms of Service</Link>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Made with ❤️ for better housing solutions in Nigeria
          </p>
        </div>
      </div>
    </footer>
  )
}