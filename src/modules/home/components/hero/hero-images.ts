// Hero image configuration with fallbacks
export const heroImages = {
  muslimahFashion: {
    primary: "https://plus.unsplash.com/premium_photo-1680012590879-39a8ec7c7cea?q=80&w=800&fit=crop&crop=center",
    fallback: "/images/hero/muslimah-fashion-fallback.jpg",
    alt: "Elegant Muslimah fashion collection"
  },
  abayasHijabs: {
    primary: "https://plus.unsplash.com/premium_photo-1681492187779-5b021b43f4de?q=80&w=800&fit=crop&crop=center",
    fallback: "/images/hero/abayas-hijabs-fallback.jpg",
    alt: "Premium abayas and hijabs"
  },
  sizeRecommendations: {
    primary: "https://images.unsplash.com/photo-1681151730474-bd3ddbd3c9cf?q=80&w=800&fit=crop&crop=center",
    fallback: "/images/hero/size-recommendations-fallback.jpg",
    alt: "Smart size recommendations"
  }
}

// Function to get image with fallback
export const getHeroImage = (imageKey: keyof typeof heroImages) => {
  const image = heroImages[imageKey]
  return {
    src: image.primary,
    fallback: image.fallback,
    alt: image.alt
  }
}
