"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type HeroPlaceholderProps = {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
  ctaVariant: "primary" | "secondary"
  gradient: string
}

const HeroPlaceholder = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  ctaVariant,
  gradient,
}: HeroPlaceholderProps) => {
  return (
    <div className="relative h-[75vh] w-full overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${gradient}`} />
      
      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <div className="max-w-4xl mx-auto">
          <Text className="text-lg text-white/80 mb-4 uppercase tracking-wider">
            {subtitle}
          </Text>
          <Heading
            level="h1"
            className="text-4xl small:text-6xl leading-tight text-white font-bold mb-6"
          >
            {title}
          </Heading>
          <Text className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {description}
          </Text>
          <LocalizedClientLink href={ctaLink}>
            <Button
              variant={ctaVariant}
              size="large"
              className="text-lg px-8 py-4"
            >
              {ctaText}
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default HeroPlaceholder
