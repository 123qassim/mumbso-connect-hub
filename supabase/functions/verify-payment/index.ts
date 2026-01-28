import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user) throw new Error("User not authenticated");

    const { sessionId } = await req.json();
    if (!sessionId) throw new Error("Session ID is required");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const tierId = session.metadata?.tier_id;
      const userId = session.metadata?.user_id;

      if (userId !== user.id) {
        throw new Error("Session user mismatch");
      }

      // Get tier details for duration
      const { data: tier } = await supabaseClient
        .from("membership_tiers")
        .select("duration_months")
        .eq("id", tierId)
        .single();

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + (tier?.duration_months || 12));

      // Create membership record
      const { error: membershipError } = await supabaseClient
        .from("memberships")
        .insert({
          user_id: userId,
          tier_id: tierId,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: "active",
        });

      if (membershipError) throw membershipError;

      // Create payment record
      await supabaseClient.from("payments").insert({
        user_id: userId,
        membership_id: null, // Will be updated with trigger if needed
        amount: session.amount_total! / 100,
        currency: session.currency!,
        payment_method: "stripe",
        payment_status: "completed",
        transaction_id: session.payment_intent as string,
      });

      return new Response(
        JSON.stringify({ success: true, message: "Membership activated" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Payment not completed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
