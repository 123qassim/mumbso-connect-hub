import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, isSameDay } from "date-fns";
import { MapPin, Clock, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import seminarBanner from "@/assets/seminar-banner.jpg";

export const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      return data || [];
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ eventId, userName, userEmail }: { eventId: string; userName: string; userEmail: string }) => {
      const { error } = await supabase
        .from("event_registrations")
        .insert({ event_id: eventId, user_name: userName, user_email: userEmail });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Successfully registered for the event!");
      setName("");
      setEmail("");
      setSelectedEvent(null);
      queryClient.invalidateQueries({ queryKey: ["event_registrations"] });
    },
    onError: (error: any) => {
      if (error.message.includes("duplicate")) {
        toast.error("You're already registered for this event!");
      } else {
        toast.error("Failed to register. Please try again.");
      }
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !name || !email) return;
    registerMutation.mutate({
      eventId: selectedEvent.id,
      userName: name,
      userEmail: email,
    });
  };

  const eventsOnSelectedDate = events?.filter((event) => 
    selectedDate && isSameDay(new Date(event.event_date), selectedDate)
  ) || [];

  const eventDates = events?.map((event) => new Date(event.event_date)) || [];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Select Event Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              event: eventDates,
            }}
            modifiersStyles={{
              event: {
                backgroundColor: "hsl(var(--primary))",
                color: "white",
                fontWeight: "bold",
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eventsOnSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {eventsOnSelectedDate.map((event) => {
                const isSeminar = event.title?.includes("Joint Seminar");
                return (
                  <Card key={event.id} className="border-2 overflow-hidden">
                    {isSeminar && (
                      <img 
                        src={seminarBanner} 
                        alt="Joint Seminar"
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {event.event_type}
                        </span>
                      </div>
                      <h3 className="font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{format(new Date(event.event_date), "p")}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full" 
                            variant="hero"
                            onClick={() => setSelectedEvent(event)}
                          >
                            Register Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Register for {event.title}</DialogTitle>
                            <DialogDescription>
                              Fill in your details to register for this event. You'll receive a confirmation email.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                              {registerMutation.isPending ? "Registering..." : "Complete Registration"}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No events scheduled for this date. Select a highlighted date to see events.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
