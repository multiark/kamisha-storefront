import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { brandConfig } from "@lib/config/brand"

type LogoProps = {
  variant?: "default" | "compact" | "full"
  className?: string
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  const logoContent = () => {
    switch (variant) {
      case "compact":
        return (
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Kamisha Logo" 
              className="h-8 w-auto"
            />
          </div>
        )
      case "full":
        return (
          <div className="flex flex-col items-center space-y-1">
            <img 
              src="/logo.png" 
              alt="Kamisha Logo" 
              className="h-12 w-auto"
            />
            <Text className="text-xs text-ui-fg-subtle">{brandConfig.tagline}</Text>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Kamisha Logo" 
              className="h-10 w-auto"
            />
            <Text className="text-xs text-ui-fg-subtle hidden small:block">{brandConfig.tagline}</Text>
          </div>
        )
    }
  }

  return (
    <LocalizedClientLink href="/" className={`inline-block ${className}`}>
      {logoContent()}
    </LocalizedClientLink>
  )
}
