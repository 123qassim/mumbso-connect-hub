import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Mail, Phone, Lock, Crown, BadgeCheck } from "lucide-react";
import membersBg from "@/assets/members-bg.jpg";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Leadership section definitions for role-only displays
const YEAR_REPRESENTATIVES = [
  { title: "Year 1 Representative" },
  { title: "Year 2 Representative" },
  { title: "Year 3 Representative" },
  { title: "Year 4 Representative" },
];

const TASK_FORCE_COMMITTEES = [
  { title: "Research Committee" },
  { title: "Outreach Committee" },
  { title: "Education Committee" },
  { title: "Events Committee" },
];

// Leadership roles hierarchy (for organizing and filtering)
const LEADERSHIP_HIERARCHY = {
  patron: "Patron",
  executive: "Executive Committee",
  deputy: "Deputy Secretary General",
};

// Leadership card component
const LeadershipCard = ({ member, isPrimary = false }: { member: any; isPrimary?: boolean }) => (
  <Card className={`h-full ${isPrimary ? 'md:col-span-2 lg:col-span-1' : ''}`}>
    <CardContent className="p-6 text-center h-full flex flex-col justify-center">
      {isPrimary && (
        <Crown className="w-6 h-6 mx-auto mb-2 text-amber-500" />
      )}
      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-hero rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
        {member.image_url ? (
          <img 
            src={member.image_url} 
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          member.name.charAt(0)
        )}
      </div>
      <h3 className="font-bold text-lg">{member.name}</h3>
      <p className="text-primary text-sm font-semibold mb-2">{member.position || member.title}</p>
      {member.bio && <p className="text-muted-foreground text-sm">{member.bio}</p>}
    </CardContent>
  </Card>
);

// Role-only card component
const RoleCard = ({ title }: { title: string }) => (
  <Card className="h-full">
    <CardContent className="p-6 text-center h-full flex flex-col justify-center">
      <h3 className="font-semibold text-base">{title}</h3>
    </CardContent>
  </Card>
);

const Members = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  // Fetch all leadership members from database
  const { data: allLeadership } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await supabase
        .from("members")
        .select("*")
        .order("display_order", { ascending: true });
      return data || [];
    },
  });

  // Fetch community members
  const { data: community } = useQuery({
    queryKey: ["community_members", isAdmin],
    queryFn: async () => {
      if (isAdmin) {
        const { data } = await supabase
          .from("community_members")
          .select("*")
          .order("joined_at", { ascending: false });
        return data || [];
      } else {
        const { data } = await supabase
          .from("community_members")
          .select("id, name, course, year_of_study, interests, joined_at")
          .order("joined_at", { ascending: false });
        return data || [];
      }
    },
    enabled: !isAdminLoading && !!user,
  });

  // Organize leadership by role/category - more flexible matching
  const patronMembers = allLeadership?.filter((m: any) => {
    const categoryMatch = m.category === "patron";
    const positionMatch = m.position && (
      m.position.toLowerCase().includes("patron") ||
      m.position.toLowerCase().includes("prof") && m.name?.includes("Collins")
    );
    const nameMatch = m.name && m.name.toLowerCase().includes("collins ouma");
    return categoryMatch || positionMatch || nameMatch;
  }) || [];
  
  const executiveMembers = allLeadership?.filter((m: any) => {
    const categoryMatch = m.category === "executive";
    const positionMatch = m.position && ["Chair", "Vice Chair", "Secretary General", "Organizing Secretary", "Secretary", "Treasurer"].some(role => m.position.includes(role));
    return categoryMatch || positionMatch;
  }) || [];
  
  const deputyMembers = allLeadership?.filter((m: any) => {
    const categoryMatch = m.category === "deputy";
    const positionMatch = m.position && m.position.includes("Deputy Secretary General");
    const nameMatch = m.name && m.name.includes("Brian Junior");
    return categoryMatch || positionMatch || nameMatch;
  }) || [];

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
          {/* Patron Section */}
          {patronMembers.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
                <Crown className="w-6 h-6 text-amber-500" />
                {LEADERSHIP_HIERARCHY.patron}
              </h2>
              <div className="max-w-sm mx-auto">
                {patronMembers.map((member: any) => (
                  <LeadershipCard
                    key={member.id}
                    member={member}
                    isPrimary={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Executive Leadership Section */}
          {executiveMembers.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
                <BadgeCheck className="w-6 h-6 text-primary" />
                {LEADERSHIP_HIERARCHY.executive}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {executiveMembers.map((member: any) => (
                  <LeadershipCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Deputy Secretary General Section */}
          {deputyMembers.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center">
                {LEADERSHIP_HIERARCHY.deputy}
              </h2>
              <div className="max-w-sm mx-auto">
                {deputyMembers.map((member: any) => (
                  <LeadershipCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Year Representatives Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Year Representatives</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Student representatives from each year level ensuring voice and representation across all class years.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {YEAR_REPRESENTATIVES.map((role, index) => (
                <RoleCard key={index} title={role.title} />
              ))}
            </div>
          </div>

          {/* Task Force Committee Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Task Force Committees</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Specialized committees dedicated to driving MUMBSO's core initiatives.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {TASK_FORCE_COMMITTEES.map((role, index) => (
                <RoleCard key={index} title={role.title} />
              ))}
            </div>
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
