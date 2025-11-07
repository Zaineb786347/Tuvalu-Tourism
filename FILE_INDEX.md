# 📁 Complete File Index - Tuvalu Tourism Platform

## Project Overview
This document provides a complete index of all files in the project with descriptions of their purpose.

---

## Configuration Files

### `package.json`
- **Purpose**: Project dependencies and npm scripts
- **Contains**: 
  - Next.js, React, TypeScript
  - Supabase client
  - Stripe integration
  - Tailwind CSS
  - Lucide icons
- **Scripts**: `dev`, `build`, `start`, `lint`

### `tsconfig.json`
- **Purpose**: TypeScript configuration
- **Key Settings**:
  - Strict mode enabled
  - Path aliases (`@/*`)
  - Next.js plugin integration

### `tailwind.config.ts`
- **Purpose**: Tailwind CSS configuration
- **Customizations**:
  - Custom color palette (primary, secondary, accent)
  - Extended theme
  - Content paths for purging

### `next.config.js`
- **Purpose**: Next.js configuration
- **Settings**:
  - Image domains configuration
  - Build optimizations

### `postcss.config.js`
- **Purpose**: PostCSS configuration for Tailwind
- **Plugins**: tailwindcss, autoprefixer

### `.gitignore`
- **Purpose**: Git ignore rules
- **Excludes**: node_modules, .next, .env files

### `.env.local.example`
- **Purpose**: Template for environment variables
- **Required Variables**:
  - Supabase credentials
  - Stripe API keys
  - App URL

---

## Application Files

### `app/layout.tsx`
- **Type**: Root layout component
- **Purpose**: Global app wrapper
- **Includes**:
  - HTML structure
  - Metadata configuration
  - Navbar and Footer components
  - Global styling
- **Used By**: Every page in the app

### `app/page.tsx`
- **Type**: Homepage
- **Purpose**: Landing page
- **Components**:
  - Hero section
  - Category grid
  - Featured listings
  - Testimonials
  - Call to action
- **Route**: `/`

### `app/globals.css`
- **Type**: Global stylesheet
- **Purpose**: Base styles and utilities
- **Contains**:
  - Tailwind directives
  - Custom component classes
  - Reusable button styles
  - Form input styles
  - Card styles

---

## Authentication Pages

### `app/auth/login/page.tsx`
- **Type**: Login page
- **Purpose**: User authentication
- **Features**:
  - Email/password login
  - Error handling
  - Redirect based on user role
- **Route**: `/auth/login`

### `app/auth/register/page.tsx`
- **Type**: Registration page
- **Purpose**: New user signup
- **Features**:
  - Role selection (Tourist/Provider)
  - Profile creation
  - Automatic profile record creation
- **Route**: `/auth/register`

---

## Listing Pages

### `app/listings/page.tsx`
- **Type**: Listings browser
- **Purpose**: Browse all tourism offerings
- **Features**:
  - Category filtering
  - Price range filtering
  - Search functionality
  - Grid layout with pagination
- **Route**: `/listings`
- **Query Params**: `?category=slug&search=term`

### `app/listings/[slug]/page.tsx`
- **Type**: Listing detail page
- **Purpose**: Show individual listing
- **Features**:
  - Image gallery
  - Full description
  - Amenities list
  - Reviews section
  - Provider information
  - Booking button
- **Route**: `/listings/[slug]`
- **Dynamic**: Yes (slug parameter)

---

## Booking Pages

### `app/booking/[id]/page.tsx`
- **Type**: Booking form
- **Purpose**: Create new booking
- **Features**:
  - Date selection
  - Guest count input
  - Payment method selection
  - Special requests
  - Price calculation
  - Booking summary
- **Route**: `/booking/[id]`
- **Dynamic**: Yes (listing ID)
- **Auth Required**: Yes

### `app/my-bookings/page.tsx`
- **Type**: User bookings dashboard
- **Purpose**: View user's bookings
- **Features**:
  - Filter by status
  - Booking details
  - Cancel functionality
  - Review option
  - Payment status
