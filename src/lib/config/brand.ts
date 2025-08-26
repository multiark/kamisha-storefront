// Kamisha Brand Configuration
// Note: CSS variables are now defined in globals.css
export const brandConfig = {
  // Brand Information
  name: "Kamisha",
  tagline: "Elegant Muslimah Fashion",
  description: "Premium modest clothing for the modern Muslimah",
  
  // Color Palette
  colors: {
    primary: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899", // Main primary color
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
    },
    secondary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9", // Main secondary color
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    accent: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308", // Main accent color
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: "Inter, system-ui, sans-serif",
      secondary: "Poppins, system-ui, sans-serif",
      display: "Playfair Display, serif",
    },
    fontSize: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem",  // 36px
      "5xl": "3rem",     // 48px
      "6xl": "3.75rem",  // 60px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  // Spacing System
  spacing: {
    xs: "0.25rem",   // 4px
    sm: "0.5rem",    // 8px
    md: "1rem",      // 16px
    lg: "1.5rem",    // 24px
    xl: "2rem",      // 32px
    "2xl": "3rem",   // 48px
    "3xl": "4rem",   // 64px
    "4xl": "6rem",   // 96px
    "5xl": "8rem",   // 128px
  },
  
  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.125rem",  // 2px
    base: "0.25rem", // 4px
    md: "0.375rem",  // 6px
    lg: "0.5rem",    // 8px
    xl: "0.75rem",   // 12px
    "2xl": "1rem",   // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },
  
  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
  
  // Breakpoints
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  
  // Animation
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
}

// Utility functions
export const getBrandColor = (colorName: string, shade: string = "500") => {
  const color = brandConfig.colors[colorName as keyof typeof brandConfig.colors]
  if (typeof color === "string") return color
  return color[shade as keyof typeof color] || color["500"]
}

export const getBrandSpacing = (size: string) => {
  return brandConfig.spacing[size as keyof typeof brandConfig.spacing] || "1rem"
}

export const getBrandFontSize = (size: string) => {
  return brandConfig.typography.fontSize[size as keyof typeof brandConfig.typography.fontSize] || "1rem"
}
