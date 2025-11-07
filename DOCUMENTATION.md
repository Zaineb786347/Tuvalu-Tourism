# 📘 Tuvalu Tourism Platform - Complete Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [User Guide](#user-guide)
3. [Provider Guide](#provider-guide)
4. [Admin Guide](#admin-guide)
5. [Technical Documentation](#technical-documentation)
6. [API Reference](#api-reference)
7. [Troubleshooting](#troubleshooting)

---

## System Overview

### Purpose
The Tuvalu Tourism Platform is a comprehensive booking system designed to promote sustainable tourism in Tuvalu through eco-friendly attractions, authentic homestays, and sustainable tours.

### Key Features
- **User Registration & Authentication**: Secure login for tourists, providers, and admins
- **Listing Management**: Create, edit, and manage tourism offerings
- **Booking System**: Complete reservation flow with date selection
- **Payment Processing**: Stripe integration + local payment methods
- **Review System**: Customer feedback and ratings
- **Multi-role Support**: Tourist, Provider, and Admin roles

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Payment**: Stripe API
- **Hosting**: Vercel (recommended)

---

## User Guide

### For Tourists

#### 1. Creating an Account
1. Navigate to the homepage
2. Click "Sign Up" in the navigation bar
3. Select "Tourist" as your account type
4. Fill in:
   - Full Name
   - Email address
   - Phone Number (optional)
   - Password (minimum 6 characters)
5. Click "Create account"
6. You'll be redirected to the listings page

#### 2. Browsing Listings
1. From the homepage, click "Explore" or any category
2. Use the filters on the left sidebar:
   - **Search**: Enter keywords
   - **Category**: Select type (Eco-Attractions, Homestays, Tours, etc.)
   - **Price Range**: Set minimum and maximum price
3. Click "Apply Filters"
4. Browse through the listings
5. Click on any listing to view details

#### 3. Viewing Listing Details
- See full description and images
- Check amenities and capacity
- Read customer reviews
- View provider information
- See pricing details

#### 4. Making a Booking
1. Click "Book Now" on the listing detail page
2. Select:
   - Start Date
   - End Date
   - Number of Guests
3. Review booking summary
4. Add special requests (optional)
5. Choose payment method:
   - **Stripe**: Credit/debit card
   - **Local Payment**: Arrange with provider
6. Complete payment
7. Receive confirmation via email

#### 5. Managing Your Bookings
1. Click "My Bookings" in the navigation
2. View all your bookings:
   - **Upcoming**: Future reservations
   - **Past**: Completed bookings
   - **Cancelled**: Cancelled reservations
3. Click on a booking to:
   - View details
   - Cancel booking (if applicable)
   - Leave a review (after completion)

#### 6. Leaving Reviews
1. Go to "My Bookings"
2. Find a completed booking
3. Click "Leave Review"
4. Rate 1-5 stars
5. Write your experience
6. Submit review

---

## Provider Guide

### For Local Tourism Providers

#### 1. Registering as a Provider
1. Click "Sign Up"
2. Select "Provider" as account type
3. Complete registration form
4. Verify email address
5. Access provider dashboard

#### 2. Creating Your First Listing
1. Go to Provider Dashboard
2. Click "Add New Listing"
3. Fill in listing information:
   - **Title**: Descriptive name
   - **Category**: Choose appropriate type
   - **Description**: Detailed information
   - **Location**: Where it takes place
   - **Price**: Per person rate
   - **Capacity**: Maximum guests
   - **Images**: Upload photos (recommended 4-6)
   - **Amenities**: Check all that apply
4. Review listing preview
5. Click "Publish Listing"

#### 3. Managing Listings
**Edit a Listing**:
1. Dashboard → "My Listings"
2. Click "Edit" on desired listing
3. Make changes
4. Click "Save Changes"

**Deactivate a Listing**:
1. Go to listing edit page
2. Toggle "Active" status
3. Save changes

**Delete a Listing**:
1. Go to listing edit page
2. Click "Delete Listing"
3. Confirm deletion

#### 4. Managing Bookings
1. Dashboard → "Bookings"
2. View booking requests:
   - **Pending**: Awaiting confirmation
   - **Confirmed**: Accepted bookings
   - **Completed**: Past bookings
3. For each booking you can:
   - View customer details
   - Accept/Decline (for pending)
   - Mark as completed
   - View payment status

#### 5. Accepting a Booking
1. Click on pending booking
2. Review details:
   - Customer information
   - Dates requested
   - Number of guests
   - Special requests
3. Click "Accept Booking"
4. Customer receives confirmation

#### 6. Tracking Revenue
1. Dashboard → "Revenue"
2. View:
   - Total earnings
   - Pending payments
   - Payment history
3. Download reports

#### 7. Communication
- Respond to customer inquiries
- Provide booking confirmations
- Send reminders before booking dates

---

## Admin Guide

### For Platform Administrators

#### 1. Accessing Admin Dashboard
1. Login with admin credentials
2. Navigate to /admin/dashboard
3. View platform overview

#### 2. User Management
**View All Users**:
- Dashboard → "Users"
- See list of all registered users
- Filter by role (Tourist, Provider, Admin)

**Manage User Roles**:
1. Click on user
2. Select new role
3. Save changes

**Suspend User**:
1. Find user in list
2. Click "Suspend"
3. Provide reason
4. Confirm action

#### 3. Listing Management
**Review New Listings**:
1. Dashboard → "Listings" → "Pending Review"
2. Click on listing
3. Verify information:
   - Accuracy of description
   - Quality of images
   - Appropriateness of content
4. Approve or Reject

**Moderate Listings**:
- Edit listings if needed
- Mark as featured
- Remove inappropriate content

#### 4. Booking Management
**Monitor All Bookings**:
1. Dashboard → "All Bookings"
2. View status of all reservations
3. Intervene if issues arise

**Handle Disputes**:
1. Review complaint
2. Check booking details
3. Contact parties involved
4. Make decision
5. Process refund if needed

#### 5. Payment Management
**View Transactions**:
- Dashboard → "Payments"
- See all payment history
- Filter by status

**Handle Refunds**:
1. Find transaction
2. Click "Issue Refund"
3. Enter amount
4. Provide reason
5. Process refund

**Monitor Revenue**:
- Total platform revenue
- Commission earned
- Provider payouts

#### 6. Content Management
**Manage Categories**:
1. Dashboard → "Categories"
2. Add new categories
3. Edit existing ones
4. Set category icons

**Featured Listings**:
1. Select high-quality listings
2. Mark as "Featured"
3. They appear on homepage

#### 7. Reports & Analytics
**Generate Reports**:
- User growth
- Booking statistics
- Revenue reports
- Popular listings

**Export Data**:
1. Select report type
2. Choose date range
3. Click "Export as CSV"

---

## Technical Documentation

### Architecture Overview

```
Frontend (Next.js)
    ↓
API Routes
    ↓
Supabase Client
    ↓
PostgreSQL Database
```

### Database Schema

**profiles**
```sql
- id (UUID, Primary Key)
- email (TEXT)
- full_name (TEXT)
- role (ENUM: user, provider, admin)
- phone (TEXT)
- avatar_url (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**categories**
```sql
- id (UUID, Primary Key)
- name (TEXT)
- slug (TEXT, Unique)
- description (TEXT)
- icon (TEXT)
- created_at (TIMESTAMP)
```

**listings**
```sql
- id (UUID, Primary Key)
- provider_id (UUID, Foreign Key)
- category_id (UUID, Foreign Key)
- title (TEXT)
- slug (TEXT, Unique)
- description (TEXT)
- short_description (TEXT)
- price (DECIMAL)
- currency (TEXT)
- location (TEXT)
- latitude (DECIMAL)
- longitude (DECIMAL)
- max_capacity (INTEGER)
- images (TEXT[])
- amenities (TEXT[])
- is_active (BOOLEAN)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**bookings**
```sql
- id (UUID, Primary Key)
- listing_id (UUID, Foreign Key)
- user_id (UUID, Foreign Key)
- start_date (DATE)
- end_date (DATE)
- guests (INTEGER)
- total_price (DECIMAL)
- currency (TEXT)
- status (ENUM: pending, confirmed, cancelled, completed)
- payment_status (ENUM: pending, paid, refunded)
- payment_method (ENUM: stripe, local)
- special_requests (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**payments**
```sql
- id (UUID, Primary Key)
- booking_id (UUID, Foreign Key)
- amount (DECIMAL)
- currency (TEXT)
- payment_method (ENUM: stripe, local)
- stripe_payment_intent_id (TEXT)
- status (ENUM: pending, succeeded, failed, refunded)
- metadata (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**reviews**
```sql
- id (UUID, Primary Key)
- listing_id (UUID, Foreign Key)
- user_id (UUID, Foreign Key)
- booking_id (UUID, Foreign Key)
- rating (INTEGER, 1-5)
- comment (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Authentication Flow

1. User submits credentials
2. Supabase Auth validates
3. JWT token generated
4. Token stored in browser
5. Subsequent requests include token
6. Row Level Security validates access

### Payment Flow

**Stripe Payments**:
1. User initiates booking
2. Frontend creates payment intent
3. Stripe processes card
4. Webhook confirms payment
5. Booking status updated
6. Confirmation email sent

**Local Payments**:
1. User selects local payment
2. Booking created as "pending payment"
3. Provider receives notification
4. Provider confirms payment receipt
5. Booking status updated

---

## API Reference

### Authentication

**POST /api/auth/register**
```typescript
Request:
{
  email: string
  password: string
  full_name: string
  role: 'user' | 'provider'
  phone?: string
}

Response:
{
  user: User
  session: Session
}
```

**POST /api/auth/login**
```typescript
Request:
{
  email: string
  password: string
}

Response:
{
  user: User
  session: Session
}
```

### Listings

**GET /api/listings**
```typescript
Query Parameters:
- category?: string
- location?: string
- min_price?: number
- max_price?: number
- featured?: boolean

Response:
{
  listings: Listing[]
  total: number
}
```

**POST /api/listings**
```typescript
Request:
{
  title: string
  category_id: string
  description: string
  price: number
  location: string
  max_capacity: number
  images: string[]
  amenities: string[]
}

Response:
{
  listing: Listing
}
```

### Bookings

**POST /api/bookings**
```typescript
Request:
{
  listing_id: string
  start_date: string
  end_date: string
  guests: number
  payment_method: 'stripe' | 'local'
  special_requests?: string
}

Response:
{
  booking: Booking
  payment_intent?: PaymentIntent
}
```

**GET /api/bookings/my-bookings**
```typescript
Response:
{
  bookings: Booking[]
}
```

### Payments

**POST /api/payments/create-intent**
```typescript
Request:
{
  amount: number
  currency: string
  booking_id: string
}

Response:
{
  client_secret: string
  payment_intent_id: string
}
```

---

## Troubleshooting

### Common Issues

#### Cannot Login
**Problem**: Email/password not working
**Solution**:
1. Verify email is correct
2. Check password (case-sensitive)
3. Try "Forgot Password" link
4. Clear browser cache
5. Try different browser

#### Booking Not Processing
**Problem**: Booking hangs on payment
**Solution**:
1. Check internet connection
2. Verify card details
3. Try different payment method
4. Contact provider directly
5. Reach out to support

#### Images Not Uploading
**Problem**: Cannot upload listing images
**Solution**:
1. Check file size (max 5MB per image)
2. Use supported formats (JPG, PNG)
3. Verify internet connection
4. Try fewer images at once
5. Compress images

#### Payment Failed
**Problem**: Card declined
**Solution**:
1. Verify card details
2. Check sufficient funds
3. Contact your bank
4. Try different card
5. Use local payment option

### Error Codes

- **AUTH_001**: Invalid credentials
- **AUTH_002**: Email already exists
- **BOOK_001**: Listing not available
- **BOOK_002**: Invalid dates
- **PAY_001**: Payment failed
- **PAY_002**: Insufficient funds

### Getting Help

**Email Support**: info@tuvalutourism.tv
**Phone**: +688 [Phone Number]
**Hours**: Monday-Friday, 9 AM - 5 PM (Tuvalu Time)

---

## Maintenance

### Regular Tasks

**Daily**:
- Monitor new bookings
- Check payment processing
- Review user reports

**Weekly**:
- Review new provider applications
- Approve pending listings
- Generate booking reports

**Monthly**:
- Process provider payouts
- Review analytics
- Update featured listings
- Backup database

### Database Backups

Supabase provides automatic daily backups. To manual backup:
1. Go to Supabase Dashboard
2. Select project
3. Database → Backups
4. Click "Create Backup"

### Updates

**Checking for Updates**:
```powershell
git fetch origin
git pull origin main
npm install
npm run build
```

---

## Security Best Practices

1. **Never share admin credentials**
2. **Use strong passwords** (12+ characters)
3. **Enable two-factor authentication** (when available)
4. **Regularly review user permissions**
5. **Monitor for suspicious activity**
6. **Keep software updated**
7. **Use HTTPS only**
8. **Secure API keys** (never commit to Git)

---

## Glossary

- **Listing**: A tourism offering (homestay, tour, attraction)
- **Booking**: A reservation made by a tourist
- **Provider**: Local tourism operator
- **Tourist**: Platform user making bookings
- **Admin**: Platform administrator
- **RLS**: Row Level Security (database security)
- **Slug**: URL-friendly identifier
- **Payment Intent**: Stripe payment object

---

## Contact & Support

**Development Team**: [Your Contact]
**Platform Admin**: admin@tuvalutourism.tv
**Emergency**: [Emergency Contact]

---

**Document Version**: 1.0
**Last Updated**: November 4, 2025
**Next Review**: December 4, 2025
