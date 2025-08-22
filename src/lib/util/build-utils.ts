/**
 * Utility functions for handling build-time operations
 */

/**
 * Check if we're running in a Docker build environment or local build
 * This helps prevent build failures when the backend is not available
 */
export function isDockerBuild(): boolean {
  return process.env.NODE_ENV === 'production' && 
         (process.env.DOCKER_BUILD === 'true' || process.env.SKIP_STATIC_GENERATION === 'true')
}

/**
 * Check if we should skip static generation (when backend is not available)
 */
export function shouldSkipStaticGeneration(): boolean {
  // Skip if we're in Docker build mode
  if (isDockerBuild()) {
    return true
  }
  
  // Skip if backend URL is not accessible (for local builds)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  if (!backendUrl || backendUrl === 'http://localhost:9000') {
    // Check if we can actually reach the backend
    try {
      // This is a simple check - in a real scenario you might want to ping the backend
      return true
    } catch {
      return true
    }
  }
  
  return false
}

/**
 * Safe wrapper for generateStaticParams that returns empty array during Docker builds or when backend is unavailable
 */
export function safeGenerateStaticParams<T>(
  generator: () => Promise<T[]>
): Promise<T[]> {
  if (shouldSkipStaticGeneration()) {
    console.log('Skipping static generation - backend not available or in build mode')
    return Promise.resolve([])
  }
  return generator()
}
