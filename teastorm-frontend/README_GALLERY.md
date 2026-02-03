# TeaStorm Frontend 🍵

Premium DTC Chinese Tea Brand - Next.js + TypeScript + Sanity CMS

## Features ✨

- 🖼️ **Product Gallery** - Interactive image gallery with thumbnail navigation
- 📊 **SEO Optimized** - Multiple OG images, structured data (schema.org), fallback images
- 🛒 **Shopping Cart** - Context-based cart with Stripe integration
- 🔐 **Authentication** - NextAuth with Prisma database
- 💳 **Stripe Payments** - Complete checkout flow with webhooks
- 📝 **Content Management** - Sanity CMS integration for tea descriptions
- ✨ **Luxury Design** - Premium brand experience with gradient backgrounds

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn
- Sanity account (for content)
- Stripe account (for payments)

### Installation

```bash
npm install
# or
pnpm install
```

### Environment Variables

Create `.env.local`:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/teastorm

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture 📐

### Product Structure

Products use a new `ProductImages` type for better image management:

```typescript
type ProductImages = {
  preview: string        // Main product image
  gallery: string[]      // Additional product images
}

type Product = {
  id: string
  slug: string
  images: ProductImages  // Multiple images support
  variants: ProductVariant[]
}
```

### SEO Features 🔍

#### 1. Multiple Open Graph Images
The metadata dynamically includes all product images for better social sharing:

```typescript
// All product images included for OG tags
const allImages = [
  product.images.preview,
  ...product.images.gallery,
]
```

#### 2. Structured Data (schema.org)
Products include complete schema with multiple images:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Tea Name",
  "image": ["preview.png", "gallery1.png", "gallery2.png"]
}
```

#### 3. OG Image Fallback
If no images available, system falls back to:
- URL: `https://teastorm.com/og-fallback.png`
- Size: 1200x630px
- Alt text: "TeaStorm - Premium Chinese Tea"

### Gallery Component

Located in `components/cart/product/ProductGallery.tsx`:

```tsx
<ProductGallery
  previewImage={product.images.preview}
  galleryImages={product.images.gallery}
  productName={content.displayName}
/>
```

Features:
- Main image with gradient background
- Thumbnail navigation
- Image counter
- Responsive design
- Keyboard accessible

### File Structure 📁

```
app/
├── product/[id]/page.tsx          # Product page with SEO metadata
├── shop/page.tsx                  # Products listing
└── api/
    ├── prices/route.ts            # Price fetching
    ├── checkout/route.ts          # Stripe checkout
    └── auth/[...nextauth]/route.ts # Authentication

components/
├── cart/product/
│   ├── ProductClient.tsx          # Product page client component
│   └── ProductGallery.tsx         # Gallery with thumbnails
└── ...

data/
├── products.ts                    # Product definitions with images
└── teaContent.ts                  # Tea descriptions & metadata

lib/
├── sanity.client.ts               # Sanity CMS client
├── auth.ts                        # Authentication setup
└── cart-context.tsx               # Cart state management
```

## Adding New Products 📦

1. Add product to `data/products.ts`:

```typescript
{
  id: "my-tea",
  slug: "my-tea",
  title: "My Tea",
  category: "oolong",
  images: {
    preview: "/tea/my-tea/preview.png",
    gallery: [
      "/tea/my-tea/2.png",
      "/tea/my-tea/3.png",
      "/tea/my-tea/4.png",
    ],
  },
  variants: [
    { 
      id: "my-tea-50", 
      label: "50 g", 
      weightGrams: 50, 
      stripePriceId: "price_..." 
    }
  ]
}
```

2. Add content to `data/teaContent.ts`:

```typescript
"my-tea": {
  displayName: "My Tea",
  tagline: "Your tea tagline",
  description: "Your tea description",
  flavorProfile: ["flavor1", "flavor2"],
  effect: "How it feels",
  brewing: {
    gongfu: "Gongfu brewing instructions",
    western: "Western brewing instructions"
  }
}
```

3. Add images to `public/tea/my-tea/`:
   - `preview.png` (main image)
   - `2.png`, `3.png`, `4.png` (gallery images)

## Stripe Integration 💳

### Setup Webhook

```bash
stripe listen --forward-to http://localhost:3000/api/checkout/stripe/webhook
```

### Payment Flow

1. User adds product to cart
2. Proceeds to checkout
3. Stripe session created with order details
4. Webhook updates order status after payment
5. Success page displays order confirmation

## Database Schema 🗄️

Uses Prisma with PostgreSQL. Key models:

- `User` - Authentication users
- `Order` - Customer orders
- `OrderItem` - Items in orders
- `OrderStatusLog` - Order status tracking

Run migrations:

```bash
npx prisma migrate dev
```

## Testing

```bash
npm run build    # Build for production
npm run lint     # Run ESLint
npm test         # Run tests (when configured)
```

## Deployment 🚀

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```bash
docker build -t teastorm-frontend .
docker run -p 3000:3000 teastorm-frontend
```

## Performance Tips ⚡

- Images use Next.js `Image` component for optimization
- Stripe prices fetched on mount for real-time updates
- Cart state persists in localStorage via zustand
- Static pages pre-generated at build time

## Contributing

Follow these conventions:

- Use TypeScript for all files
- Component names match file names
- Use React hooks for state management
- Keep styles inline or in CSS modules
- Test before committing

## License

MIT - TeaStorm 2025

## Support

For issues or questions:
- Check existing GitHub issues
- Email: support@teastorm.com

---

Made with ☕ and 🍵 by TeaStorm