- **Route**: `/my-bookings`
- **Auth Required**: Yes

---

## Provider Pages

### `app/provider/dashboard/page.tsx`
- **Type**: Provider dashboard
- **Purpose**: Provider control panel
- **Features**:
  - Statistics overview
  - Listings management
  - Recent bookings
  - Revenue tracking
  - Quick actions
- **Route**: `/provider/dashboard`
- **Auth Required**: Yes (Provider role)

---

## Admin Pages

### `app/admin/dashboard/page.tsx`
- **Type**: Admin dashboard
- **Purpose**: Platform administration
- **Features**:
  - Platform statistics
  - User management overview
  - Listing approval queue
  - Booking monitoring
  - Revenue reports
  - Quick actions
- **Route**: `/admin/dashboard`
- **Auth Required**: Yes (Admin role)

---

## Components

### `components/Navbar.tsx`
- **Purpose**: Main navigation bar
- **Features**:
  - Responsive mobile menu
  - Authentication state
  - Role-based menu items
  - Logout functionality
  - Sticky header
- **Used In**: Root layout (all pages)

### `components/Footer.tsx`
- **Purpose**: Site footer
- **Features**:
  - Links to pages
  - Social media links
  - Contact information
  - Copyright notice
- **Used In**: Root layout (all pages)

### `components/Hero.tsx`
- **Purpose**: Homepage hero section
- **Features**:
  - Headline and subtext
  - Search bar
  - Category quick links
  - Gradient background
- **Used In**: Homepage

### `components/CategoryGrid.tsx`
- **Purpose**: Category navigation
- **Features**:
  - 5 category cards
  - Icons and descriptions
  - Hover effects
  - Links to filtered listings
- **Used In**: Homepage

### `components/FeaturedListings.tsx`
- **Purpose**: Showcase featured listings
- **Features**:
  - Grid of 6 listings
  - Real data from Supabase
  - "View All" button
  - Responsive grid
- **Used In**: Homepage

### `components/Testimonials.tsx`
- **Purpose**: Customer reviews showcase
- **Features**:
  - 3 testimonial cards
  - Star ratings
  - Customer avatars
  - Responsive grid
- **Used In**: Homepage

### `components/CallToAction.tsx`
- **Purpose**: Conversion section
- **Features**:
  - CTA buttons
  - Platform benefits
  - Gradient background
- **Used In**: Homepage

---

## Library Files

### `lib/supabase.ts`
- **Purpose**: Supabase client configuration
- **Exports**:
  - `supabase` - Main client (client-side)
  - `supabaseAdmin` - Admin client (server-side)
- **Used By**: All pages and components accessing database

### `lib/database.types.ts`
- **Purpose**: TypeScript type definitions
- **Generated From**: Supabase schema
- **Exports**:
  - Database interface
  - Table types (Row, Insert, Update)
  - All database entities
- **Used By**: All files using Supabase

---

## Database Files

### `supabase/schema.sql`
- **Purpose**: Complete database schema
- **Contains**:
  - Table definitions (6 tables)
  - Indexes for performance
  - Row Level Security policies
  - Triggers for timestamps
  - Default category data
- **Tables Created**:
  1. `profiles` - User information
  2. `categories` - Tourism categories
  3. `listings` - Attractions/homestays/tours
  4. `bookings` - Reservations
  5. `payments` - Transaction records
  6. `reviews` - User feedback
- **Run Once**: In Supabase SQL Editor

---

## Documentation Files

### `README.md`
- **Purpose**: Main project documentation
- **Sections**:
  - Project overview
  - Features list
  - Installation guide
  - Tech stack
  - Deployment instructions
  - API reference
  - Troubleshooting
- **Audience**: Developers, stakeholders

### `DOCUMENTATION.md`
- **Purpose**: User and admin guides
- **Sections**:
  - System overview
  - User guide (tourists)
  - Provider guide
  - Admin guide
  - Technical documentation
  - API reference
  - Troubleshooting
  - Glossary
- **Audience**: End users, admins, providers

