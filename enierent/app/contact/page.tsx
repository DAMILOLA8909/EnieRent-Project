// app/contact/page.tsx
"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Clock, 
  Users,
  MessageSquare,
  User,
  Home,
  AlertCircle
} from "lucide-react";
import { PageTransition } from "@/components/animations/page-transition";
import { HoverCard } from "@/components/animations/HoverCard";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-]+$/, 'Invalid phone number')
    .required('Phone number is required'),
  subject: Yup.string()
    .min(5, 'Subject is too short')
    .max(100, 'Subject is too long')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .max(1000, 'Message is too long')
    .required('Message is required'),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setSubmitStatus("idle");
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Save to localStorage
        const contacts = JSON.parse(localStorage.getItem('enierent-contacts') || '[]');
        contacts.push({
          id: `contact_${Date.now()}`,
          ...values,
          date: new Date().toISOString(),
          status: 'unread'
        });
        localStorage.setItem('enierent-contacts', JSON.stringify(contacts));
        
        setSubmitStatus("success");
        resetForm();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } catch (error) {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Us",
      details: ["hello@enierent.com", "support@enierent.com"],
      description: "We respond within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Us",
      details: ["+234 801 234 5678", "+234 802 345 6789"],
      description: "Mon - Fri, 9AM - 6PM"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Visit Us",
      details: ["123 Allen Avenue", "Ikeja, Lagos, Nigeria"],
      description: "Schedule an appointment first"
    }
  ];

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We respond within 24 hours on weekdays and 48 hours on weekends."
    },
    {
      question: "Can I schedule a property viewing through contact?",
      answer: "Yes, mention the property ID in your message and we'll coordinate with the landlord."
    },
    {
      question: "Do you provide emergency support?",
      answer: "For urgent matters, call our emergency line: +234 803 456 7890 (24/7)."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions about properties, need support, or want to list your property? 
                We're here to help you every step of the way.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-primary" />
                      Send us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <h4 className="font-semibold text-green-800 dark:text-green-300">
                            Message Sent Successfully!
                          </h4>
                          <p className="text-sm text-green-700 dark:text-green-400">
                            We've received your message and will respond within 24 hours.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <div>
                          <h4 className="font-semibold text-red-800 dark:text-red-300">
                            Something went wrong
                          </h4>
                          <p className="text-sm text-red-700 dark:text-red-400">
                            Please try again or contact us directly.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={formik.touched.name && formik.errors.name ? "border-red-500" : ""}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <p className="text-sm text-red-500">{formik.errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <p className="text-sm text-red-500">{formik.errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+234 801 234 5678"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={formik.touched.phone && formik.errors.phone ? "border-red-500" : ""}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <p className="text-sm text-red-500">{formik.errors.phone}</p>
                        )}
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="e.g., Property Inquiry, Technical Support"
                          value={formik.values.subject}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={formik.touched.subject && formik.errors.subject ? "border-red-500" : ""}
                        />
                        {formik.touched.subject && formik.errors.subject && (
                          <p className="text-sm text-red-500">{formik.errors.subject}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`resize-none ${formik.touched.message && formik.errors.message ? "border-red-500" : ""}`}
                      />
                      <div className="flex justify-between items-center">
                        {formik.touched.message && formik.errors.message ? (
                          <p className="text-sm text-red-500">{formik.errors.message}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {formik.values.message.length}/1000 characters
                          </p>
                        )}
                        <Button
                          type="submit"
                          disabled={isSubmitting || !formik.isValid}
                          className="gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <HoverCard key={index}>
                      <Card className="border hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary text-sm">Q</span>
                            </div>
                            {faq.question}
                          </h4>
                          <p className="text-muted-foreground pl-8">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    </HoverCard>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <HoverCard>
                      <Card className="border hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              {info.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{info.title}</h4>
                              {info.details.map((detail, i) => (
                                <p key={i} className="text-muted-foreground">
                                  {detail}
                                </p>
                              ))}
                              <p className="text-sm text-primary mt-2 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {info.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>

              {/* Support Hours */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Support Hours</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="font-medium">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="font-medium">Emergency Only</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Average Response Time</h4>
                    <div className="text-3xl font-bold text-primary mb-2">2.5 hours</div>
                    <p className="text-sm text-muted-foreground">
                      Based on 500+ customer inquiries this month
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <div className="p-6 bg-gradient-to-r from-primary to-secondary rounded-lg text-white">
                <h4 className="font-semibold mb-2">Need Immediate Assistance?</h4>
                <p className="text-sm mb-4 opacity-90">
                  Call our emergency line for urgent property issues
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">+234 803 456 7890</div>
                    <p className="text-xs opacity-75">24/7 Emergency Support</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}