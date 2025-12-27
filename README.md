# PillScript Pharmacy

A professional networking platform for pharma professionals to connect, find distributors, and join area groups.

## Features

- **User Registration**: Sign up with username, email, phone, blood group, company selection, and profile image
- **Professional Networking**: Connect with pharma professionals
- **Distributor Information**: Access comprehensive distributor information
- **Area Groups**: Join WhatsApp groups for your area
- **Company Directory**: Browse and search pharmaceutical companies

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Nhost** - Backend as a Service (Auth, Database, Storage)
- **Apollo Client** - GraphQL client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Shadcn UI** - UI components

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Nhost account (or use the provided configuration)

### Installation

1. Clone the repository:
```bash
cd pillscript-pharmacy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Nhost credentials:
```env
NEXT_PUBLIC_NHOST_SUBDOMAIN=your-subdomain
NEXT_PUBLIC_NHOST_REGION=your-region
NEXT_PUBLIC_NHOST_STORAGE_URL=your-storage-url
```

4. Set up the database:

Run the SQL schema file in your Nhost/Hasura console:
```sql
-- Run database/pharmacy-user-schema.sql
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Users Table
- `user_id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `phone` (VARCHAR, Unique)
- `display_name` (VARCHAR)
- `auth_user_id` (UUID, Foreign Key to auth.users)
- `created_at`, `updated_at` (Timestamps)

### Pharmacy Users Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to users)
- `blood_group` (VARCHAR, Enum: A+, A-, B+, B-, AB+, AB-, O+, O-)
- `image_id` (VARCHAR, Nhost storage file ID)
- `company_id` (UUID, Foreign Key to company)
- `active` (BOOLEAN)
- `created_at`, `updated_at` (Timestamps)

### Company Table
- `company_id` (UUID, Primary Key)
- `company_fullname` (VARCHAR, Unique)
- `company_displayname` (VARCHAR)
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (Timestamps)

## Project Structure

```
pillscript-pharmacy/
├── app/
│   ├── page.tsx          # Landing page
│   ├── signup/
│   │   └── page.tsx     # Signup page
│   ├── login/
│   │   └── page.tsx     # Login page
│   └── layout.tsx        # Root layout
├── components/
│   └── ui/               # Shadcn UI components
├── lib/
│   ├── nhost.ts         # Nhost client
│   ├── apollo-client.ts # Apollo Client setup
│   └── utils.ts         # Utility functions
├── provider/
│   ├── NhostProvider.tsx
│   └── ApolloProvider.tsx
├── database/
│   └── pharmacy-user-schema.sql
└── public/              # Static assets
```

## Signup Flow

1. User fills out the signup form (username, email, phone, blood group, company, image)
2. Image is uploaded to Nhost storage (if provided)
3. User record is created in the `users` table
4. Pharmacy user record is created in the `pharmacy_users` table with the user_id
5. User is redirected to login page

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## License

MIT
