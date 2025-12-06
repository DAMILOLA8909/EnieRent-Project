# EnieRent-Project
ALX Capstone Project for Front-End Development Training.

# 🏠 EnieRent - Property Rental Platform
<div align="center">
    <img src = "https://img.shields.io/badge/EnieRent-Housing_Solution-blue">
    <img src = "https://img.shields.io/badge/Next.js-14-black">
    <img src = "https://img.shields.io/badge/TypeScript-5-blue">
    <img src = "https://img.shields.io/badge/Tailwind_CSS-4-38B2AC">
    <img src = "https://img.shields.io/badge/React-18-61DAFB">
    <img src = "https://img.shields.io/badge/License-MIT-green">
</div>
<div align="center">
 Find Your Perfect Home in Nigeria
    
 [Live Demo](https://enie-rent-project.vercel.app/) · Report Bug · Request Feature
</div>

## 📋 Table of Contents
- 🌟 Features

- 🚀 Live Demo

- 🛠️ Tech Stack

- 📁 Project Structure

- ⚡ Getting Started

- 🎨 UI Components

- 📊 State Management

- 🔐 Authentication

- 🏠 Property Features

- 👤 User Roles

- 🚀 Deployment

- 📈 Project Roadmap

- 🤝 Contributing

- 📄 License

- 🙏 Acknowledgments

---

### 🌟 Features

#### ✨ Core Features

- 🔍 Advanced Property Search - Filter by location, price, type, bedrooms, amenities

- 🏘️ Property Listings - Grid and list views with sorting options

- 📸 Image Galleries - Interactive carousels for property images

- 📱 Fully Responsive - Mobile-first design for all devices

- 🌙 Dark/Light Mode - Toggle between themes

- ⚡ Fast Performance - Optimized with Next.js 14

#### 🔐 Authentication System

- 👤 User Registration & Login - Role-based (Tenant/Landlord)

- 🔒 LocalStorage Auth - Persistent sessions without backend

- 🛡️ Password Hashing - Basic hash simulation for security

- 👥 Role-Based Access - Different dashboards for tenants/landlords

#### 🏠 Property Management

- 📝 Property Details - Comprehensive information pages

- ⭐ Favorite System - Save properties for later

- 📅 Visit Scheduling - Book property viewings

- 💬 Contact Landlords - Direct messaging system

- 🗺️ Location Integration - Map previews (coming soon)

#### 👤 User Dashboard

**For Tenants:**

- ❤️ Saved properties

- 📅 Scheduled visits

- 📋 Application history

- 🔔 Notifications

**For Landlords:**

- ➕ Add new properties

- ✏️ Manage listings

- 👥 Tenant inquiries

- 📊 Property analytics

---

### 🚀 Live Demo

Experience EnieRent live: [enierent.vercel.app](https://enie-rent-project.vercel.app/)

Demo Credentials:
```text
Tenant Account:
Email: john@example.com
Password: demo123

Landlord Account:
Email: sarah@example.com
Password: demo123
```

---

### 🛠️ Tech Stack

**Frontend Framework**

- **Next.js 14** - React framework with App Router

- **TypeScript** - Type-safe development

- **React 18** - Latest React features

**Styling & UI**

- **Tailwind CSS v4** - Utility-first CSS framework

- **shadcn/ui** - Reusable component library

- **Lucide React** - Beautiful icon set

- **Framer Motion** - Smooth animations

**State Management**

- **Zustand** - Lightweight state management

- **React Hook Form** - Form handling with validation

- **Zod** - Schema validation

**Development Tools**

- **ESLint** - Code linting

- **Prettier** - Code formatting

- **Husky** - Git hooks

- **Commitlint** - Conventional commits

**APIs & Libraries**

- **Fuse.js** - Fuzzy search implementation

- **date-fns** - Date manipulation

- **react-hot-toast** - Toast notifications

---

### 📁 Project Structure

```pgsql
enierent/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/           # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/        # Protected dashboard routes
│   ├── properties/       # Property pages
│   │   ├── [id]/        # Single property dynamic route
│   │   └── page.tsx     # Property listing page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/           # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   ├── properties/     # Property-related components
│   ├── home/          # Home page components
│   └── auth/          # Authentication components
├── lib/                # Utilities and stores
│   ├── store.ts       # Property Zustand store
│   ├── auth-store.ts  # Authentication store
│   └── utils.ts       # Helper functions
├── types/              # TypeScript definitions
├── data/              # Mock data and constants
├── public/            # Static assets
└── middleware.ts      # Next.js middleware
```

---

### ⚡ Getting Started

**Prerequisites**

- Node.js 18+ and npm/yarn

- Git

**Installation**

1. **Clone the repository**

```bash
    git clone https://github.com/yourusername/enierent.git
    cd enierent
```
2. **Install dependencies**

```bash
    npm install
    # or
    yarn install
```

3. **Set up environment variables**

```bash
    cp .env.example .env.local
```
Edit `.env.local` with your configuration:

```env
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    # Add other environment variables as needed
```

4. **Run the development server**

```bash
    npm run dev
    # or
    yarn dev
```

5. **Open your browser**

Navigate to `http://localhost:3000`

#### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

---

### 🎨 UI Components

**Built with shadcn/ui**

- Button - Versatile button components

- Card - Content containers

- Input - Form input fields

- Dialog - Modal dialogs

- Tabs - Tabbed interfaces

- Badge - Status indicators

- Toast - Notification system

**Custom Components**

- PropertyCard - Property listing cards with image carousel

- FilterSidebar - Advanced filtering interface

- ContactModal - Landlord contact form

- ScheduleModal - Visit scheduling interface

- HeroSection - Home page hero with search

- FeaturedCategories - Property type navigation

---

### 📊 State Management

**Zustand Stores**

- usePropertyStore - Manages property listings, filters, and sorting

- useAuthStore - Handles user authentication and sessions

**LocalStorage Integration**

- User authentication persistence

- Favorite property storage

- Filter preferences

- Form data caching

---

### 🔐 Authentication

**Features**

- Role-based authentication (Tenant/Landlord)

- LocalStorage session persistence

- Mock password hashing

- Protected routes middleware

- Auto-login on page refresh

**Security Notes**

⚠️ Important: This is a frontend-only demonstration. For production:

- Implement proper backend authentication

- Use JWT tokens with HTTP-only cookies

- Add rate limiting and CSRF protection

- Implement proper password hashing (bcrypt)

---

### 🏠 Property Features

**Search & Filtering**

- Text Search: Search by title, description, location

- Price Range: Slider-based price filtering

- Property Type: Apartments, Self-Contains, Duplexes, etc.

- Bedrooms: Filter by number of bedrooms

- Amenities: Multiple amenities selection

- Sorting: Price, rating, newest first

**Property Details**

- Image gallery with navigation

- Amenities with icons

- Location information

- Contact and schedule options

- Similar property suggestions

- Reviews and ratings

---

### 👤 User Roles

**Tenant Features**

- Browse and search properties

- Save favorite properties

- Schedule property visits

- Contact landlords

- View booking history

- Receive notifications

**Landlord Features**

- List new properties

- Manage existing listings

- View tenant inquiries

- Schedule property viewings

- Update property availability

- Track property performance

---

### 🚀 Deployment

**Vercel (Recommended)**

1. Push your code to GitHub

2. Import repository to Vercel

3. Configure build settings:

    - Build Command: `npm run build`

    - Output Directory: `.next`

4. Deploy!

**Netlify**

1. Connect your Git repository

2. Set build command: `npm run build`

3. Set publish directory: `.next`

4. Add environment variables

**Environment Variables**

```env
    NEXT_PUBLIC_APP_URL=https://your-domain.com
    # Add other required variables
```

---

### 📈 Project Roadmap

**Week 1: Foundation ✅**

- Project setup with Next.js 14 + TypeScript

- Tailwind CSS v4 configuration

- Basic UI components (Header, Footer, Hero)

- Home page with featured properties

- Responsive design implementation

**Week 2: Core Features ✅**

- Property listing page with filters

- Single property detail page

- Authentication system

- User dashboard

- Contact and scheduling modals

**Week 3: Advanced Features (In Progress)**

- Map integration with Leaflet/Mapbox

- AI-powered search suggestions

- Virtual tour with 360° images

- Chat simulation system

- Payment UI simulation

**Week 4: Polish & Launch (Planned)**

- Performance optimization

- SEO improvements

- PWA capabilities

- Comprehensive testing

- Documentation

**Future Enhancements**

- Real backend integration

- Mobile app (React Native)

- AI property recommendations

- Social sharing features

- Multi-language support

---

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository

2. Create a feature branch
```bash
    git checkout -b feature/amazing-feature
```
3. Commit your changes
```bash
    git commit -m 'feat: add amazing feature'
```
4. Push to the branch
```bash
    git push origin feature/amazing-feature
```
5. Open a Pull Request

**Development Guidelines**

- Follow TypeScript best practices

- Use Tailwind CSS utility classes

- Write meaningful commit messages

- Add tests for new features

- Update documentation as needed

---

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🙏 Acknowledgments

- Next.js Team - For the amazing React framework

- Tailwind CSS - For the utility-first CSS framework

- shadcn/ui - For beautiful component library

- Lucide - For the icon set

- All Contributors - Who help improve this project

---
---

<div align="center">
**Built with ❤️ for better housing solutions in Nigeria**
Report Bug ·
Request Feature ·
View Portfolio

</div>

---
