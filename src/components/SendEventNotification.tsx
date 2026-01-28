import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";

interface SendEventNotificationProps {
  eventId: string;
  eventTitle: string;
}

export const SendEventNotification = ({ eventId, eventTitle }: SendEventNotificationProps) => {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendNotification = async () => {
    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-event-notification', {
        body: { eventId }
      });

      if (error) throw error;

      toast({
        title: "Notifications Sent!",
        description: `Successfully sent ${data.successful} email notifications for "${eventTitle}"`,
      });
    } catch (error: any) {
      console.error('Error sending notifications:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send notifications",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button 
      onClick={handleSendNotification} 
      disabled={isSending}
      size="sm"
      className="gap-2"
    >
      <Mail className="h-4 w-4" />
      {isSending ? "Sending..." : "Notify Users"}
    </Button>
  );
};
