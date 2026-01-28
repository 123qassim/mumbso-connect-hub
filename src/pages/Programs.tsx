import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dna, Brain, Microscope, ShieldCheck, Users, Laptop } from "lucide-react";
import genomicsImage from "@/assets/genomics.jpg";
import programsBg from "@/assets/programs-bg.jpg";

const Programs = () => {
  const programs = [
    {
      icon: Dna,
      title: "Genomics & Sequencing Workshops",
      description: "Hands-on training in DNA extraction, PCR, gel electrophoresis, and next-generation sequencing technologies. Learn to analyze genomic data and understand genetic variations.",
      topics: [
        "DNA sequencing techniques",
        "Genomic data analysis",
        "CRISPR and gene editing",
        "Population genomics"
      ]
    },
    {
      icon: Laptop,
      title: "Bioinformatics & Computational Biology",
      description: "Master computational tools for analyzing biological data. Learn programming languages like Python and R, and use bioinformatics databases and software.",
      topics: [
        "Python for bioinformatics",
        "Sequence alignment algorithms",
        "Phylogenetic analysis",
        "Genomic databases (NCBI, UniProt)"
      ]
    },
    {
      icon: Brain,
      title: "Machine Learning & AI in Healthcare",
      description: "Explore artificial intelligence applications in medical diagnostics, drug discovery, and personalized medicine. Build predictive models for disease detection.",
      topics: [
        "Neural networks for diagnosis",
        "Drug discovery with AI",
        "Medical image analysis",
        "Predictive healthcare models"
      ]
    },
    {
      icon: Microscope,
      title: "Laboratory Safety & Research Ethics",
      description: "Essential training in laboratory safety protocols, biosafety levels, and ethical research practices. Understanding regulatory compliance and responsible research conduct.",
      topics: [
        "Biosafety guidelines (BSL-1 to BSL-4)",
        "Chemical safety protocols",
        "Research ethics and integrity",
        "Waste disposal procedures"
      ]
    },
    {
      icon: Users,
      title: "Community Health Outreach Projects",
      description: "Engage with communities to promote health awareness and disease prevention. Conduct health camps, awareness campaigns, and educational programs.",
      topics: [
        "Infectious disease prevention",
        "Antimicrobial resistance awareness",
        "Health screening camps",
        "Biotechnology education"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Antimicrobial Resistance Surveillance",
      description: "Learn to identify, track, and analyze antimicrobial resistance patterns. Use molecular techniques and computational tools to monitor resistance trends.",
      topics: [
        "Antibiotic susceptibility testing",
        "Resistance gene identification",
        "Epidemiological surveillance",
        "AMR data analysis"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={programsBg}
            alt="Biotechnology training programs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/85 to-accent/75" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Programs & Activities
          </h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto">
            Comprehensive training programs designed to equip students with cutting-edge skills in medical biotechnology and information technology
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="border-2 hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                    <program.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Topics:</h4>
                    <ul className="space-y-1">
                      {program.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="inline-block mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Program */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Specialized Training Programs
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                MUMBSO offers specialized workshops and training sessions throughout the academic year. These programs are designed by industry experts and academic professionals to ensure students gain practical, real-world skills.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                All programs include:
              </p>
              <ul className="space-y-2 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Hands-on laboratory sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Expert-led lectures and demonstrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Networking opportunities with professionals</span>
                </li>
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={genomicsImage}
                alt="Genomics and DNA visualization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
