# EventHub Authentication Integration

## Features Implemented

✅ **Authentication Context**: Manages user state across the app
✅ **Role-based Authentication**: Support for User, Organizer, and Admin roles
✅ **Protected Routes**: Role-based access control
✅ **Persistent Authentication**: User stays logged in after page refresh
✅ **Unified Login/Register**: Single forms handling all user types
✅ **Role-based Redirects**: Automatic redirect to appropriate dashboard

## API Endpoints Used

### User Authentication
- `POST /auth/user/login`
- `POST /auth/user/register`

### Organizer Authentication  
- `POST /api/auth/organizer/login`
- `POST /api/auth/organizer/register`

### Admin Authentication
- `POST /api/auth/admin/login`

## Routes

### Public Routes
- `/` - Home page
- `/login` - Login form
- `/register` - Register form
- `/unauthorized` - Access denied page

### Protected Routes
- `/dashboard` - User dashboard (role: user)
- `/organizer/dashboard` - Organizer dashboard (role: organizer)  
- `/admin/dashboard` - Admin dashboard (role: admin)
- `/admin/*` - Admin panel (role: admin)

## Setup Instructions

1. **Backend**: Ensure your backend is running on `http://localhost:5000`

2. **Frontend**: 
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Test Authentication**:
   - Go to `http://localhost:3000`
   - Click "Login" or "Register"
   - Select user type (User/Organizer/Admin)
   - Fill in credentials and submit
   - You'll be redirected to the appropriate dashboard

## User Flow

1. **Registration**: Users select their role and register
2. **Login**: Users select their role and login  
3. **Authentication**: JWT token and user data stored in localStorage
4. **Authorization**: Routes protected based on user role
5. **Persistence**: Authentication state maintained across page refreshes
6. **Logout**: Clears token and redirects to home

## Security Features

- JWT token storage in localStorage
- Role-based route protection
- Automatic token validation
- Secure API communication with axios
- Error handling for authentication failures