"use client"

import { useState, useEffect } from "react"
import { Button, Heading, Text } from "@medusajs/ui"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { heroImages } from "./hero-images"

type HeroSlide = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string // URL to image
  ctaText: string
  ctaLink: string
  ctaVariant: "primary" | "secondary"
}

const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Elegant Muslimah Fashion",
    subtitle: "Modest & Stylish",
    description: "Discover our beautiful collection of modest clothing designed for the modern Muslimah. From abayas to hijabs, find your perfect style.",
    image: heroImages.muslimahFashion.primary,
    ctaText: "Shop Muslimah Collection",
    ctaLink: "/collections",
    ctaVariant: "primary"
  },
  {
    id: "2",
    title: "Premium Abayas & Hijabs",
    subtitle: "Quality & Comfort",
    description: "Experience luxury in every stitch with our premium abayas and hijabs. Made from the finest materials for ultimate comfort and elegance.",
    image: heroImages.abayasHijabs.primary,
    ctaText: "View Abayas",
    ctaLink: "/store",
    ctaVariant: "secondary"
  },
  {
    id: "3",
    title: "Smart Size Recommendations",
    subtitle: "Perfect Fit Guaranteed",
    description: "Get accurate size recommendations with our AI-powered sizing system. Find your perfect fit for abayas, dresses, and more.",
    image: heroImages.sizeRecommendations.primary,
    ctaText: "Get Measured",
    ctaLink: "/store",
    ctaVariant: "primary"
  }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPlaying(false)
    // Resume auto-play after 3 seconds
    setTimeout(() => setIsPlaying(true), 3000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 3000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 3000)
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative h-[75vh] w-full overflow-hidden bg-ui-bg-subtle">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-8 small:p-16 medium:p-32 gap-4 small:gap-6">
            <div className="max-w-4xl mx-auto">
              <Text className="text-sm small:text-lg text-white/80 mb-2 small:mb-4 uppercase tracking-wider">
                {slide.subtitle}
              </Text>
              <Heading
                level="h1"
                className="text-2xl small:text-4xl medium:text-6xl leading-tight text-white font-bold mb-4 small:mb-6"
              >
                {slide.title}
              </Heading>
              <Text className="text-base small:text-xl text-white/90 mb-6 small:mb-8 max-w-2xl mx-auto px-4">
                {slide.description}
              </Text>
              <LocalizedClientLink href={slide.ctaLink}>
                <Button
                  variant={slide.ctaVariant}
                  size="large"
                  className="text-base small:text-lg px-6 small:px-8 py-3 small:py-4"
                >
                  {slide.ctaText}
                </Button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Fallback for missing images */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-20 pointer-events-none" />


    </div>
  )
}

export default Hero
