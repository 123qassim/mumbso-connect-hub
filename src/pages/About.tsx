import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Stethoscope, Users, Award, Lightbulb } from "lucide-react";
import aboutBg from "@/assets/about-bg.jpg";

const About = () => {
  return (
    <>
      <SEO
        title="About Us - Mission, Vision & Values"
        description="Learn about MUMBSO's mission to empower Medical Biotechnology students through research, education, and innovation at Maseno University."
        keywords="about MUMBSO, biotech student organization, Maseno University, mission, vision, values"
      />
      <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutBg}
            alt="DNA research and biotechnology team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            About MUMBSO
          </h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto">
            The official student organization connecting Medical Biotechnology and Information Technology at Maseno University
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 hover:shadow-card transition-all">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground text-lg">
                  To empower Medical Biotechnology students with knowledge, skills, and opportunities through research, education, community outreach, and professional development, bridging the gap between biotechnology and information technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-card transition-all">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-secondary/10 p-3">
                  <Eye className="h-8 w-8 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground text-lg">
                  To become a leading student organization in East Africa, recognized for producing innovative biotech researchers and professionals who contribute to advancing healthcare and scientific discovery.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Striving for the highest standards in research, education, and professional development
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Embracing new technologies and approaches to solve healthcare challenges
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-secondary/10 p-3">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Working together to achieve common goals and share knowledge
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                  <Stethoscope className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Service</h3>
                <p className="text-muted-foreground">
                  Dedicated to improving public health through education and outreach
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-muted-foreground">
                  Maintaining ethical standards in all our research and activities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-secondary/10 p-3">
                  <Lightbulb className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  Committed to lifelong learning and professional growth
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Our History</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg mb-4">
              Maseno University Medical Biotechnology Students Organization (MUMBSO) was founded in 2019 (year of registration) by passionate Medical Biotechnology students at Maseno University who recognized the need for a dedicated organization to support students in this unique program that combines medical biotechnology with information technology.
            </p>
            <p className="text-muted-foreground text-lg mb-4">
              Since its inception, MUMBSO has grown into a vibrant community of researchers, innovators, and future healthcare professionals. We have organized numerous workshops, seminars, and research projects that have contributed significantly to student development and community health awareness.
            </p>
            <p className="text-muted-foreground text-lg">
              Today, MUMBSO continues to expand its reach, forming partnerships with research institutions, healthcare organizations, and industry leaders to provide our members with unparalleled opportunities for growth and impact.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            What Makes Our Program Unique
          </h2>
          <Card className="border-2">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground mb-6">
                The Medical Biotechnology with Information Technology program at Maseno University is one of the few programs in Africa that combines these two critical fields:
              </p>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span><strong>Interdisciplinary Approach:</strong> Combining medical biotechnology with computational skills and IT knowledge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span><strong>Bioinformatics Focus:</strong> Training in genomic data analysis, machine learning, and computational biology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span><strong>Research Opportunities:</strong> Access to cutting-edge research projects in genomics, antimicrobial resistance, and point-of-care diagnostics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span><strong>Industry Connections:</strong> Partnerships with biotech companies, research institutions, and healthcare organizations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span><strong>Community Impact:</strong> Regular outreach programs to educate communities about health and biotechnology</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default About;
