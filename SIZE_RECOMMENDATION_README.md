# Size Recommendation & Get Measured Features

This document describes the implementation of two key features for the Kamisha storefront: **Size Recommendation** and **Get Measured**.

## Features Overview

### 1. Size Recommendation
- **Purpose**: Provides AI-powered size recommendations based on user body measurements
- **Features**:
  - Manual measurement input
  - Virtual measurement simulation
  - Interactive size chart with metric/imperial toggle
  - Confidence scoring and alternative size suggestions
  - Fit notes and recommendations

### 2. Get Measured
- **Purpose**: Virtual measurement tool using smartphone camera
- **Features**:
  - Step-by-step measurement wizard
  - Camera setup instructions
  - Simulated AI processing
  - Measurement results display

## Current Implementation Status

### ✅ Implemented (Mock)
- Complete UI flows for both features
- Mock data and services
- Responsive design with Tailwind CSS
- Step-by-step user experience
- Loading states and animations

### 🔄 Ready for API Integration
- Service interfaces defined
- Error handling structure
- Type definitions complete
- Mock services can be replaced with real APIs

## File Structure

```
src/modules/products/components/
├── size-recommendation/
│   ├── index.tsx                    # Main button component
│   ├── size-recommendation-modal.tsx # Modal with tabs and flows
│   ├── size-chart.tsx              # Interactive size chart
│   ├── measurement-form.tsx        # Manual measurement form
│   └── types.ts                    # Type definitions
├── get-measured/
│   └── index.tsx                   # Virtual measurement wizard
└── product-actions/
    └── index.tsx                   # Integration point

src/lib/data/
└── 3dlook.ts                       # Mock service (replace with real API)
```

## How to Use

### Size Recommendation
1. Click "Size Recommendation" button on product page
2. Choose measurement method:
   - **Manual**: Enter measurements using form
   - **Virtual**: Simulate camera-based measurement
3. View size chart and recommendations
4. Get confidence scores and fit notes

### Get Measured
1. Click "Get Measured" button on product page
2. Follow the 5-step wizard:
   - Introduction and overview
   - Camera setup instructions
   - Camera activation
   - Processing simulation
   - Results display
3. View captured measurements
4. Option to measure again or use results

## API Integration Guide

### When Real API Keys Are Available

#### 1. Replace Mock Service
Update `src/lib/data/3dlook.ts`:

```typescript
// Replace mock service with real implementation
export const threeDLookService = {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.THREEDLOOK_API_KEY!
    this.baseUrl = process.env.THREEDLOOK_BASE_URL!
  }

  async getSizeRecommendation(request: ThreeDLookRequest): Promise<ThreeDLookSizeRecommendation> {
    const response = await fetch(`${this.baseUrl}/size-recommendation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw new Error(`3DLOOK API error: ${response.statusText}`)
    }

    return response.json()
  }
}
```

#### 2. Environment Variables
Add to your `.env.local`:

```bash
THREEDLOOK_API_KEY=your_api_key_here
THREEDLOOK_BASE_URL=https://api.3dlook.me
```

#### 3. Update Components
Replace mock calls in components:

```typescript
// In size-recommendation-modal.tsx
const getSizeRecommendation = useCallback(async () => {
  // Replace mock service with real API call
  const recommendation = await threeDLookService.getSizeRecommendation({
    productId: product.id!,
    variantId: variant?.id,
    measurements: numericMeasurements,
  })
  // ... rest of the function
}, [measurements, product.id, variant?.id])
```

## Mock Data Structure

### Size Chart Data
```typescript
interface SizeChartData {
  size: string        // XS, S, M, L, XL, XXL
  chest: string       // "32-34" (inches) or "86-91" (cm)
  waist: string       // "26-28" (inches) or "71-76" (cm)
  hips: string        // "34-36" (inches) or "91-96" (cm)
  length: string      // "26-27" (inches) or "66" (cm)
  shoulders: string   // "14-15" (inches) or "41" (cm)
  sleeves: string     // "23-24" (inches) or "58" (cm)
}
```

### Body Measurements
```typescript
interface BodyMeasurements {
  height: string      // Height in cm
  weight: string      // Weight in kg
  chest: string       // Chest circumference in cm
  waist: string       // Waist circumference in cm
  hips: string        // Hips circumference in cm
  inseam: string      // Inseam length in cm
  shoulders: string   // Shoulder width in cm
  age: string         // Age in years
  gender: string      // 'male', 'female', 'other'
}
```

### Size Recommendation
```typescript
interface SizeRecommendation {
  recommendedSize: string      // Recommended size (e.g., "M")
  confidence: number           // Confidence percentage (0-100)
  alternativeSizes: string[]   // Alternative size options
  fitNotes: string[]          // Fit advice and notes
  measurements: BodyMeasurements
  productId: string
  variantId?: string
}
```

## Customization Options

### Styling
- All components use Tailwind CSS classes
- Color schemes can be modified in the component files
- Icons are from Lucide React (easily replaceable)

### Behavior
- Timing delays can be adjusted in mock services
- Step flows can be modified in the wizard components
- Validation rules can be updated in the measurement forms

### Data
- Mock size chart data can be customized for different product categories
- Measurement fields can be added/removed as needed
- Confidence calculation logic can be enhanced

## Testing

### Manual Testing
1. Navigate to any product page
2. Test both "Size Recommendation" and "Get Measured" buttons
3. Verify all modal flows work correctly
4. Test responsive behavior on different screen sizes
5. Verify loading states and error handling

### Unit Testing
Components are structured to be easily testable:
- Mock services can be injected for testing
- State management is clean and predictable
- Props interfaces are well-defined

## Future Enhancements

### Phase 2 (With Real APIs)
- Real AI-powered size recommendations
- Actual camera integration for measurements
- User measurement history
- Personalized fit preferences
- Integration with shopping cart

### Phase 3 (Advanced Features)
- Virtual try-on with user photos
- AR measurement tools
- Social sharing of fit results
- Machine learning for better recommendations
- Multi-language support

## Troubleshooting

### Common Issues

#### Modal Not Opening
- Check if Headless UI is properly installed
- Verify z-index values for modal positioning
- Check console for JavaScript errors

#### Measurements Not Saving
- Verify form validation is working
- Check if state updates are properly handled
- Ensure all required fields are filled

#### Size Chart Not Displaying
- Verify mock data is properly formatted
- Check if unit conversion is working
- Ensure table rendering is not blocked by CSS

### Debug Mode
Add console logs to mock services to debug timing and data flow:

```typescript
console.log('Mock service called with:', request)
console.log('Returning recommendation:', recommendation)
```

## Support

For questions or issues with these features:
1. Check this README first
2. Review the component code and types
3. Test with different product configurations
4. Verify all dependencies are installed

## Dependencies

- `@headlessui/react` - Modal and dialog components
- `@medusajs/ui` - Button and form components
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `typescript` - Type safety