### `PROJECT_SUMMARY.md`
- **Purpose**: Implementation summary
- **Sections**:
  - Completed features
  - User stories status
  - Files created
  - Contract requirements met
  - Quick start commands
  - Success criteria
- **Audience**: Project managers, clients

### `SETUP.md`
- **Purpose**: Quick setup guide
- **Sections**:
  - Prerequisites checklist
  - Step-by-step setup
  - Troubleshooting
  - Next steps
  - Success checklist
- **Audience**: Developers setting up project

### `FILE_INDEX.md` (This file)
- **Purpose**: Complete file reference
- **Sections**:
  - All files with descriptions
  - File purposes
  - Relationships
  - Usage notes
- **Audience**: Developers, maintainers

---

## File Relationships

### Data Flow
```
User → Page Component → Supabase Client → PostgreSQL Database
                ↓
           UI Update
```

### Component Hierarchy
```
layout.tsx
├── Navbar.tsx
├── page.tsx (or other pages)
│   ├── Hero.tsx
│   ├── CategoryGrid.tsx
│   ├── FeaturedListings.tsx
│   ├── Testimonials.tsx
│   └── CallToAction.tsx
└── Footer.tsx
```

### Authentication Flow
```
auth/register → Supabase Auth → profiles table → Role-based redirect
auth/login → Supabase Auth → Check role → Dashboard/Listings
```

### Booking Flow
```
listings/[slug] → booking/[id] → Supabase bookings → my-bookings
                       ↓
                 Payment (Stripe/Local)
                       ↓
                 Email Confirmation
```

---

## Key File Patterns

### Page Components
- Located in `app/` directory
- Export default function component
- Use `'use client'` directive when needed
- Handle routing and data fetching

### Reusable Components
- Located in `components/` directory
- Export default or named exports
- Receive props for customization
- Can be client or server components

### API Utilities
- Located in `lib/` directory
- Export configured clients/utilities
- Used across multiple components
- Type-safe with TypeScript

---

## File Count Summary

- **Configuration**: 6 files
- **Application Pages**: 8 files
- **Components**: 7 files
- **Library Files**: 2 files
- **Database Files**: 1 file
- **Documentation**: 5 files

**Total**: 29 core files

---

## File Conventions

### Naming
- **Pages**: `page.tsx` (Next.js convention)
- **Components**: `PascalCase.tsx`
- **Utilities**: `camelCase.ts`
- **Styles**: `kebab-case.css`

### Structure
- **Client Components**: Start with `'use client'`
- **Server Components**: No directive (default)
- **TypeScript**: All files use `.tsx` or `.ts`

### Imports
- **Absolute imports**: Use `@/` alias
- **Relative imports**: For nearby files
- **Group imports**: React → Next → External → Internal

---

## Quick Reference

### Most Important Files for Customization
1. `app/globals.css` - Styling
2. `tailwind.config.ts` - Colors and theme
3. `components/Hero.tsx` - Homepage hero
4. `supabase/schema.sql` - Database structure
5. `.env.local` - Configuration

### Files to Never Edit (Auto-generated)
- `.next/` directory
- `node_modules/` directory

### Files to Version Control
- All `.tsx`, `.ts`, `.css` files
- Configuration files
- Documentation files
- `package.json`

### Files to Keep Secret
- `.env.local`
- Any file with API keys
- Private environment variables

---

## Additional Notes

### Future Files to Add
- `app/api/` - API routes for Stripe webhook
- `middleware.ts` - Route protection
- `app/provider/listings/new/page.tsx` - Create listing form
- `app/provider/listings/[id]/edit/page.tsx` - Edit listing form
- `components/ImageUpload.tsx` - Image upload component
- `lib/stripe.ts` - Stripe utilities
- `lib/email.ts` - Email sending utilities

### Optional Enhancements
- `app/about/page.tsx` - About page
- `app/contact/page.tsx` - Contact form
- `app/faq/page.tsx` - FAQ page
- `components/Map.tsx` - Location map component
- `components/Calendar.tsx` - Booking calendar

---

**Last Updated**: November 4, 2025
**Version**: 1.0
**Maintained By**: Development Team
