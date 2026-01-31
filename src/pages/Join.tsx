import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, ArrowRight, Users, Lightbulb, Network, Award, BookOpen, Target } from "lucide-react";
import joinBg from "@/assets/join-bg.jpg";
import { SEO } from "@/components/SEO";
import { ALL_INTERESTS } from "@/constants/interests";
import { validateEmail, validatePhoneNumber, validatePassword, formatPhoneNumber } from "@/lib/validation";

const Join = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlumni, setIsAlumni] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    year_of_study: "Year 1",
    course: "Medical Biotechnology with IT",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    if (user) {
      // Give Supabase a moment to fully establish the session
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const benefits = [
    { icon: Users, title: "Network & Community", description: "Connect with like-minded biotechnology enthusiasts and professionals" },
    { icon: BookOpen, title: "Learning & Training", description: "Access exclusive workshops, seminars, and professional development resources" },
    { icon: Target, title: "Research Opportunities", description: "Participate in cutting-edge research projects and publications" },
    { icon: Award, title: "Career Development", description: "Mentorship programs and industry connections to advance your career" },
    { icon: Network, title: "Events & Conferences", description: "Attend exclusive networking events and international conferences" },
    { icon: Lightbulb, title: "Innovation & Leadership", description: "Lead initiatives and shape the future of biotechnology education" },
  ];

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.surname.trim()) {
        toast({ title: "Required", description: "Please enter your full name", variant: "destructive" });
        return false;
      }
      if (!formData.email.trim()) {
        toast({ title: "Required", description: "Please enter your email", variant: "destructive" });
        return false;
      }
      if (!validateEmail(formData.email)) {
        setEmailError("Please enter a valid email address");
        return false;
      }
      if (!formData.phone.trim()) {
        toast({ title: "Required", description: "Please enter your phone number", variant: "destructive" });
        return false;
      }
      if (!validatePhoneNumber(formData.phone)) {
        toast({ title: "Invalid phone", description: "Please enter a valid Kenyan phone number", variant: "destructive" });
        return false;
      }
      setEmailError("");
      return true;
    }

    if (step === 2) {
      if (!isAlumni && !formData.year_of_study) {
        toast({ title: "Required", description: "Please select your year of study", variant: "destructive" });
        return false;
      }
      if (selectedInterests.length === 0) {
        toast({ title: "Required", description: "Please select at least one area of interest", variant: "destructive" });
        return false;
      }
      if (selectedInterests.length > 3) {
        toast({ title: "Too many selections", description: "Maximum 3 areas", variant: "destructive" });
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!formData.password) {
        toast({ title: "Required", description: "Please enter a password", variant: "destructive" });
        return false;
      }
      if (!formData.passwordConfirm) {
        toast({ title: "Required", description: "Please confirm your password", variant: "destructive" });
        return false;
      }
      if (formData.password !== formData.passwordConfirm) {
        toast({ title: "Mismatch", description: "Passwords do not match", variant: "destructive" });
        return false;
      }
      const { valid, errors } = validatePassword(formData.password);
      if (!valid) {
        setPasswordErrors(errors);
        return false;
      }
      setPasswordErrors([]);
      return true;
    }

    return true;
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        toast({ title: "Limit reached", description: "Maximum 3 interests", variant: "destructive" });
      }
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            surname: formData.surname,
            phone: formatPhoneNumber(formData.phone),
            year_of_study: isAlumni ? "Alumni" : formData.year_of_study,
            course: formData.course,
            interests: selectedInterests.join(", "),
            is_alumni: isAlumni,
          }
        }
      });

      if (authError) {
        // Handle email confirmation errors gracefully
        if (authError.message.includes("Email confirmation")) {
          console.warn("Email confirmation error:", authError);
          toast({ 
            title: "Account created!", 
            description: "Please verify your email before logging in.", 
            variant: "default" 
          });
        } else {
          throw authError;
        }
      }

      const { error: communityError } = await supabase
        .from("community_members")
        .insert([{
          name: `${formData.firstName} ${formData.surname}`,
          email: formData.email,
          phone: formatPhoneNumber(formData.phone),
          year_of_study: isAlumni ? "Alumni" : formData.year_of_study,
          course: formData.course,
          interests: selectedInterests.join(", "),
        }]);

      if (communityError && communityError.code !== "23505") {
        console.error("Community error:", communityError);
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{
            id: authData.user.id,
            first_name: formData.firstName,
            surname: formData.surname,
            email: formData.email,
            phone: formatPhoneNumber(formData.phone),
            year_of_study: isAlumni ? "Alumni" : formData.year_of_study,
            course: formData.course,
            interests: selectedInterests.join(", "),
            is_alumni: isAlumni,
          }]);

        if (profileError && profileError.code !== "23505") {
          console.error("Profile error:", profileError);
        }
      }

      toast({ title: "Success!", description: "Account created. Redirecting..." });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      const err = error as Error;
      console.error("Registration error:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Join MUMBSO - Create Your Account"
        description="Become part of MUMBSO and access exclusive biotechnology workshops, research opportunities, and professional networking events."
      />
      <Header />

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={joinBg} alt="Join MUMBSO Community" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/90 to-secondary/85" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">Join MUMBSO Today</h1>
            <p className="text-xl text-white/95 mb-8 leading-relaxed">
              Become part of a vibrant community of biotechnology enthusiasts.
            </p>
          </div>
        </div>
      </section>

      <section id="why-join" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join MUMBSO?</h2>
            <p className="text-lg text-muted-foreground">
              Unlock a world of opportunities and become part of Kenya's leading biotechnology student organization
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                        step < currentStep
                          ? "bg-primary text-white"
                          : step === currentStep
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step < currentStep ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`h-1 flex-1 mx-3 transition-all ${
                          step < currentStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Academic & Interests"}
                  {currentStep === 3 && "Account Security"}
                </h3>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Tell us about yourself"}
                  {currentStep === 2 && "Select your interests and academic details"}
                  {currentStep === 3 && "Secure your account with a strong password"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="surname">Surname *</Label>
                          <Input
                            id="surname"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setEmailError("");
                          }}
                          placeholder="john@example.com"
                          required
                          className={emailError ? "border-destructive" : ""}
                        />
                        {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0712345678"
                          required
                        />
                        <p className="text-sm text-muted-foreground mt-1">Format: 0712345678 or +254712345678</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="alumni"
                            checked={isAlumni}
                            onCheckedChange={(checked) => setIsAlumni(checked as boolean)}
                          />
                          <Label htmlFor="alumni" className="font-normal cursor-pointer">
                            I am an Alumni
                          </Label>
                        </div>

                        {!isAlumni && (
                          <div>
                            <Label htmlFor="year">Year of Study *</Label>
                            <Select value={formData.year_of_study} onValueChange={(value) => setFormData({ ...formData, year_of_study: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Year 1">Year 1</SelectItem>
                                <SelectItem value="Year 2">Year 2</SelectItem>
                                <SelectItem value="Year 3">Year 3</SelectItem>
                                <SelectItem value="Year 4">Year 4</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="course">Course / Program *</Label>
                        <div className="p-4 bg-muted rounded-lg border border-muted-foreground/20">
                          <p className="font-semibold text-sm">{formData.course}</p>
                          <p className="text-xs text-muted-foreground mt-1">(Pre-filled and locked)</p>
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <Label className="text-base font-semibold mb-2 block">Areas of Interest *</Label>
                          <p className="text-sm text-muted-foreground mb-4">Select up to 3 areas</p>
                        </div>

                        {ALL_INTERESTS.map((categoryGroup) => (
                          <div key={categoryGroup.category} className="mb-8">
                            <h4 className="font-semibold text-sm mb-4 text-primary">{categoryGroup.category}</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {categoryGroup.items.map((interest) => (
                                <div key={interest} className="flex items-center">
                                  <Checkbox
                                    id={interest}
                                    checked={selectedInterests.includes(interest)}
                                    onCheckedChange={() => toggleInterest(interest)}
                                    disabled={selectedInterests.length >= 3 && !selectedInterests.includes(interest)}
                                  />
                                  <Label htmlFor={interest} className="ml-3 font-normal cursor-pointer text-sm">
                                    {interest}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <p className="text-sm">Selected: <span className="font-semibold">{selectedInterests.length}/3</span></p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            setPasswordErrors([]);
                          }}
                          placeholder="Create a strong password"
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Min 8 chars, uppercase, lowercase, number, special char
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="passwordConfirm">Confirm Password *</Label>
                        <Input
                          id="passwordConfirm"
                          type="password"
                          value={formData.passwordConfirm}
                          onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                          placeholder="Confirm your password"
                          required
                        />
                      </div>

                      {passwordErrors.length > 0 && (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                          <p className="font-semibold text-sm mb-2 text-destructive">Requirements:</p>
                          <ul className="space-y-1">
                            {passwordErrors.map((error, idx) => (
                              <li key={idx} className="text-sm text-destructive">• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">✓ Your info is secure and encrypted</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-6 border-t">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                    )}

                    {currentStep < 3 && (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        Next <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    )}

                    {currentStep === 3 && (
                      <Button type="submit" disabled={isLoading} className="flex-1">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Create Account
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Join;