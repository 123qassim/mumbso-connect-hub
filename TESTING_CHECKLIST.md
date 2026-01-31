# Membership Onboarding System - Testing Checklist

## Sign-Up Flow (/join)

### Step 1: Personal Information
- [ ] Form displays correctly
- [ ] First name validation works
- [ ] Surname validation works
- [ ] Email validation works (rejects invalid formats)
- [ ] Phone number validation works (accepts 0712345678, +254712345678)
- [ ] Phone number validation rejects invalid formats
- [ ] Next button enabled only when all fields valid
- [ ] Error messages display on validation failure

### Step 2: Academic & Interests
- [ ] Step 2 displays after clicking Next
- [ ] Alumni checkbox toggles year_of_study field visibility
- [ ] Year of study dropdown works when not alumni
- [ ] Course field displays as locked (Medical Biotechnology with IT)
- [ ] Interest selection limits to max 3
- [ ] Interests are categorized correctly
- [ ] Selected interests display count (X/3)
- [ ] Cannot select more than 3 interests
- [ ] Back button returns to Step 1 with data preserved

### Step 3: Account Security
- [ ] Step 3 displays password fields
- [ ] Password requirements display dynamically
- [ ] Password validation shows all 5 requirements
- [ ] Passwords must match or show error
- [ ] Back button returns to Step 2
- [ ] Create Account button is disabled until password valid

### Final Step
- [ ] Account created in Supabase Auth
- [ ] Profile record inserted with all data
- [ ] Community member entry created
- [ ] User redirected to /dashboard after success
- [ ] Loading spinner shows during creation
- [ ] Error messages display on failure

## Dashboard (/dashboard)

### Authentication
- [ ] Unauthenticated users redirected to /auth
- [ ] Authenticated users see dashboard
- [ ] User's name displays in welcome message

### Profile Section
- [ ] Profile picture displays (or default avatar)
- [ ] Name, email, phone display correctly
- [ ] Course displays correctly
- [ ] Status shows "Active Member" or "Alumni"
- [ ] Interests display as tags
- [ ] Edit Profile button navigates to /profile

### Profile Completion Indicator
- [ ] Progress bar displays correctly (0-100%)
- [ ] Completion percentage calculated correctly
- [ ] Checklist items show filled/unfilled status
- [ ] Link to complete profile works

### Quick Stats
- [ ] Community members count displays
- [ ] Upcoming events count displays
- [ ] Research papers count displays
- [ ] Programs count displays

### Benefits Section
- [ ] All 3 benefit cards display
- [ ] Icons display correctly
- [ ] Benefit descriptions are readable

### Membership Benefits
- [ ] All benefit items display
- [ ] Icons and descriptions are clear

### Quick Actions
- [ ] 3 action buttons display
- [ ] Buttons have proper styling

### Logout
- [ ] Logout button appears in header
- [ ] Clicking logout signs out user
- [ ] User redirected to home page
- [ ] Toast notification shows "Logged out"

## Profile Page (/profile)

### Authentication
- [ ] Unauthenticated users redirected to /auth

### Profile Picture
- [ ] Avatar preview displays current image (if exists)
- [ ] Upload button works
- [ ] Image file picker opens
- [ ] Preview updates after selection
- [ ] 5MB file size limit enforced
- [ ] Image uploads to Supabase Storage

### Personal Information
- [ ] First name displays as read-only (disabled)
- [ ] Surname displays as read-only (disabled)
- [ ] Email displays as read-only (disabled)
- [ ] Phone number is editable
- [ ] Phone validation works (Kenyan format)
- [ ] Phone error messages display

### Academic Information
- [ ] Alumni checkbox toggles correctly
- [ ] Year of study dropdown shows when not alumni
- [ ] Year of study hidden when alumni
- [ ] Course displays as locked
- [ ] Alumni status can be toggled

### Interests
- [ ] All 20 interests display
- [ ] Interests organized by category
- [ ] Max 3 interests can be selected
- [ ] Cannot select more than 3
- [ ] Selected count updates
- [ ] Selected interests saved on form submit

### Save Functionality
- [ ] Save button enabled/disabled appropriately
- [ ] Loading indicator shows during save
- [ ] Success message displays after save
- [ ] Error message displays on failure
- [ ] Back button navigates to dashboard
- [ ] Data persists after page refresh

## Validation Tests

### Phone Number Validation
- [ ] ✅ `0712345678` accepted
- [ ] ✅ `+254712345678` accepted
- [ ] ✅ `254712345678` accepted
- [ ] ❌ `712345678` rejected
- [ ] ❌ `07123456` rejected (too short)
- [ ] ❌ `abc1234567` rejected

### Email Validation
- [ ] ✅ `user@example.com` accepted
- [ ] ✅ `user.name@example.com` accepted
- [ ] ❌ `userexample.com` rejected
- [ ] ❌ `user@` rejected
- [ ] ❌ `@example.com` rejected

### Password Validation
- [ ] ❌ Less than 8 characters rejected
- [ ] ❌ No uppercase letter rejected
- [ ] ❌ No lowercase letter rejected
- [ ] ❌ No number rejected
- [ ] ❌ No special character rejected
- [ ] ✅ `SecurePass123!` accepted
- [ ] ✅ `MyPassword@2026` accepted

## Database Tests

### Supabase Schema
- [ ] `profiles` table created with correct columns
- [ ] `community_members` table created
- [ ] RLS policies enabled
- [ ] User can only view own profile
- [ ] Admins can view all profiles

### Data Integrity
- [ ] User data saved correctly in profiles table
- [ ] Community member entry created for new signups
- [ ] No duplicate entries on form resubmit
- [ ] Phone numbers formatted correctly (254-prefix)
- [ ] Interests saved as comma-separated string

## Integration Tests

### Authentication Flow
- [ ] Sign up creates auth user
- [ ] Auth user linked to profile
- [ ] Login redirects to dashboard
- [ ] Logout clears session

### Data Flow
- [ ] Signup data → Auth user created
- [ ] Signup data → Profile record created
- [ ] Signup data → Community member created
- [ ] Profile edits → Database updated
- [ ] Image upload → Supabase Storage
- [ ] Image URL → Stored in profiles.avatar_url

### Navigation
- [ ] `/join` → Sign up
- [ ] `/auth` → Login
- [ ] `/dashboard` → After signup
- [ ] `/profile` → From dashboard
- [ ] Back buttons maintain data

## Responsive Design Tests

### Mobile (320px - 768px)
- [ ] Form fields stack properly
- [ ] Buttons are touch-friendly
- [ ] Images scale appropriately
- [ ] Navigation works on mobile

### Tablet (768px - 1024px)
- [ ] Layout adapts to tablet size
- [ ] Grid layouts adjust

### Desktop (1024px+)
- [ ] Full layout displays
- [ ] Multi-column layouts work
- [ ] Sticky sidebar works

## Accessibility Tests

- [ ] Form labels associated with inputs
- [ ] Error messages linked to fields
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards
- [ ] Icons have alt text or labels
- [ ] Buttons have aria-labels where needed

## Performance Tests

- [ ] Dashboard loads in < 2 seconds
- [ ] Profile page loads in < 2 seconds
- [ ] Image upload doesn't block UI
- [ ] Form submission feedback immediate
- [ ] No console errors

## Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Error Handling

- [ ] Network errors display gracefully
- [ ] Supabase errors show user-friendly messages
- [ ] Image upload errors handled
- [ ] Validation errors don't break form
- [ ] Back button works after error

---

**Status**: Ready for testing
**Date**: January 31, 2026
**Team**: MUMBSO Development