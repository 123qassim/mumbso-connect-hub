import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2, Users, Lightbulb, Network, Award, BookOpen, Target } from "lucide-react";
import joinBg from "@/assets/join-bg.jpg";
import { SEO } from "@/components/SEO";

const Join = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year_of_study: "",
    course: "",
    interests: "",
  });

  const benefits = [
    { icon: Users, title: "Network & Community", description: "Connect with like-minded biotechnology enthusiasts and professionals" },
    { icon: BookOpen, title: "Learning & Training", description: "Access exclusive workshops, seminars, and professional development resources" },
    { icon: Target, title: "Research Opportunities", description: "Participate in cutting-edge research projects and publications" },
    { icon: Award, title: "Career Development", description: "Mentorship programs and industry connections to advance your career" },
    { icon: Network, title: "Events & Conferences", description: "Attend exclusive networking events and international conferences" },
    { icon: Lightbulb, title: "Innovation & Leadership", description: "Lead initiatives and shape the future of biotechnology education" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.year_of_study || !formData.course) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Add to community members
      const { error: communityError } = await supabase
        .from("community_members")
        .insert([{ 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          year_of_study: formData.year_of_study,
          course: formData.course,
          interests: formData.interests,
        }]);

      if (communityError && communityError.code !== "23505") {
        throw communityError;
      }

      toast({
        title: "Successfully joined MUMBSO!",
        description: "Your registration is complete. Please log in to access your dashboard.",
      });

      // Redirect to auth page to login
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Failed to complete registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Join MUMBSO - Membership Onboarding"
        description="Become part of MUMBSO and access exclusive biotechnology workshops, research opportunities, and professional networking events."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={joinBg}
            alt="Join MUMBSO Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/90 to-secondary/85" />
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Join MUMBSO Today
            </h1>
            <p className="text-xl text-white/95 mb-8 leading-relaxed">
              Become part of a vibrant community of biotechnology enthusiasts. Access exclusive opportunities, connect with peers, and advance your career.
            </p>
            <Button size="lg" onClick={() => document.getElementById("why-join")?.scrollIntoView({ behavior: "smooth" })}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join MUMBSO */}
      <section id="why-join" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join MUMBSO?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock a world of opportunities and become part of Kenya's leading biotechnology student organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Options */}
      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Plans</h2>
            <p className="text-lg text-muted-foreground">Choose the membership tier that works best for you</p>
          </div>

          {tiersLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tiers?.map((tier) => (
                <Card
                  key={tier.id}
                  className={`relative overflow-hidden transition-all cursor-pointer hover:shadow-lg ${
                    selectedTier === tier.id
                      ? "ring-2 ring-primary shadow-xl"
                      : ""
                  }`}
                  onClick={() => handleSelectTier(tier.id)}
                >
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.duration_months} months membership</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-4xl font-bold">KES {Number(tier.price).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">One-time payment</p>
                    </div>
                    
                    <p className="text-muted-foreground">{tier.description}</p>

                    {tier.benefits && typeof tier.benefits === 'object' && (
                      <ul className="space-y-3">
                        {Object.entries(tier.benefits as Record<string, boolean>)
                          .filter(([_, value]) => value)
                          .map(([key, _], idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <Check className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="text-sm capitalize">{key.replace(/_/g, ' ')}</span>
                            </li>
                          ))}
                      </ul>
                    )}

                    <Button 
                      className="w-full mt-6"
                      variant={selectedTier === tier.id ? "default" : "outline"}
                    >
                      {selectedTier === tier.id ? "Selected" : "Choose Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Payment Methods */}Start Your Journey</h2>
            <p className="text-lg text-muted-foreground">Sign up and get instant access to your member dashboard</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Join MUMBSO</CardTitle>
                <CardDescription>Complete your registration to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+254 700 000000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="year">Year of Study *</Label>
                      <Select
                        value={formData.year_of_study}
                        onValueChange={(value) => setFormData({ ...formData, year_of_study: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Year 1">Year 1</SelectItem>
                          <SelectItem value="Year 2">Year 2</SelectItem>
                          <SelectItem value="Year 3">Year 3</SelectItem>
                          <SelectItem value="Year 4">Year 4</SelectItem>
                          <SelectItem value="Alumni">Alumni</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="course">Course/Program *</Label>
                    <Input
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      required
                      placeholder="Bachelor of Medical Biotechnology"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="interests">Areas of Interest</Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      placeholder="Tell us about your interests in biotechnology..."
                      rows={4}
                    />
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      ✓ Your information is secure and will only be used for membership purposes
                    </p>
                  </div>

                  <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join MUMBSO"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section><section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get as a Member</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Access exclusive opportunities, connect with peers, and advance your career in biotechnology
          </p>
          <p className="text-white/80">
            Questions? <a href="/contact" className="underline hover:text-white transition-colors">Contact us</a>
          </p>
        </div>
      </section>