
"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await addDoc(collection(db, "consultations"), {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        propertyType: "Contact Page",
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-white">
      <section className="py-32 bg-galaxy-dark text-white text-center">
        <div className="container mx-auto px-4">
          <Badge className="mb-6 rounded-none bg-primary text-galaxy-dark font-bold tracking-[0.3em] px-6 py-2">GET IN TOUCH</Badge>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">Contact Us</h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-galaxy-dark mb-8">Office Locations</h2>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="font-bold text-primary uppercase tracking-widest text-sm">Godda Office</p>
                    <div className="flex gap-4 text-gray-600">
                      <MapPin className="w-6 h-6 text-primary shrink-0" />
                      <span>Near Durga Mandir Sarkanda, Godda, Jharkhand – 814133</span>
                    </div>
                    <div className="flex gap-4 text-gray-600">
                      <Phone className="w-6 h-6 text-primary shrink-0" />
                      <span>+91 9113439057</span>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8 border-t">
                    <p className="font-bold text-primary uppercase tracking-widest text-sm">Ranchi Office</p>
                    <div className="flex gap-4 text-gray-600">
                      <MapPin className="w-6 h-6 text-primary shrink-0" />
                      <span>Van Vrindavan Colony, Morabadi, Ranchi – 834006</span>
                    </div>
                    <div className="flex gap-4 text-gray-600">
                      <Phone className="w-6 h-6 text-primary shrink-0" />
                      <span>+91 9631980881</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 pt-12 border-t">
                <div className="flex gap-4 text-gray-600">
                  <Mail className="w-6 h-6 text-primary shrink-0" />
                  <span>info@galaxyinterior.com</span>
                </div>
                <div className="flex gap-4 text-gray-600">
                  <Clock className="w-6 h-6 text-primary shrink-0" />
                  <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="rounded-none border-none shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-galaxy-dark mb-8">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="John Doe" required className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required className="rounded-none" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" required className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location</Label>
                      <Input id="location" name="location" placeholder="City, State" required className="rounded-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="Interior Design Query" className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell us about your project..." rows={6} className="rounded-none" />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full rounded-none h-14 font-bold text-lg uppercase tracking-widest bg-primary hover:bg-primary/90 text-white">
                    {submitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[500px] w-full bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.450834231377!2d87.21133449999999!3d24.814251499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0f5408326a28b%3A0x43b45b4e30aa4f22!2sGalaxy%20Interior!5e0!3m2!1sen!2sin!4v1773317713458!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Galaxy Interior Godda Map"
        ></iframe>
      </section>
    </div>
  );
}
