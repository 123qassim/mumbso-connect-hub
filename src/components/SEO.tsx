import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title = "MUMBSO - Maseno University Medical Biotechnology Students Organization",
  description = "Join MUMBSO to explore biotechnology research, engage in hands-on lab experiences, and connect with industry professionals. Advancing medical biotechnology education and research.",
  keywords = "MUMBSO, medical biotechnology, biotechnology, research, Maseno University, biotech students, laboratory, scientific research, Kenya",
  image = "/og-image.jpg",
  url = window.location.href,
}: SEOProps) => {
  const siteTitle = title.includes("MUMBSO") ? title : `${title} | MUMBSO`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
