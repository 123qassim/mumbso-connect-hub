import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Mail, Phone, Lock } from "lucide-react";
import membersBg from "@/assets/members-bg.jpg";
import olilaProfile from "@/assets/olila-profile.jpg";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  const { data: leadership } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase.from("members").select("*").order("display_order");
      return data || [];
    },
  });

  const { data: community } = useQuery({
    queryKey: ["community_members", isAdmin],
    queryFn: async () => {
      if (isAdmin) {
        // Admins can see all data including contact info
        const { data } = await supabase
          .from("community_members")
          .select("*")
          .order("joined_at", { ascending: false });
        return data || [];
      } else {
        // Non-admins query without contact info columns (RLS enforces this at DB level)
        const { data } = await supabase
          .from("community_members")
          .select("id, name, course, year_of_study, interests, joined_at")
          .order("joined_at", { ascending: false });
        return data || [];
      }
    },
    enabled: !isAdminLoading && !!user, // Only fetch if user is authenticated
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={membersBg}
            alt="MUMBSO team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/75" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl font-bold mb-6 text-white">Our Team</h1>
          <p className="text-xl text-white/95">Meet the MUMBSO family</p>
        </div>
      </section>
      
      {/* Leadership Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {leadership?.map((m: any) => (
              <Card key={m.id}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-hero rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                    {m.image_url ? (
                      <img 
                        src={m.name.toLowerCase().includes('olila') ? olilaProfile : m.image_url} 
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      m.name.charAt(0)
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{m.name}</h3>
                  <p className="text-primary text-sm mb-2">{m.position}</p>
                  <p className="text-muted-foreground text-sm">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Members Section */}
      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Community Members</h2>
            <p className="text-muted-foreground">Our growing community of biotechnology enthusiasts</p>
            {isAdmin && (
              <Badge variant="secondary" className="mt-2">
                Admin View - Contact Info Visible
              </Badge>
            )}
          </div>
          
          {!user ? (
            // Not authenticated - show sign in prompt
            <div className="text-center py-12">
              <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Member Directory is Protected</h3>
              <p className="text-muted-foreground mb-6">
                Sign in to view our community members and connect with fellow biotechnology enthusiasts
              </p>
              <Button onClick={() => navigate("/auth")}>
                Sign In to View Members
              </Button>
            </div>
          ) : (
            // Authenticated - show members
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {community?.map((m: any) => (
                  <Card key={m.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                          {m.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base">{m.name}</h4>
                          {m.year_of_study && (
                            <p className="text-sm text-primary">{m.year_of_study}</p>
                          )}
                          {m.course && (
                            <p className="text-sm text-muted-foreground mt-1">{m.course}</p>
                          )}
                          {m.interests && (
                            <p className="text-xs text-muted-foreground mt-2 italic">
                              {m.interests}
                            </p>
                          )}
                          {isAdmin && m.email && (
                            <div className="mt-3 space-y-1">
                              <div className="flex items-center gap-2 text-xs">
                                <Mail className="w-3 h-3 text-primary" />
                                <a href={`mailto:${m.email}`} className="hover:underline">
                                  {m.email}
                                </a>
                              </div>
                              {m.phone && (
                                <div className="flex items-center gap-2 text-xs">
                                  <Phone className="w-3 h-3 text-primary" />
                                  <a href={`tel:${m.phone}`} className="hover:underline">
                                    {m.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {(!community || community.length === 0) && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No community members yet. Be the first to join!</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Members;
