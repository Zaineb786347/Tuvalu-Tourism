# ??? Tuvalu Tourism Platform

A comprehensive tourism booking platform for Tuvalu featuring eco-attractions, homestays, and sustainable tours.

?? **Live Website**: [tuvalu-tourism-bh35rvqed-zaineb786347s-projects.vercel.app](https://tuvalu-tourism-bh35rvqed-zaineb786347s-projects.vercel.app/)

## ?? Project Overview

A full-stack tourism booking platform built for Tuvalu, focusing on sustainable tourism, eco-friendly attractions, and authentic cultural experiences.

## ? Features

- **Public Website** with eco-attractions, homestays, and sustainable tours
- **Booking System** with date selection and guest management
- **User Authentication** for tourists, providers, and admins
- **Provider Dashboard** for managing listings and bookings
- **Admin Dashboard** for platform management
- **Payment Integration** with Stripe
- **Responsive Design** mobile-first with Tailwind CSS
- **Category Filtering** (Eco-Attractions, Homestays, Tours, Water Activities, Cultural Experiences)

## ??? Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel

## ?? User Roles

| Role | Access |
|------|--------|
| Tourist | Browse, book, and review experiences |
| Provider | Manage listings and bookings |
| Admin | Full platform management |

## ??? Database

Tables: `profiles`, `categories`, `listings`, `bookings`, `payments`, `reviews`

See `supabase/schema.sql` for the full schema.

## ?? Local Development

### 1. Clone & Install
```bash
git clone https://github.com/Zaineb786347/Tuvalu-Tourism.git
cd tuvalu-tourism
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Database
Run `supabase/schema.sql` in your Supabase SQL Editor.

### 4. Run
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## ?? Project Structure

```
tuvalu-tourism/
+-- app/
¦   +-- auth/login & register
¦   +-- listings/
¦   +-- booking/
¦   +-- my-bookings/
¦   +-- provider/dashboard & listings
¦   +-- admin/dashboard
+-- components/
+-- lib/
+-- supabase/
```

## ?? Sustainability

This platform supports responsible tourism by promoting eco-friendly experiences and connecting tourists directly with local Tuvaluan communities.

---

Built for sustainable tourism in Tuvalu ???
