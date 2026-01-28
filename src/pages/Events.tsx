import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { EventCalendar } from "@/components/EventCalendar";
import eventsBg from "@/assets/events-bg.jpg";

const Events = () => {
  return (
    <>
      <SEO
        title="Events - Workshops, Seminars & Conferences"
        description="Join MUMBSO events including biotech workshops, research seminars, conferences, and networking opportunities. Register for upcoming events."
        keywords="biotech events, workshops, seminars, conferences, MUMBSO activities, student events"
      />
      <div className="min-h-screen bg-background">
      <Header />

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={eventsBg}
            alt="Biotechnology conference and events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Events & Activities
          </h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto">
            Join us for workshops, seminars, and conferences on medical biotechnology
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <EventCalendar />
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Events;
