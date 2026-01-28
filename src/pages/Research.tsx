import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ExternalLink, Award } from "lucide-react";
import researchBg from "@/assets/research-bg.jpg";

const Research = () => {
  const { data: publications } = useQuery({
    queryKey: ["research_publications"],
    queryFn: async () => {
      const { data } = await supabase
        .from("research_publications")
        .select("*")
        .order("publication_date", { ascending: false });
      return data || [];
    },
  });

  const featuredPublications = publications?.filter(p => p.featured) || [];
  const allPublications = publications || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={researchBg}
            alt="Advanced medical research laboratory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl font-bold mb-6 text-white">Research & Projects</h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto">Student-led research advancing medical biotechnology</p>
        </div>
      </section>
      {featuredPublications.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Featured Research</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPublications.map((pub) => (
                <Card key={pub.id} className="border-2 border-primary/20 hover:shadow-card transition-all hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl">{pub.title}</CardTitle>
                      <Badge variant="secondary" className="shrink-0">Featured</Badge>
                    </div>
                    {pub.category && (
                      <Badge variant="outline" className="w-fit">{pub.category}</Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{pub.description}</p>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Authors: {pub.author_names}</p>
                      {pub.publication_date && (
                        <p className="text-muted-foreground">
                          Published: {format(new Date(pub.publication_date), "MMMM d, yyyy")}
                        </p>
                      )}
                    </div>
                    {pub.publication_url && (
                      <Button variant="hero" className="w-full mt-4" asChild>
                        <a href={pub.publication_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Publication
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">All Research Publications</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPublications.map((pub) => (
              <Card key={pub.id} className="border-2 hover:shadow-card transition-all hover-scale">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{pub.title}</CardTitle>
                  {pub.category && (
                    <Badge variant="outline" className="w-fit">{pub.category}</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{pub.description}</p>
                  <p className="text-sm font-medium mb-2">By {pub.author_names}</p>
                  {pub.publication_date && (
                    <p className="text-xs text-muted-foreground mb-3">
                      {format(new Date(pub.publication_date), "MMM yyyy")}
                    </p>
                  )}
                  {pub.publication_url && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={pub.publication_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Read More
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Research;
