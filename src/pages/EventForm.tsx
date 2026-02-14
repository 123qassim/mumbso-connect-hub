import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

const EventForm = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const isEditing = !!eventId;

  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(isEditing);

  useEffect(() => {
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
    if (isEditing && eventId) {
      fetchEvent(eventId);
    }
  }, [isEditing, eventId]);

  const fetchEvent = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event");
        return;
      }

      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load event");
    } finally {
      setIsLoadingEvent(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing && eventId) {
        // Update existing event
        const { error } = await supabase
          .from("events")
          .update({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            location: formData.location,
          })
          .eq("id", eventId);

        if (error) {
          console.error("Error updating event:", error);
          toast.error("Failed to update event");
          return;
        }

        toast.success("Event updated successfully");
      } else {
        // Create new event
        const { error } = await supabase
          .from("events")
          .insert({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            location: formData.location,
          });

        if (error) {
          console.error("Error creating event:", error);
          toast.error("Failed to create event");
          return;
        }

        toast.success("Event created successfully");
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isAdminLoading || isLoadingEvent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isEditing ? "Edit Event" : "Add Event"}
        description="Manage event details"
      />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate("/admin")}
          variant="outline"
          size="sm"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Event" : "Create New Event"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  placeholder="e.g., MUMBSO Hike"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Event details and registration link if applicable"
                  required
                  className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  placeholder="e.g., KIMA HILLS"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="hero"
                  className="flex-1"
                >
                  {isLoading ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/admin")}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default EventForm;
