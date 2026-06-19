# Google Places API Integration

This project includes Google Places autocomplete functionality for address fields in the checkout process.

## Setup Instructions

### 1. Get a Google Places API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Places API
   - Maps JavaScript API (if needed for frontend integration)
4. Create an API key:
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Restrict the key to only the Places API
   - Optional: Set HTTP referrer restrictions to your domain(s)

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```env
GOOGLE_PLACES_API_KEY=your_api_key_here
```

**Important**: The `GOOGLE_PLACES_API_KEY` is a server-only environment variable and should NOT be exposed to the client.

### 3. Features

The autocomplete feature is integrated into the following address fields:

- **Shipping Address** - Address field in the shipping address step
- **Billing Address** - Address field in the billing address step

When a user starts typing in an address field, suggestions appear below the input. Selecting a suggestion automatically populates:
- Address (address_1)
- City
- Postal Code
- Province/State
- Country Code

## API Endpoint

The integration uses the internal API endpoint:
- **POST** `/api/places/autocomplete`

This endpoint:
- Accepts address input and location bias parameters
- Calls the Google Places API securely from the server
- Returns formatted address suggestions

## Security Notes

- The API key is kept on the server and never exposed to the client
- All API requests are made from the server to Google's API
- The endpoint validates all incoming requests
- Consider implementing rate limiting for production use

## Troubleshooting

### "API key is not configured" error
- Ensure `GOOGLE_PLACES_API_KEY` is set in `.env.local`
- Restart your development server after adding the key

### No suggestions appearing
- Verify the API key has the Places API enabled
- Check that the API key has not exceeded its quota
- Ensure you're typing at least 2 characters

### CORS errors
- This should not occur as the API calls are server-to-server
- If you see CORS errors, ensure the request is being made to the internal endpoint

## Related Files

- `/src/hooks/useGooglePlacesAutocomplete.ts` - Hook for managing autocomplete state
- `/src/modules/checkout/components/address-autocomplete/` - Autocomplete input component
- `/src/app/api/places/autocomplete/route.ts` - Server API route
