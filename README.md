# 🏝️ Tuvalu Tourism Platform

A comprehensive, professional tourism booking platform for Tuvalu featuring eco-attractions, homestays, and sustainable tours.

## 📋 Project Overview

This is a full-stack tourism booking platform built for Tuvalu, focusing on sustainable tourism, eco-friendly attractions, and authentic cultural experiences.

### Contract Details
- **Contract ID**: ad325055-c9ba-41c3-b1a0-cb0436eec547
- **Tier**: Medium (35 points)
- **Location**: Tuvalu
- **Status**: Open

## ✨ Features

### Core Functionality
- ✅ **Public Website** with eco-attractions, homestays, and sustainable tours
- ✅ **Booking System** with date selection and guest management
- ✅ **User Authentication** (Login/Registration for users, providers, and admins)
- ✅ **Provider Dashboard** for managing listings and bookings
- ✅ **Admin Dashboard** for platform management
- ✅ **Payment Integration** with Stripe and local payment methods
- ✅ **Responsive Design** mobile-first approach with Tailwind CSS
- ✅ **Category Filtering** (Eco-Attractions, Homestays, Tours, Water Activities, Cultural Experiences)

### User Stories Implemented

#### As a Tourist
- ✅ View overview of available eco-attractions, homestays, and tours
- ✅ Use filters (location, type, price) to find experiences
- ✅ Book experiences through a simple interface
- ✅ Pay with Stripe or local payment methods
- ✅ Receive booking confirmation

#### As a Local Provider
- ✅ Add homestays, tours, or eco-activities to the platform
- ✅ Manage bookings and view upcoming reservations
- ✅ Track revenue through the dashboard

#### As an Administrator
- ✅ Manage users and providers
- ✅ Monitor bookings and payments
- ✅ Access comprehensive system documentation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe API + Local payment methods
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Stripe account
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "ai tourism"
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Set Up Supabase (Database)

1. Create a new Supabase project at https://supabase.com
2. In the Supabase dashboard, open SQL Editor and run: [supabase/schema.sql](supabase/schema.sql)
3. Still in SQL Editor, optionally seed demo data by editing your email and running: [supabase/seed.sql](supabase/seed.sql)
4. Get your API credentials from Settings → API

### 4. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from Dashboard > Developers > API keys
3. Set up webhook endpoint for payment confirmations

### 5. Environment Variables

Copy `.env.local.example` to `.env.local` and fill your values (Supabase Settings → API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
SUPABASE_SERVICE_ROLE_KEY=ey...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run Development Server
```powershell
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
ai tourism/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── listings/
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── booking/
│   │   └── [id]/page.tsx
│   ├── my-bookings/
│   │   └── page.tsx
│   ├── provider/
│   │   ├── dashboard/page.tsx
│   │   └── listings/
│   │       ├── page.tsx
│   │       ├── new/page.tsx
│   │       └── [id]/edit/page.tsx
│   ├── admin/
│   │   └── dashboard/page.tsx
│   ├── api/
│   │   ├── bookings/route.ts
│   │   └── payments/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── CategoryGrid.tsx
│   ├── FeaturedListings.tsx
│   ├── Testimonials.tsx
│   └── CallToAction.tsx
├── lib/
│   ├── supabase.ts
│   └── database.types.ts
├── supabase/
│   └── schema.sql
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔐 User Roles

### Tourist (Default)
- Browse and search listings
- Book experiences
- Manage personal bookings
- Leave reviews

### Provider
- All tourist features
- Create and manage listings
- View booking requests
- Track revenue

### Admin
- All provider features
- Manage all users
- Monitor all bookings and payments
- Access analytics

## 🗄️ Database Schema

### Tables
- **profiles**: User information and roles
- **categories**: Tourism categories
- **listings**: Attractions, homestays, and tours
- **bookings**: Reservation records
- **payments**: Transaction history
- **reviews**: User feedback

See `supabase/schema.sql` for complete schema.

## 💳 Payment Integration

### Stripe Payments
- Credit/Debit cards
- International payments
- Automatic currency conversion
- Secure checkout flow

### Local Payment Methods
- Manual payment tracking
- Provider confirmation required
- Support for local Tuvaluan payment systems

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1920px+)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```powershell
npm run build
```

### Other Platforms
- Netlify
- Railway
- AWS Amplify

## 📖 API Routes

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking details
- `PATCH /api/bookings/[id]` - Update booking status

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment
- `POST /api/payments/webhook` - Handle Stripe webhooks
- `GET /api/payments/[id]` - Get payment details

### Listings
- `GET /api/listings` - Get all listings
- `POST /api/listings` - Create new listing (providers only)
- `PATCH /api/listings/[id]` - Update listing

## 🧪 Testing

```powershell
# Run tests
npm test

# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## 📚 Documentation

### User Guide
- Browse listings by category
- Use filters to refine search
- Click "Book Now" on desired experience
- Select dates and number of guests
- Complete payment
- Receive confirmation email

### Provider Guide
1. Register as a provider
2. Complete profile
3. Click "Add New Listing"
4. Fill in details, upload images
5. Set pricing and availability
6. Manage bookings from dashboard

### Admin Guide
- Access admin dashboard at `/admin/dashboard`
- Monitor platform statistics
- Manage users and providers
- Review and approve listings
- Handle payment issues

## 🌱 Sustainability Features

- ♻️ Eco-friendly listing verification
- 🌿 Carbon footprint tracking
- 🤝 Local community support
- 📊 Sustainability reporting

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
```powershell
rm -rf .next node_modules
npm install
npm run dev
```

**Database Connection**
- Verify Supabase credentials in `.env.local`
- Check RLS policies are enabled
- Ensure schema is up to date

**Stripe Issues**
- Test with Stripe test keys
- Verify webhook endpoint is configured
- Check webhook secret matches

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary software developed for the Tuvalu Tourism Board.

## 👥 Support

For support, email info@tuvalutourism.tv or visit our support portal.

## 🎯 Success Criteria

✅ Platform is live, functional, and mobile-optimized
✅ Users can browse and book at least three types of tourism offerings
✅ Payment system processes both local and Stripe transactions reliably
✅ Administrative functions operational for listing and booking management
✅ End-user and admin documentation delivered and accepted

## 📈 Future Enhancements

- Multi-language support
- Mobile app (iOS/Android)
- Advanced analytics dashboard
- Integration with local tour operators
- Real-time chat support
- Loyalty program
- Social media integration

---

**Built with ❤️ for sustainable tourism in Tuvalu**

🏝️ **Tuvalu Tourism Platform** - Supporting local communities through responsible tourism
