# Virtual Try-On & Size Recommendation Feature

This document describes the implementation of the Virtual Try-On and Size Recommendation features for the Medusa storefront using Zakeke as the service provider.

## Features Overview

### 1. Virtual Try-On
- **Camera Integration**: Access device camera for photo capture
- **Product Overlay**: Visualize products on user photos
- **Image Processing**: AI-powered virtual try-on using Zakeke
- **Download & Share**: Save and share try-on results

### 2. Size Recommendation
- **Body Measurements**: Comprehensive measurement form
- **AI Sizing**: Machine learning-based size recommendations
- **Size Charts**: Interactive size charts with measurement guides
- **Unit Conversion**: Support for metric and imperial units

## Architecture

```
storefront/src/
├── modules/products/components/
│   ├── virtual-try-on/           # Virtual try-on components
│   │   ├── index.tsx            # Main button component
│   │   ├── virtual-try-on-modal.tsx  # Try-on modal
│   │   └── types.ts             # Type definitions
│   ├── size-recommendation/      # Size recommendation components
│   │   ├── index.tsx            # Size recommendation button
│   │   ├── size-recommendation-modal.tsx  # Size modal
│   │   ├── measurement-form.tsx  # Measurement input form
│   │   ├── size-chart.tsx        # Size chart display
│   │   └── types.ts              # Type definitions
│   └── product-actions/          # Updated product actions
│       └── index.tsx             # Integrated with both features
├── lib/
│   ├── data/
│   │   └── zakeke.ts            # Zakeke API service
│   └── config/
│       └── zakeke.ts            # Zakeke configuration
```

## Components

### Virtual Try-On Button (`virtual-try-on/index.tsx`)
- Entry point for virtual try-on feature
- Positioned above variant selection in product actions
- Integrates with selected product variant

### Virtual Try-On Modal (`virtual-try-on/virtual-try-on-modal.tsx`)
- Full-screen modal for try-on experience
- Camera access and photo capture
- Product preview and overlay
- Integration with Zakeke API

### Size Recommendation Button (`size-recommendation/index.tsx`)
- Entry point for size recommendation feature
- Positioned adjacent to virtual try-on button
- Quick access to sizing tools

### Size Recommendation Modal (`size-recommendation/size-recommendation-modal.tsx`)
- Tabbed interface for measurements, size chart, and recommendations
- Comprehensive measurement form
- AI-powered size suggestions

### Measurement Form (`size-recommendation/measurement-form.tsx`)
- Input fields for body measurements
- Unit conversion (metric/imperial)
- Validation and user guidance

### Size Chart (`size-recommendation/size-chart.tsx`)
- Interactive size chart display
- Measurement instructions
- Unit toggle functionality

## Zakeke Integration

### Service Layer (`lib/data/zakeke.ts`)
- API client for Zakeke services
- Session management for try-on
- Size recommendation algorithms
- Error handling and retry logic

### Configuration (`lib/config/zakeke.ts`)
- Environment variable management
- Feature flags and UI controls
- API endpoint configuration
- Validation and health checks

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Zakeke API Configuration
NEXT_PUBLIC_ZAKEKE_API_KEY=your_zakeke_api_key_here
NEXT_PUBLIC_ZAKEKE_API_URL=https://api.zakeke.com/v2
NEXT_PUBLIC_ZAKEKE_TENANT_ID=your_tenant_id_here
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd storefront
yarn install
```

### 2. Configure Environment
- Copy environment variables to `.env.local`
- Obtain Zakeke API credentials
- Configure tenant ID

### 3. Test Features
- Navigate to a product detail page
- Click "Virtual Try On" or "Size Recommendation" buttons
- Test camera access and measurement forms

## Usage

### Virtual Try-On
1. Click "Virtual Try On" button on product page
2. Allow camera access when prompted
3. Take a photo or upload an image
4. Wait for AI processing
5. View try-on result
6. Download or share the result

### Size Recommendation
1. Click "Size Recommendation" button
2. Fill in body measurements
3. Toggle between metric/imperial units
4. Submit for AI analysis
5. View size recommendation with confidence level
6. Check alternative sizes and fit notes

## API Integration

### Virtual Try-On Flow
```
1. Create Try-On Session
   POST /try-on/sessions
   
2. Process Try-On
   POST /try-on/sessions/{sessionId}/process
   
3. Get Results
   GET /try-on/sessions/{sessionId}
```

### Size Recommendation Flow
```
1. Submit Measurements
   POST /sizing/recommendations
   
2. Get Size Chart
   GET /products/{productId}/size-chart
   
3. Extract Measurements from Photo
   POST /measurements/extract
```

## Error Handling

- **Camera Access**: Graceful fallback for denied permissions
- **API Failures**: User-friendly error messages
- **Network Issues**: Retry logic with exponential backoff
- **Invalid Data**: Form validation and user guidance

## Performance Considerations

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compression and format optimization
- **API Caching**: Session and recommendation caching
- **Bundle Size**: Dynamic imports for large dependencies

## Testing

### Unit Tests
```bash
yarn test virtual-try-on
yarn test size-recommendation
```

### Integration Tests
```bash
yarn test:e2e
```

### Manual Testing
- Test on different devices and browsers
- Verify camera permissions and fallbacks
- Test measurement form validation
- Verify API integration

## Troubleshooting

### Common Issues

1. **Camera Not Working**
   - Check browser permissions
   - Ensure HTTPS for production
   - Test on different devices

2. **API Errors**
   - Verify environment variables
   - Check Zakeke service status
   - Review API rate limits

3. **Size Recommendations Inaccurate**
   - Verify measurement inputs
   - Check product size chart data
   - Review Zakeke algorithm settings

### Debug Mode
Enable debug logging by setting:
```bash
NEXT_PUBLIC_DEBUG=true
```

## Future Enhancements

### Phase 2
- [ ] Real-time product overlay positioning
- [ ] Advanced measurement extraction from photos
- [ ] Personalized fit preferences
- [ ] Social sharing integration

### Phase 3
- [ ] AR try-on using device sensors
- [ ] Machine learning model training
- [ ] Analytics and conversion tracking
- [ ] A/B testing framework

## Support

For technical support:
- Check Zakeke documentation
- Review error logs in browser console
- Contact development team
- Submit issues to project repository

## License

This implementation is part of the Medusa storefront and follows the same licensing terms.
