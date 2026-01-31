# MUMBSO Member Onboarding System

## Overview

A modern, secure, and professional membership onboarding system for MUMBSO (Maseno University Biotechnology Student Organization). Built with React, TypeScript, Vite, and Supabase.

## ✨ Features

### 1. **Multi-Step Sign-Up Form** (`src/pages/Join.tsx`)
- **Step 1: Personal Information**
  - First name, surname, email, phone
  - Real-time validation with error messages
  - Kenyan phone number format support (0712345678, +254712345678)

- **Step 2: Academic & Interests**
  - Alumni toggle that affects year of study field
  - Year of study dropdown (Year 1-4)
  - Pre-filled course: Medical Biotechnology with IT
  - Interest selection: Max 3 from 20 options
  - Categorized interests: Molecular Biology & Microbiology

- **Step 3: Account Security**
  - Strong password requirements display
  - Confirm password field
  - Real-time validation feedback
  - Requirements: 8+ chars, uppercase, lowercase, number, special character

- **Features:**
  - 3-step progress indicator with completed step checkmarks
  - Auto-signup with Supabase authentication
  - Automatic profile and community_members table entries
  - Auto-redirect to dashboard on success
  - Why Join section with 6 benefit cards

### 2. **Member Dashboard** (`src/pages/Dashboard.tsx`)
- **Profile Overview**
  - Member name, email, phone, course, status
  - Avatar display or default icon
  - Membership status (Active/Alumni)
  - Areas of interest with tags

- **Profile Completion Indicator**
  - Visual progress bar (0-100%)
  - Checklist of incomplete items:
    - Profile picture
    - Phone number
    - Areas of interest
    - Academic status
  - Sticky sidebar that stays visible while scrolling

- **Quick Stats Cards**
  - Community members count
  - Upcoming events count
  - Research papers available
  - Active programs count

- **Membership Benefits**
  - Exclusive events access
  - Research library access
  - Mentorship program participation
  - Career development resources

- **Quick Action Buttons**
  - Browse Events
  - Download Resources
  - View Community

- **Logout Functionality**
  - Secure logout with Supabase

### 3. **Profile Editing Page** (`src/pages/Profile.tsx`)
- **Profile Picture Management**
  - Image upload with preview
  - File size validation (5MB max)
  - Avatar storage in Supabase

- **Editable Fields**
  - Phone number (with Kenyan format validation)
  - Year of study (dropdown)
  - Areas of interest (max 3 selection)
  - Alumni toggle

- **Read-Only Fields** (Cannot be changed)
  - First name
  - Surname
  - Email
  - Course

- **Features**
  - Real-time form validation
  - Save changes to Supabase
  - Account security notice
  - Back to dashboard button

### 4. **Validation Utilities** (`src/lib/validation.ts`)
- `validatePhoneNumber()` - Kenyan format validation
- `validateEmail()` - Standard email regex
- `validatePassword()` - Strong password requirements
- `formatPhoneNumber()` - Normalizes to 254-prefixed format
- `isUniversityEmail()` - @maseno.ac.ke domain check

### 5. **Interest Categories** (`src/constants/interests.ts`)
- **Molecular Biology Interests** (10 options)
  - Genomics, Gene Editing, Molecular Diagnostics, Epigenetics, Transcriptomics, Proteomics, Cancer Biology, Molecular Genetics, Bioinformatics, Synthetic Biology

- **Microbiology Interests** (10 options)
  - Medical Microbiology, Clinical Diagnostics, Virology, Bacteriology, Mycology, Parasitology, Antimicrobial Resistance, Environmental Microbiology, Food/Water/Public Health, Microbial Genetics

## Database Schema

### profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY (references auth.users),
  first_name TEXT,
  surname TEXT,
  email TEXT,
  phone TEXT,
  year_of_study TEXT,
  course TEXT,
  interests TEXT,
  is_alumni BOOLEAN,
  avatar_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### community_members Table
```sql
CREATE TABLE community_members (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  year_of_study TEXT,
  course TEXT,
  interests TEXT,
  created_at TIMESTAMP
)
```

## Design System

### Verdant Green Theme
- **Primary**: HSL(142, 65%, 45%) - Main call-to-action buttons, progress bars
- **Secondary**: HSL(120, 70%, 48%) - Deep forest green for headers
- **Accent**: HSL(130, 75%, 42%) - Vivid verdant for highlights
- **Background**: Dark mode: HSL(210, 15%, 8%)

### Components
- Built with shadcn/ui components
- Tailwind CSS for styling
- Lucide React for icons
- Responsive design (mobile-first)

## User Flows

### Registration Flow
1. User visits `/join`
2. Enters personal information (Step 1)
3. Selects academic details and interests (Step 2)
4. Creates secure password (Step 3)
5. Account created in Supabase Auth
6. Profile record created in profiles table
7. Community member entry created
8. Redirected to `/dashboard`

### Profile Completion Flow
1. User sees dashboard with profile completion %
2. Clicks "Complete Profile" or "Edit Profile"
3. Navigates to `/profile`
4. Uploads profile picture (optional)
5. Updates phone and interests
6. Clicks "Save Changes"
7. Data synced to Supabase

### Dashboard Access
1. User logs in via Auth page
2. Redirected to dashboard
3. Profile data loaded from database
4. Completion percentage calculated
5. Upcoming events fetched
6. Can view member community, edit profile, or logout

## Security Features

- ✅ Row-level security (RLS) on all tables
- ✅ Email/password authentication with Supabase Auth
- ✅ User-scoped profile access
- ✅ Admin role support
- ✅ Input validation (phone, email, password)
- ✅ Password strength requirements
- ✅ CORS protection
- ✅ Secure image upload to Supabase Storage

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Index | Home page |
| `/join` | Join | Sign up form |
| `/auth` | Auth | Login page |
| `/dashboard` | Dashboard | Member dashboard |
| `/profile` | Profile | Edit profile page |
| `/members` | Members | View community members |
| `/events` | Events | View events |
| ... | ... | Other pages |

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Supabase Auth** - Authentication
- **Supabase Storage** - Image hosting

### Deployment
- **Netlify** - Hosting and CI/CD
- **GitHub** - Version control

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- Netlify account (for deployment)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env
cp .env.example .env

# Configure Supabase
# Add your VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check
```

## Environment Variables

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

## File Structure

```
src/
├── pages/
│   ├── Join.tsx           # Sign-up form
│   ├── Dashboard.tsx      # Member dashboard
│   ├── Profile.tsx        # Profile editor
│   ├── Auth.tsx           # Login page
│   ├── Members.tsx        # Community view
│   └── ...
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ui/                # shadcn/ui components
│   └── ...
├── lib/
│   ├── validation.ts      # Input validation utilities
│   └── utils.ts
├── constants/
│   ├── interests.ts       # Interest categories
│   └── ...
├── hooks/
│   ├── useAuth.tsx        # Authentication hook
│   └── ...
└── App.tsx
```

## Future Enhancements

- [ ] Email verification during signup
- [ ] Two-factor authentication
- [ ] Forgot password flow
- [ ] Social login (Google, GitHub)
- [ ] Member search and filtering
- [ ] Event registration and RSVP
- [ ] Notification preferences
- [ ] Member directory export
- [ ] Analytics dashboard
- [ ] Automated welcome emails

## Support

For issues or questions, please contact the MUMBSO development team or open an issue on GitHub.

## License

© 2026 MUMBSO - Maseno University Biotechnology Student Organization