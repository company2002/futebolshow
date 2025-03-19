import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  playerName?: string;
  playerPosition?: string;
  playerTeam?: string;
  imageUrl?: string;
  canonicalUrl?: string;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title = "Professional Football Player Profile | Player Showcase",
  description = "View the professional profile, statistics, and highlights of this talented football player. Contact for professional opportunities and partnerships.",
  keywords = "football player, professional footballer, player statistics, football talent, soccer player profile",
  playerName = "João Silva",
  playerPosition = "Forward",
  playerTeam = "FC Barcelona",
  imageUrl = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80",
  canonicalUrl = typeof window !== "undefined" ? window.location.href : "",
}) => {
  // Update document title when component mounts or title changes
  useEffect(() => {
    document.title = title;
  }, [title]);

  // Structured data for better search engine understanding
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: playerName,
    jobTitle: `Professional Football Player - ${playerPosition}`,
    affiliation: playerTeam,
    image: imageUrl,
    description: description,
    url: canonicalUrl,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="profile" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags for Football Player Profile */}
      <meta name="player:name" content={playerName} />
      <meta name="player:position" content={playerPosition} />
      <meta name="player:team" content={playerTeam} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOOptimizer;
