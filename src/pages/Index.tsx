import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Dna, Microscope, Brain, Users, BookOpen, Stethoscope } from "lucide-react";
import studentsImage from "@/assets/students-learning.jpg";
import outreachImage from "@/assets/outreach.jpg";

const Index = () => {
  const features = [
    {
      icon: Dna,
      title: "Genomics & Sequencing",
      description: "Learn cutting-edge DNA sequencing and genomic analysis techniques",
    },
    {
      icon: Brain,
      title: "AI in Healthcare",
      description: "Explore machine learning applications in medical diagnostics and drug discovery",
    },
    {
      icon: Microscope,
      title: "Laboratory Research",
      description: "Hands-on experience with advanced biotechnology research methods",
    },
    {
      icon: Users,
      title: "Community Outreach",
      description: "Educate communities about health and biotechnology innovations",
    },
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Access to workshops, seminars, and professional development resources",
    },
    {
      icon: Stethoscope,
      title: "Healthcare Impact",
      description: "Research projects focused on improving public health outcomes",
    },
  ];

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              MUMBSO connects students through research, education, and innovation in medical biotechnology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Empowering Future Biotechnology Leaders
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Maseno University Medical Biotechnology Student's Organization (MUMBSO) is the official student-run organization at Maseno University empowering the next generation of biotechnology researchers and innovators.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We bridge the gap between biotechnology and IT, focusing on research, education, community outreach, and career development. Our activities include workshops, research projects, guest lectures, conferences, internships, and community health initiatives.
              </p>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 shadow-lg font-semibold">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={studentsImage}
                alt="Students learning biotechnology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Outreach */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={outreachImage}
                alt="Community health outreach"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Making an Impact in Communities
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our community outreach programs aim to educate the public about medical biotechnology, health awareness, and disease prevention. We conduct regular health camps, workshops, and awareness campaigns in rural and urban communities.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                MUMBSO members have reached thousands of community members, providing education on infectious diseases, antimicrobial resistance, and the role of biotechnology in modern healthcare.
              </p>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 shadow-lg font-semibold">
                <Link to="/programs">View Our Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <section className="py-20 bg-gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
            Stay Updated
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about events, research, and opportunities
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Index;