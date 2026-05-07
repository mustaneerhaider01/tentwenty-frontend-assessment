# tentwenty-frontend-assessment

## Setup instructions

### 1) Prerequisites

- Node.js **20.9+** (Next.js 16 minimum; Node.js 18 is not supported)
- TypeScript **5.1+** (Next.js 16 minimum; this repo uses TypeScript 5)

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

This app uses NextAuth with a JWT session strategy. You must provide:

- `AUTH_SECRET` (required)  
  Used to sign/verify the NextAuth JWT.

Example (macOS/Linux):

```bash
export AUTH_SECRET="dev-secret"
```

### 4) Run the development server

```bash
npm run dev
```

Open: `http://localhost:3000`

### 5) Login (mock credentials)

Authentication is configured as a **Credentials** provider and uses the in-repo mock users from `data/index.ts`. Use one of the following:

```text
john.doe@company.com / hashed_password_1
sarah.khan@company.com / hashed_password_2
ali.ahmed@company.com / hashed_password_3
```

### 6) Useful scripts

- `npm run lint`
- `npm run build`
- `npm run start`
- `npm run test`

## Frameworks/libraries used

### App framework

- **Next.js (App Router)**: routes under `app/` (including route groups like `(dashboard)`).
- **React 19** (with **TypeScript**).

### Authentication / sessions

- **NextAuth.js** (`next-auth`): Credentials-based login and JWT sessions.

### Styling/UI

- **Tailwind CSS v4** (via `@import "tailwindcss"` in `app/globals.css`)
- **shadcn UI** (`shadcn`, plus local components under `components/ui/`)
- **Radix UI** (`radix-ui`) primitives used inside UI components
- **class-variance-authority** (`class-variance-authority`) for variant styling
- **clsx** and **tailwind-merge** for class name merging (`cn()` helper in `lib/utils.ts`)
- **lucide-react** for icons
- **sonner** for toast notifications (see `Toaster` usage in `app/layout.tsx`)

### Data/table & UI utilities

- **@tanstack/react-table** for the timesheets table (sorting + row rendering)
- **react-responsive-pagination** for the bootstrap-themed pagination UI
- **date-fns** for date formatting in the table
- **zod** and **react-hook-form** for login form validation (`components/auth/auth-form.tsx`)

## Assumptions or notes

### Mock (in-memory) backend data

The timesheets API is backed by static mock data in `data/index.ts`:

- `mockTimesheets`
- `mockTimesheetEntries`
- `mockUsers`

The endpoint `app/api/getWeeklyTimesheets/route.ts` computes:

- `totalHours` by summing `hours` for the selected timesheet entries
- `status` using the logic from `app/constants/index.ts`:
  - `Missing` when `totalHours === 0`
  - `Incomplete` when `0 < totalHours < 40`
  - `Completed` when `totalHours >= 40`

No database is involved; refreshing the app resets nothing because everything is local/static.

### Auth guard (Next.js 16 proxy/middleware convention)

There is an auth-guard implemented in `proxy.ts` using:

- `export async function proxy(req: NextRequest) { ... }`
- `export const config = { matcher: ["/"] }`

Per the Next.js 16 convention used here, the runtime is expected to execute this guard from `proxy.ts` (with the function named `proxy`) and apply it to the `/` route matcher.

### Routes implemented

Current user flow/routes:

- `GET /login`: login screen (redirects away if already authenticated)
- `GET /`: timesheets list (table) + pagination driven by query params (`page`, `limit`)
- `GET /timesheet/[id]`: placeholder page (not yet fully implemented)

### Production URL assumptions

The API client (`lib/api/timesheets.ts`) uses `lib/utils.ts#getBaseUrl()`:

- in production, it expects `process.env.VERCEL_URL`
- locally, it falls back to `http://localhost:3000`

If you deploy outside Vercel, you may need to adjust this base URL logic.

## Time spent

2 days
