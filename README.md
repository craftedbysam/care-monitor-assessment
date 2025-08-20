# care-monitor-assessment
A full-stack Angular application with Node.js backend demonstrating authentication, routing, and HTTP client functionality.

# Project Overview
This project is a web application built with Angular 20 and Node.js that includes:
- User authentication with JWT tokens and HTTP-only cookies
- Protected routes with route guards
- Dashboard and list management
- Responsive Material Design UI
- Comprehensive unit testing

### Frontend
**Angular 20** - Latest Angular framework with standalone components
**Angular Material** - UI component library
**RxJS** - Reactive programming
**TypeScript** - Type-safe JavaScript
**SCSS** - Styling

### Backend
**Node.js** - Server runtime
**Express.js** - Web framework
**JWT** - Authentication tokens
**CORS** - Cross-origin resource sharing

### Testing
**Jasmine** - Testing framework
**Karma** - Test runner

### Prerequisites
Before running this project, make sure you have:
**Node.js** (v18 or higher)
**npm** (v8 or higher)
**Angular CLI** (v20 or higher)

### Installation & Setup
# 1. Clone the Repository

```bash
git clone https://github.com/your-username/care-monitor-assessment.git
cd care-monitor-assessment
```

# 2. Install Dependencies

```bash
npm install
```

### Running the Application
# 1. Start the Backend Server

```bash
node server/app.js
```
The server will start on `http://localhost:3000`

# 2. Start the Angular Frontend

```bash
ng serve
```
The application will be available at `http://localhost:4200`

 Authentication

### Test Credentials

Use these credentials to log in:

**Email**: `test@test.com`
**Password**: `test123`

OR

**Email**: `example@example.com`  
**Password**: `example123`

### Features:
# 1. Authentication System
- JWT token-based authentication
- HTTP-only cookies for security
- Route protection with guards
- Automatic redirection for authenticated users

# 2. Dashboard
- Welcome screen with user information
- Navigation to list section
- Logout functionality

# 3. Items List
- Displays a list of items from the API
- Loading states and error handling
- Expandable item details
- Retry functionality on errors

# 4. UI/UX
- Material Design components
- Responsive layout
- Form validation
- Error messaging

### Testing
# Run Unit Tests

```bash
ng test
```

### Test Coverage

The project includes comprehensive unit tests for:
- Components (Login, Dashboard, List)
- Services (AuthService, ListStore)
- Route Guards (AuthGuard)

### API Endpoints
# 1. Authentication
- `POST /api/login` - User login

# 2.Data
- `GET /api/items` - Fetch items list

### Architecture

# 1. **Signal-based State Management**
- Implemented Angular signals for reactive state management in the ListStore.

# 2. **HTTP-only Cookies**
- Chose HTTP-only cookies over localStorage for better XSS protection.

# 3. **Reactive Forms**
- Implemented reactive forms with comprehensive validation.

# 4. Security
- HTTP-only cookies prevent XSS attacks
- CORS configuration for cross-origin requests
- JWT tokens with expiration

# 5. Performance
- Lazy loading for protected routes
