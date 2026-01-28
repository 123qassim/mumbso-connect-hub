import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import galleryBg from "@/assets/gallery-bg.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";

const Gallery = () => {
  const galleryImages = [
    { src: gallery1, alt: "MUMBSO community group photo" },
    { src: gallery2, alt: "MUMBSO members outdoor gathering" },
    { src: gallery3, alt: "MUMBSO meeting session" },
    { src: gallery4, alt: "Certificate award ceremony" },
    { src: gallery5, alt: "Tree planting environmental activity" },
    { src: gallery6, alt: "MUMBSO members in lab coats" },
    { src: gallery7, alt: "Students in classroom session" },
    { src: gallery8, alt: "MUMBSO group photo at campus gazebo" },
    { src: gallery9, alt: "Certificate presentation ceremony" },
    { src: gallery10, alt: "MUMBSO members outdoor group photo" },
    { src: gallery11, alt: "Students in lab coats outdoor gathering" },
    { src: gallery12, alt: "MUMBSO members campus group photo" },
  ];

  return (
    <>
      <SEO
        title="Photo Gallery - MUMBSO Events & Activities"
        description="Browse photos from MUMBSO workshops, labs, outreach events, conferences, and student activities. See our community impact through images."
        keywords="MUMBSO photos, biotech events, lab workshops, student activities, community outreach"
      />
      <div className="min-h-screen bg-background">
      <Header />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={galleryBg}
            alt="MUMBSO photo gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/75" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl font-bold mb-6 text-white">Gallery</h1>
          <p className="text-xl text-white/95">Photos from our events and activities</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-5xl">
          <Carousel className="w-full">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default Gallery;
