import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (!authLoading && !isAdminLoading) {
      if (!user) {
        navigate("/auth");
        return;
      }
      if (!isAdmin) {
        navigate("/");
        toast.error("You don't have admin access");
        return;
      }
    }
  }, [user, isAdmin, authLoading, isAdminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchEvents();
    }
  }, [isAdmin]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to load events");
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load events");
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
        return;
      }

      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete event");
    }
  };

  if (authLoading || isAdminLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Admin Dashboard - MUMBSO Connect Hub"
        description="Manage events and website content"
      />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage events and website content</p>
          </div>
          <Button onClick={() => navigate("/admin/add-event")} size="lg" variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add New Event
          </Button>
        </div>

        {/* Events Management Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              All Events ({events.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingEvents ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No events yet. Create your first event to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Title</th>
                      <th className="text-left py-3 px-4 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 font-semibold">Location</th>
                      <th className="text-right py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b hover:bg-secondary/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3 px-4">{event.location}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => navigate(`/admin/edit-event/${event.id}`)}
                              size="sm"
                              variant="outline"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteEvent(event.id)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
