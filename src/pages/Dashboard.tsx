import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { LogOut, User, Calendar, BookOpen, Zap, Settings, Users, Download, Mail, Phone, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  first_name: string;
  surname: string;
  email: string;
  phone: string;
  year_of_study: string;
  course: string;
  interests: string;
  is_alumni: boolean;
  avatar_url: string | null;
  created_at: string;
}

interface RegisteredEvent {
  id: string;
  event_id: string;
  title: string;
  date: string;
  location: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);

  useEffect(() => {
    // Wait for auth loading to complete before redirecting
    if (authLoading) {
      return;
    }

    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error);
        }

        if (data) {
          setProfile(data);
        }

        // Fetch upcoming events count
        const { count } = await supabase
          .from("events")
          .select("*", { count: "exact", head: true })
          .gte("date", new Date().toISOString());

        if (count !== null) {
          setUpcomingEvents(count);
        }

        // Fetch user's registered events
        const { data: eventRegs } = await supabase
          .from("event_registrations")
          .select(`
            id,
            event_id,
            events:event_id(title, date, location)
          `)
          .eq("user_email", user.email);

        if (eventRegs) {
          const registered = eventRegs.map((reg: any) => ({
            id: reg.id,
            event_id: reg.event_id,
            title: reg.events?.title || "Event",
            date: reg.events?.date || "",
            location: reg.events?.location || ""
          }));
          setRegisteredEvents(registered);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate, authLoading]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "See you soon!" });
    navigate("/");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const completionPercentage = profile
    ? Math.round(
        (
          Number(!!profile.avatar_url) +
          Number(!!profile.phone) +
          Number(!!profile.interests) +
          Number(!!profile.year_of_study)
        ) / 4 * 100
      )
    : 0;

  const quickStats = [
    { icon: Users, label: "Community Members", value: "150+", color: "bg-primary/10 text-primary" },
    { icon: Calendar, label: "Upcoming Events", value: upcomingEvents, color: "bg-accent/10 text-accent" },
    { icon: BookOpen, label: "Research Papers", value: "45+", color: "bg-secondary/10 text-secondary" },
    { icon: Zap, label: "Active Programs", value: "8", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Your Dashboard - MUMBSO Member"
        description="Welcome to your MUMBSO membership dashboard. View your profile, manage settings, and discover member benefits."
      />
      <Header />

      <section className="relative py-12 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome, {profile?.first_name || "Member"}!
              </h1>
              <p className="text-white/90">
                Your membership is active. Explore all the benefits and opportunities available to you.
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-accent/5">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 border-b">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Profile</CardTitle>
                  <CardDescription>Your membership information and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start justify-between pb-6 border-b">
                    <div>
                      <div className="flex items-center gap-4">
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt={profile?.first_name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-8 h-8 text-primary" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold">
                            {profile?.first_name} {profile?.surname}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {profile?.is_alumni ? "Alumni Member" : "Active Member"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate("/profile")}
                      variant="outline"
                      size="sm"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-semibold text-muted-foreground">Email</p>
                      </div>
                      <p className="font-medium">{profile?.email}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-semibold text-muted-foreground">Phone</p>
                      </div>
                      <p className="font-medium">{profile?.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-semibold text-muted-foreground">Course</p>
                      </div>
                      <p className="font-medium">{profile?.course}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-semibold text-muted-foreground">Status</p>
                      </div>
                      <p className="font-medium">
                        {profile?.is_alumni ? "Alumni" : profile?.year_of_study || "Not set"}
                      </p>
                    </div>
                  </div>

                  {profile?.interests && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3">Areas of Interest</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.split(", ").map((interest) => (
                          <div key={interest} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {interest}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Membership Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Membership Benefits</CardTitle>
                  <CardDescription>Access these exclusive member resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Exclusive Events</h4>
                        <p className="text-sm text-muted-foreground">Attend member-only workshops, seminars, and networking events.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                      <BookOpen className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Research Resources</h4>
                        <p className="text-sm text-muted-foreground">Access to research papers, publications, and academic materials.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg border border-accent/10">
                      <Users className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Community Network</h4>
                        <p className="text-sm text-muted-foreground">Connect with 150+ biotechnology students and professionals.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Profile Completion
                </CardTitle>
                <CardDescription>Complete your profile for best experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Completion Status</span>
                    <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded ${profile?.avatar_url ? "bg-primary" : "bg-muted"}`} />
                    <span className={profile?.avatar_url ? "text-foreground" : "text-muted-foreground"}>
                      Profile Picture
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded ${profile?.phone ? "bg-primary" : "bg-muted"}`} />
                    <span className={profile?.phone ? "text-foreground" : "text-muted-foreground"}>
                      Phone Number
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded ${profile?.interests ? "bg-primary" : "bg-muted"}`} />
                    <span className={profile?.interests ? "text-foreground" : "text-muted-foreground"}>
                      Areas of Interest
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded ${profile?.year_of_study ? "bg-primary" : "bg-muted"}`} />
                    <span className={profile?.year_of_study ? "text-foreground" : "text-muted-foreground"}>
                      Academic Status
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/profile")}
                  className="w-full"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Complete Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Your Registered Events</h2>
          {registeredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="border-2">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium w-fit">
                      Registered
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">No events registered yet. <Button variant="link" onClick={() => navigate("/events")}>Explore events</Button></p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12 bg-accent/5">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/events")}>
                  <Calendar className="w-6 h-6" />
                  <span>Browse Events</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Download className="w-6 h-6" />
                  <span>Download Resources</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/members")}>
                  <Users className="w-6 h-6" />
                  <span>View Community</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
