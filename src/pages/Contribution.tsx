import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Copy, Stethoscope, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contribution = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <>
      <SEO
        title="Support MUMBSO - Make a Contribution"
        description="Support Maseno University Medical Biotechnology Students Organization (MUMBSO) through donations. Help us advance biotechnology education and research."
        keywords="donate to MUMBSO, support biotech students, contribute to MUMBSO, KCB donations, student organization support"
      />
      <div className="min-h-screen bg-background">
        <Header />

        {/* Page Header */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/90 to-secondary" />
          <div className="container text-center relative z-10">
            <Stethoscope className="h-16 w-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
              Support MUMBSO
            </h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto">
              Your contribution helps us empower the next generation of biotechnology professionals
            </p>
          </div>
        </section>

        {/* Why Contribute Section */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Your Support Matters</h2>
              <p className="text-lg text-muted-foreground">
                Your generous contributions enable us to continue our mission of advancing biotechnology education and research
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Student Development</h3>
                  <p className="text-muted-foreground">
                    Fund workshops, seminars, and training programs for our members
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-secondary/10 p-3">
                    <Building2 className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Research Projects</h3>
                  <p className="text-muted-foreground">
                    Support groundbreaking research in medical biotechnology
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                    <Stethoscope className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community Outreach</h3>
                  <p className="text-muted-foreground">
                    Enable health education programs and community initiatives
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Bank Details Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Make a Donation</CardTitle>
                <p className="text-muted-foreground">
                  Support MUMBSO through Kenya Commercial Bank (KCB)
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
                      <p className="text-lg font-semibold">Kenya Commercial Bank (KCB)</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Business Number</p>
                      <p className="text-2xl font-bold text-primary">522522</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard("522522", "Business Number")}
                      className="ml-4"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                      <p className="text-2xl font-bold text-primary">1270503820</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard("1270503820", "Account Number")}
                      className="ml-4"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    <strong>Note:</strong> Please send us an email at{" "}
                    <a href="mailto:contact@mumbso.org" className="text-primary hover:underline">
                      contact@mumbso.org
                    </a>{" "}
                    after making a donation so we can acknowledge your contribution and provide a receipt.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Thank You Message */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Thank You for Your Support!</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every contribution, no matter the size, makes a significant impact on our mission to empower Medical Biotechnology students and advance scientific discovery. Your generosity helps shape the future of healthcare in Kenya and beyond.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contribution;
