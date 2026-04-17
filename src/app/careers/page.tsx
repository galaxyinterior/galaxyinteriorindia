
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const availableRoles = [
    { 
        title: 'Architect / Interior Designer', 
        description: 'Design luxury spaces for our elite clients. Proficiency in AutoCAD, SketchUp, and V-Ray is expected.',
        image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=600&auto=format&fit=crop',
        hint: 'interior designer workspace'
    },
    { 
        title: 'Civil Engineer / Site Supervisor', 
        description: 'Manage end-to-end home construction projects at our Godda and Ranchi sites. Ensure high-quality material usage.',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop',
        hint: 'construction site engineer'
    },
     { 
        title: '3D Artist / Visualizer', 
        description: 'Create photorealistic 3D renders and virtual walkthroughs for residential and commercial architecture.',
        image: 'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?q=80&w=600&auto=format&fit=crop',
        hint: 'architectural rendering studio'
    },
];


export default function CareersPage() {
  const [role, setRole] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const resumeLink = formData.get('resumeLink') as string;
    const message = formData.get('message') as string;
    
    const subject = `Career Inquiry: ${role} - ${name}`;
    const body = `
      New Job Application for Galaxy Interior
      -------------------
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Applying for: ${role}
      Resume/Portfolio Link: ${resumeLink}
      
      Message:
      ${message}
    `;
    
    const mailtoUrl = `mailto:info@galaxyinterior.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
  };

  return (
    <div className="bg-white">
      <section className="py-24 bg-galaxy-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter">
            Join Our Team
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/60">
            Galaxy Interior is looking for creative minds and expert builders to help us shape the future of luxury living in Jharkhand.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12 sm:mb-16">
             <h2 className="font-display text-4xl md:text-6xl font-bold text-primary">
                Current Openings
             </h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                Opportunities at our Godda and Ranchi offices.
             </p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {availableRoles.map((role) => (
                <Card key={role.title} className="glass-card">
                    <CardContent className="p-0">
                        <div className="relative aspect-video">
                            <Image src={role.image} alt={role.title} fill className="object-cover rounded-t-lg" data-ai-hint={role.hint} />
                        </div>
                    </CardContent>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-2">{role.title}</h3>
                        <p className="text-gray-600 mb-4 h-24">{role.description}</p>
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white" onClick={() => {
                            setRole(role.title);
                            document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                           Apply Now
                        </Button>
                    </div>
                </Card>
             ))}
           </div>
        </div>
      </section>

      <section id="application-form" className="pb-16 sm:pb-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto shadow-2xl glass-card border-none">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-primary font-display">Apply Today</CardTitle>
              <CardDescription>
                Submit your details to the Galaxy Interior HR team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Enter your full name" required className="glass-card" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" required className="glass-card" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Enter your mobile number" required className="glass-card" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="role">Applying for</Label>
                    <Select name="role" value={role} onValueChange={setRole} required>
                        <SelectTrigger id="role" className="glass-card">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Architect / Interior Designer">Architect / Interior Designer</SelectItem>
                            <SelectItem value="Civil Engineer / Site Supervisor">Civil Engineer / Site Supervisor</SelectItem>
                            <SelectItem value="3D Artist / Visualizer">3D Artist / Visualizer</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="resumeLink">Portfolio / Resume Link (Drive, Behance, etc.)</Label>
                  <Input id="resumeLink" name="resumeLink" type="url" placeholder="https://your-portfolio.com" required className="glass-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Brief introduction</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your experience..."
                    rows={5}
                    className="glass-card"
                  />
                </div>
                 <p className="text-xs text-gray-500 pt-2 text-center">
                  Galaxy Interior is an equal opportunity employer. We value talent and commitment to excellence.
                </p>
                <Button type="submit" className="w-full rounded-full h-14 font-bold uppercase tracking-widest shadow-xl" size="lg">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
