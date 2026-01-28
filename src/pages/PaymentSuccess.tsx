import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast({
          title: "Error",
          description: "No session ID found",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Please log in",
            description: "You need to be logged in to verify payment",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        const { data, error } = await supabase.functions.invoke("verify-payment", {
          body: { sessionId },
        });

        if (error) throw error;

        if (data.success) {
          toast({
            title: "Payment Successful!",
            description: "Your membership has been activated",
          });
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast({
          title: "Verification Error",
          description: "There was an issue verifying your payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, toast, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Payment Success - MUMBSO"
        description="Your membership payment was successful"
      />
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container max-w-md">
          <div className="bg-card rounded-lg shadow-lg p-8 text-center">
            {isVerifying ? (
              <>
                <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin text-primary" />
                <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment...
                </p>
              </>
            ) : (
              <>
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-muted-foreground mb-6">
                  Thank you for joining MUMBSO. Your membership is now active.
                </p>
                <div className="space-y-3">
                  <Button onClick={() => navigate("/dashboard")} className="w-full">
                    View Dashboard
                  </Button>
                  <Button onClick={() => navigate("/")} variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
