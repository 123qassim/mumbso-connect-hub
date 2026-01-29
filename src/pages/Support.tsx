import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BookOpen, Microscope, Users, Copy, ExternalLink } from "lucide-react";

const Support = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Helper function to get width class based on percentage
  const getProgressWidthClass = (percentage: number): string => {
    // Map percentage to Tailwind width classes
    if (percentage <= 15) return "w-[15%]";
    if (percentage <= 20) return "w-[20%]";
    if (percentage <= 25) return "w-[25%]";
    if (percentage <= 30) return "w-[30%]";
    if (percentage <= 35) return "w-[35%]";
    if (percentage <= 40) return "w-[40%]";
    if (percentage <= 50) return "w-1/2";
    return "w-full";
  };

  const donationMethods = [
    {
      id: "mpesa",
      title: "M-Pesa Donation",
      subtitle: "Quick & Secure",
      description: "Make an instant donation using M-Pesa SIM Toolkit. Your contribution will directly support our biotech research and student programs.",
      icon: <Heart className="h-6 w-6" />,
      details: [
        { label: "Bank", value: "Kenya Commercial Bank (KCB)" },
        { label: "Paybill Number", value: "522522" },
        { label: "Account Number", value: "1270503820" },
      ],
      steps: [
        "Go to M-Pesa on your phone",
        'Select "SIM Toolkit"',
        'Select "Make Payment"',
        "Enter Paybill Number: 522522",
        "Enter Account Number: 1270503820",
        "Enter the amount you wish to donate",
        "Enter your M-Pesa PIN and press OK",
        "You will receive a confirmation message",
      ],
      cta: "Donate via M-Pesa",
      badge: "Most Popular",
    },
    {
      id: "airtel",
      title: "Airtel Money Donation",
      subtitle: "Fast & Reliable",
      description: "Support our mission through Airtel Money SIM Toolkit. Funds go directly to lab equipment, research materials, and student scholarships.",
      icon: <Microscope className="h-6 w-6" />,
      details: [
        { label: "Bank", value: "Kenya Commercial Bank (KCB)" },
        { label: "Paybill Number", value: "522522" },
        { label: "Account Number", value: "1270503820" },
      ],
      steps: [
        "Go to Airtel Money on your phone",
        'Select "SIM Toolkit"',
        'Select "Make Payment"',
        "Enter Paybill Number: 522522",
        "Enter Account Number: 1270503820",
        "Enter the amount you wish to donate",
        "Enter your Airtel Money PIN and press OK",
        "You will receive a confirmation message",
      ],
      cta: "Donate via Airtel Money",
      badge: "Available",
    },
    {
      id: "bank",
      title: "Bank Transfer",
      subtitle: "Direct & Secure",
      description: "Make a direct bank transfer to support our youth empowerment and research initiatives.",
      icon: <BookOpen className="h-6 w-6" />,
      details: [
        { label: "Bank Name", value: "Kenya Commercial Bank (KCB)" },
        { label: "Business Number", value: "522522" },
        { label: "Account Number", value: "1270503820" },
      ],
      steps: [
        "Log into your bank portal or visit a KCB branch",
        "Select 'Make a Transfer' or 'Pay a Bill'",
        "Enter Paybill Number: 522522",
        "Enter Account Number: 1270503820",
        "Enter the amount you wish to donate",
        "Add reference: MUMBSO Donation",
        "Confirm and authorize the transfer",
        'We\'ll send you a formal donation acknowledgment',
      ],
      cta: "Request Bank Details",
      badge: "Available",
    },
    {
      id: "card",
      title: "Card Payment",
      subtitle: "International Support",
      description: "Support from anywhere in the world using your debit or credit card.",
      icon: <Users className="h-6 w-6" />,
      details: [
        { label: "Status", value: "Coming Soon" },
        { label: "Payment Gateway", value: "Stripe" },
      ],
      steps: [
        "Feature coming very soon",
        "International supporters will be able to donate using cards",
        "Secure payment processing",
        "Instant receipt and tax documentation",
      ],
      cta: "Coming Soon",
      badge: "Coming Soon",
      disabled: true,
    },
  ];

  const fundUsage = [
    {
      title: "Lab & Research Equipment",
      description: "Supporting advanced molecular biology research and laboratory materials",
      icon: <Microscope className="h-5 w-5" />,
      percentage: 35,
    },
    {
      title: "Student Scholarships & Grants",
      description: "Direct financial support for talented biotechnology students",
      icon: <BookOpen className="h-5 w-5" />,
      percentage: 30,
    },
    {
      title: "Workshops & Events",
      description: "Organizing educational seminars, conferences, and networking events",
      icon: <Users className="h-5 w-5" />,
      percentage: 20,
    },
    {
      title: "Community Outreach",
      description: "Science education and health awareness in underserved communities",
      icon: <Heart className="h-5 w-5" />,
      percentage: 15,
    },
  ];

  const impactStats = [
    { label: "Students Supported", value: "150+" },
    { label: "Research Projects", value: "45+" },
    { label: "Events Organized", value: "28+" },
    { label: "Communities Reached", value: "12+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              Support Medical Biotechnology Excellence
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              Your donation fuels groundbreaking research, funds student scholarships, and brings quality science education to communities across East Africa.
            </p>
            <p className="text-base text-text-tertiary max-w-2xl mx-auto">
              Every contribution, no matter the size, creates lasting impact in the lives of aspiring medical biotechnology professionals and the communities they serve.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Ways to Donate</h2>
            <p className="text-text-secondary">Choose the payment method that works best for you</p>
          </div>

          {/* Donation Methods Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {donationMethods.map((method) => (
              <Card key={method.id} className="relative flex flex-col border-border hover:shadow-lg transition-shadow">
                {method.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      method.badge === "Most Popular" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      {method.badge}
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">{method.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{method.title}</CardTitle>
                      <CardDescription>{method.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <p className="text-text-secondary text-sm mb-6">{method.description}</p>

                  {/* Details */}
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    {method.details.map((detail) => (
                      <div key={detail.label} className="mb-3 last:mb-0">
                        <div className="text-xs font-medium text-text-tertiary uppercase mb-1">
                          {detail.label}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-text-primary text-sm">
                            {detail.value}
                          </span>
                          {detail.label !== "Contact" && detail.label !== "Status" && detail.value !== "Coming Soon" && detail.value !== "Stripe" && (
                            <button
                              onClick={() => handleCopy(detail.value, detail.label)}
                              className="text-primary hover:text-primary/80 transition-colors"
                              title="Copy to clipboard"
                            >
                              {copiedText === detail.label ? (
                                <span className="text-xs">Copied!</span>
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Steps */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text-primary mb-3">How it works:</h4>
                    <ol className="space-y-2">
                      {method.steps.map((step, index) => (
                        <li key={index} className="flex gap-3 text-sm text-text-secondary">
                          <span className="font-medium text-primary shrink-0">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    variant={method.id === "mpesa" ? "hero" : "outline"}
                    className="w-full mt-auto"
                    disabled={method.disabled}
                  >
                    {method.cta}
                    {method.id === "mpesa" && <ExternalLink className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use of Funds Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">How Your Donation Makes an Impact</h2>
            <p className="text-text-secondary">
              We are transparent about how we use donations. Every contribution is accounted for and directed to programs that create measurable impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {fundUsage.map((fund) => (
              <Card key={fund.title} className="border-border">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-primary">{fund.icon}</div>
                    <div className="flex-grow">
                      <CardTitle className="text-lg">{fund.title}</CardTitle>
                      <CardDescription>{fund.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">Allocation</span>
                    <span className="text-lg font-bold text-primary">{fund.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300 ${getProgressWidthClass(fund.percentage)}`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Ways to Support */}
          <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-border p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Other Ways to Support</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Volunteer</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Share your time and expertise. Mentor students, lead workshops, or support our events.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Get Involved
                </Button>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">Partner With Us</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Organizations and corporates can partner to amplify our impact across the region.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Partner
                </Button>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">Spread the Word</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Help us reach more supporters by sharing our mission with your network.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Share Our Mission
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Is my donation tax-deductible?",
                a: "As a recognized student organization at Maseno University, donations may be eligible for tax deductions. Contact us for official documentation.",
              },
              {
                q: "Can I donate in installments?",
                a: "Yes! You can make multiple smaller donations over time. Each contribution matters and helps us plan our programs effectively.",
              },
              {
                q: "What happens if I donate anonymously?",
                a: "Anonymous donations are welcome. We respect your privacy while honoring your generosity through our annual impact reports.",
              },
              {
                q: "How will I receive donation confirmation?",
                a: "You'll receive an instant SMS confirmation for M-Pesa and Airtel donations, plus an email receipt with impact details.",
              },
              {
                q: "Can organizations donate larger amounts?",
                a: "Absolutely! Organizations can discuss bulk donations and partnership opportunities. Please contact our treasurer.",
              },
              {
                q: "What if I have other payment suggestions?",
                a: "We're always open to feedback. Contact us to discuss additional payment methods or custom donation arrangements.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg text-text-secondary mb-8">
            Your donation, no matter the size, creates lasting impact in the lives of aspiring medical biotechnology professionals and the communities they serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="min-w-max">
              Donate Now
            </Button>
            <Button variant="outline" size="lg" className="min-w-max">
              Learn More About Our Work
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
