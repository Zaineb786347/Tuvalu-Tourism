# 🚀 Quick Setup Guide - Tuvalu Tourism Platform

## Prerequisites Checklist
- ✅ Node.js 18+ installed
- ✅ npm dependencies installed
- ⬜ Supabase account created
- ⬜ Environment variables configured

## Step-by-Step Setup

### 1. Supabase Setup (5 minutes)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and region
   - Set a strong database password
   - Wait for project creation (~2 minutes)

2. **Run Database Schema**
   - In Supabase Dashboard, go to SQL Editor
   - Click "New Query"
   - Copy entire content from `supabase/schema.sql`
   - Paste and click "Run"
   - Verify all tables created in Table Editor

3. **Get API Credentials**
   - Go to Settings → API
   - Copy:
     - Project URL
     - `anon` `public` key
     - `service_role` `secret` key

### 2. Environment Configuration (2 minutes)

1. **Create Environment File**
   ```powershell
   Copy-Item .env.local.example .env.local
   ```

2. **Edit `.env.local`** with your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   
   # Stripe (optional for now)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 3. Start Development Server (1 minute)

```powershell
npm run dev
```

Visit: http://localhost:3000

### 4. Create Admin Account (3 minutes)

1. **Register First User**
   - Go to http://localhost:3000/auth/register
   - Fill in your details
   - Select "Tourist" (we'll upgrade it)
   - Click "Create account"

2. **Upgrade to Admin**
   - Go to Supabase Dashboard → Table Editor
   - Open `profiles` table
   - Find your user by email
   - Edit the `role` column to `admin`
   - Save changes

3. **Access Admin Dashboard**
   - Refresh your browser
   - Navigate to `/admin/dashboard`
   - You now have full admin access!

### 5. Add Sample Data (Optional, 5 minutes)

#### Create Provider Account
```sql
-- In Supabase SQL Editor
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  gen_random_uuid(),
  'provider@example.com',
  'Sample Provider',
  'provider'
);
```

#### Add Sample Listing
1. Register a new user as "Provider"
2. Go to `/provider/dashboard`
3. Click "Add New Listing"
4. Fill in details:
   - Title: "Traditional Homestay Experience"
   - Category: Homestays
   - Description: Describe the experience
   - Price: 75
   - Location: Funafuti
   - Capacity: 4
5. Upload sample images (or skip for now)
6. Click "Publish"

### 6. Test the Platform (5 minutes)

#### As a Tourist:
1. Logout (if logged in as admin)
2. Browse `/listings`
3. Use filters to search
4. Click on a listing
5. Click "Book Now"
6. Fill in booking details
7. Submit booking

#### As a Provider:
1. Login as provider
2. Go to `/provider/dashboard`
3. View your listings
4. Check bookings
5. Monitor revenue

#### As an Admin:
1. Login as admin
2. Go to `/admin/dashboard`
3. View all platform statistics
4. Manage users
5. Review listings

## Common Issues & Solutions

### Issue: "Cannot connect to Supabase"
**Solution**: Verify your `.env.local` has correct credentials

### Issue: "Table doesn't exist"
**Solution**: Run the schema.sql in Supabase SQL Editor

### Issue: "Build errors"
**Solution**: 
```powershell
rm -rf .next
npm install
npm run dev
```

### Issue: "Images not showing"
**Solution**: Use full image URLs (https://...) for now

## Next Steps

### For Development:
1. **Stripe Integration**
   - Get Stripe test API keys
   - Implement payment intent creation
   - Add webhook handler

2. **Image Upload**
   - Configure Supabase Storage
   - Create buckets for listing images
   - Implement image upload component

3. **Email Notifications**
   - Set up SendGrid or similar
   - Create booking confirmation emails
   - Add provider notifications

4. **Additional Features**
   - Real-time booking updates
   - Advanced search with location
   - Rating and review system
   - Provider analytics dashboard

### For Production:
1. **Deploy to Vercel**
   ```powershell
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Configure Custom Domain**
   - Add domain in Vercel
   - Update DNS records
   - Enable SSL (automatic)

3. **Production Environment**
   - Add production env vars in Vercel
   - Update Supabase URL allowlist
   - Configure Stripe production keys

4. **Enable Analytics**
   - Add Vercel Analytics
   - Configure Google Analytics
   - Set up error tracking (Sentry)

## File Structure Reference

```
ai tourism/
├── app/
│   ├── admin/dashboard/          ← Admin dashboard
│   ├── auth/                     ← Login & registration
│   ├── booking/[id]/             ← Booking page
│   ├── listings/                 ← Browse & view listings
│   ├── my-bookings/              ← User bookings
│   ├── provider/dashboard/       ← Provider dashboard
│   ├── layout.tsx                ← Root layout
│   ├── page.tsx                  ← Homepage
│   └── globals.css               ← Global styles
├── components/                   ← Reusable components
├── lib/                          ← Utilities
├── supabase/schema.sql           ← Database schema
├── .env.local                    ← Environment variables (create this)
├── README.md                     ← Main documentation
├── DOCUMENTATION.md              ← User guides
└── SETUP.md                      ← This file
```

## Development Workflow

### Daily Development
```powershell
# Start dev server
npm run dev

# Run in new terminal for type checking
npx tsc --noEmit --watch

# Run linter
npm run lint
```

### Before Committing
```powershell
# Check for errors
npm run lint

# Build to verify
npm run build

# Commit changes
git add .
git commit -m "Description of changes"
git push
```

## Support Resources

- **Documentation**: See README.md and DOCUMENTATION.md
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## Success Checklist

- ✅ Dependencies installed
- ✅ Supabase project created
- ✅ Database schema deployed
- ✅ Environment variables configured
- ✅ Development server running
- ✅ Admin account created
- ✅ Can view homepage
- ✅ Can browse listings
- ✅ Can create bookings
- ✅ Dashboard accessible

## You're All Set! 🎉

Your Tuvalu Tourism Platform is ready for development!

**Next Action**: Start customizing the platform:
1. Update colors in `tailwind.config.ts`
2. Add your own content to homepage
3. Upload real images for listings
4. Customize email templates
5. Add more features!

---

**Need Help?**
- Check DOCUMENTATION.md for detailed guides
- Review code comments in files
- Check Supabase logs for errors
- Verify environment variables

**Happy Coding!** 🏝️
