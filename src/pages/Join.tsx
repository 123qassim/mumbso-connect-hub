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
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2, Users, Lightbulb, Network, Award, BookOpen, Target, CreditCard, Smartphone, Building2 } from "lucide-react";
import joinBg from "@/assets/join-bg.jpg";
import { SEO } from "@/components/SEO";

const Join = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year_of_study: "",
    course: "",
    interests: "",
  });

  // Fetch membership tiers
  const { data: tiers, isLoading: tiersLoading } = useQuery({
    queryKey: ["membership-tiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("membership_tiers")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const benefits = [
    { icon: Users, title: "Network & Community", description: "Connect with like-minded biotechnology enthusiasts and professionals" },
    { icon: BookOpen, title: "Learning & Training", description: "Access exclusive workshops, seminars, and professional development resources" },
    { icon: Target, title: "Research Opportunities", description: "Participate in cutting-edge research projects and publications" },
    { icon: Award, title: "Career Development", description: "Mentorship programs and industry connections to advance your career" },
    { icon: Network, title: "Events & Conferences", description: "Attend exclusive networking events and international conferences" },
    { icon: Lightbulb, title: "Innovation & Leadership", description: "Lead initiatives and shape the future of biotechnology education" },
  ];

  const paymentMethods = [
    { 
      icon: Smartphone, 
      name: "M-Pesa", 
      description: "Pay via M-Pesa SIM Toolkit",
      details: [
        "Bank: Kenya Commercial Bank (KCB)",
        "Paybill Number: 522522",
        "Account Number: 1270503820"
      ],
      instruction: "SIM Toolkit > Make Payment > Enter 522522 > Account: 1270503820 > Amount > PIN > OK"
    },
    { 
      icon: Smartphone, 
      name: "Airtel Money", 
      description: "Pay via Airtel Money SIM Toolkit",
      details: [
        "Bank: Kenya Commercial Bank (KCB)",
        "Paybill Number: 522522",
        "Account Number: 1270503820"
      ],
      instruction: "SIM Toolkit > Make Payment > Enter 522522 > Account: 1270503820 > Amount > PIN > OK"
    },
    { 
      icon: Building2, 
      name: "Bank Transfer", 
      description: "Direct bank transfer via KCB",
      details: [
        "Bank: Kenya Commercial Bank (KCB)",
        "Business Number: 522522",
        "Account Number: 1270503820"
      ],
      instruction: "Transfer to KCB account above with reference: MUMBSO"
    },
    { 
      icon: CreditCard, 
      name: "Card Payment", 
      description: "International card payments",
      details: [
        "Gateway: Stripe",
        "Status: Coming Soon"
      ],
      instruction: "International debit/credit card support coming soon"
    },
  ];

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to join as a paid member",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!selectedTier) {
      toast({
        title: "Select a membership tier",
        description: "Please choose a membership tier to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First add to community members
      const { error: communityError } = await supabase
        .from("community_members")
        .insert([{ ...formData, email: user.email }]);

      if (communityError && communityError.code !== "23505") {
        throw communityError;
      }

      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { tierId: selectedTier },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, "_blank");
        toast({
          title: "Redirecting to checkout",
          description: "Complete your payment to activate membership",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
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

      {/* Payment Methods */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Payment Methods</h2>
            <p className="text-lg text-muted-foreground">Multiple secure payment options available</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{method.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                    {method.details && method.details.length > 0 && (
                      <ul className="space-y-2">
                        {method.details.map((detail, idx) => (
                          <li key={idx} className="text-sm flex gap-2">
                            <span className="text-primary font-medium">•</span>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-sm font-medium border-t pt-3">
                      {method.instruction}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      {showForm && (
        <section className="py-20 bg-accent/5">
          <div className="container max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Complete Your Registration</CardTitle>
                <CardDescription>Provide your information to finalize membership</CardDescription>
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
                        required
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
                        Processing...
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                  {!user && (
                    <p className="text-sm text-center text-muted-foreground">
                      You'll be redirected to log in before payment
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!showForm && (
        <section className="py-20 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Select a membership plan above to get started on your journey with MUMBSO
            </p>
            <p className="text-white/80">
              Questions? <a href="/contact" className="underline hover:text-white transition-colors">Contact us</a>
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Join;
