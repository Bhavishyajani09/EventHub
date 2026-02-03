# Role-Based Routing System

## Overview
The EventHub application now supports role-based routing that automatically shows different sections based on user roles:

- **User (default)**: Shows the regular user interface with events, movies, bookings, etc.
- **Organizer**: Shows the organizer dashboard with event management, analytics, etc.
- **Admin**: Shows the admin panel with user management, organizer approval, etc.

## How It Works

### 1. MainRouter Component
The `MainRouter` component (`src/components/MainRouter.jsx`) checks the user's role and renders the appropriate router:

```jsx
if (user?.role === 'admin') {
  return <AdminAppRouter />;
} else if (user?.role === 'organizer') {
  return <OrganizerAppRouter />;
} else {
  return <UserAppRouter />; // Default for users and non-authenticated
}
```

### 2. Role-Specific Routers
- **AdminAppRouter**: Handles admin-specific routing and renders AdminPanel
- **OrganizerAppRouter**: Handles organizer-specific routing and renders OrganizerPanel  
- **UserAppRouter**: Handles user-specific routing (existing functionality)

### 3. Authentication Flow
1. User selects role type (User/Organizer/Admin) on login form
2. Login component calls appropriate auth service method
3. Backend returns user data with role information
4. AuthContext stores user data including role
5. MainRouter automatically redirects to appropriate section

### 4. Backend Role Support
All authentication endpoints return role information:
- User login: `/auth/user/login` → `{ user: { role: 'user' } }`
- Organizer login: `/api/auth/organizer/login` → `{ organizer: { role: 'organizer' } }`
- Admin login: `/api/auth/admin/login` → `{ admin: { role: 'admin' } }`

## Usage

### For Users
- Select "User" on login form
- Access regular EventHub features (events, movies, bookings)

### For Organizers  
- Select "Organizer" on login form
- Access organizer dashboard with:
  - Event creation and management
  - Booking analytics
  - Revenue reports
  - Review management

### For Admins
- Select "Admin" on login form  
- Access admin panel with:
  - User management
  - Organizer approval
  - System analytics
  - Event oversight

## File Structure
```
src/
├── components/
│   ├── MainRouter.jsx              # Main role-based router
│   ├── admin/
│   │   ├── AdminAppRouter.jsx      # Admin routing
│   │   └── AdminPanel.jsx          # Admin dashboard
│   ├── organizer/
│   │   ├── OrganizerAppRouter.jsx  # Organizer routing
│   │   └── OrganizerPanel.jsx      # Organizer dashboard
│   └── user/
│       └── USER_AppRouter.jsx      # User routing (existing)
├── context/
│   └── AuthContext.jsx             # Handles authentication state
└── services/
    └── authService.js              # API calls for different user types
```

## Security Notes
- Role information is stored in JWT tokens on the backend
- Frontend role checking is for UX only - backend enforces permissions
- Each role has separate API endpoints with appropriate middleware
- Logout clears all authentication data and redirects to user section