import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { LogOut, User, Calendar, BookOpen, Zap, Settings, Users, Download, Mail, Phone, Briefcase, MapPin } from "lucide-react";
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
        const { data: eventRegs, error: regError } = await supabase
          .from("event_registrations")
          .select("*")
          .eq("user_email", user.email);

        if (regError) {
          console.error("Error fetching registered events:", regError);
        }

        if (eventRegs && eventRegs.length > 0) {
          // Fetch event details for all registered events
          const eventIds = eventRegs.map(reg => reg.event_id);
          const { data: eventDetails } = await supabase
            .from("events")
            .select("id, title, date, location")
            .in("id", eventIds);

          if (eventDetails) {
            const registered = eventRegs.map((reg: any) => {
              const event = eventDetails.find(e => e.id === reg.event_id);
              return {
                id: reg.id,
                event_id: reg.event_id,
                title: event?.title || "Event",
                date: event?.date || "",
                location: event?.location || ""
              };
            });
            setRegisteredEvents(registered);
            console.log("Registered events loaded:", registered);
          }
        }
      } catch (error) {
        console.error("Error in fetchProfile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading, navigate]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const profileCompletion = profile
    ? [
        profile.first_name,
        profile.surname,
        profile.email,
        profile.phone,
        profile.course,
        profile.year_of_study,
      ].filter(Boolean).length * (100 / 6)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Dashboard - MUMBSO Connect Hub"
        description="Manage your MUMBSO profile and registered events."
      />
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="md:col-span-2">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    {profile?.first_name} {profile?.surname}
                  </CardTitle>
                  <CardDescription className="text-base flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {profile?.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Course
                  </p>
                  <p className="font-semibold">{profile?.course || "Not specified"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Year of Study
                  </p>
                  <p className="font-semibold">{profile?.year_of_study || "Not specified"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </p>
                  <p className="font-semibold">{profile?.phone || "Not specified"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Member Status
                  </p>
                  <p className="font-semibold">{profile?.is_alumni ? "Alumni" : "Active Member"}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Profile Completion</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{Math.round(profileCompletion)}% complete</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => navigate("/dashboard/profile")}
                  className="flex-1 flex items-center gap-2"
                  variant="outline"
                >
                  <User className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex-1 flex items-center gap-2"
                  variant="destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{upcomingEvents}</div>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 mt-2">
                  <Calendar className="h-4 w-4" />
                  Upcoming Events
                </p>
              </div>
              <div className="text-center pt-4 border-t">
                <div className="text-3xl font-bold text-primary">{registeredEvents.length}</div>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 mt-2">
                  <Zap className="h-4 w-4" />
                  Registered Events
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registered Events Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Your Registered Events
              </CardTitle>
              <Button
                onClick={() => navigate("/events")}
                variant="outline"
                size="sm"
              >
                Browse All Events
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {registeredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registeredEvents.map((event) => (
                  <Card key={event.id} className="border">
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold line-clamp-2">{event.title}</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          {event.location && (
                            <p className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </p>
                          )}
                        </div>
                        <div className="pt-3 border-t">
                          <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                            ✓ Registered
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
                <Button onClick={() => navigate("/events")} variant="hero">
                  Explore Events
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
