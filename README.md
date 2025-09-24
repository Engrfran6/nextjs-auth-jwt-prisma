# 🔐 Custom Authentication System in Next.js (with JWT, Prisma & MongoDB)

Authentication is a critical part of every secure app. In this project, I implemented a full **auth
system in Next.js (App Router)** using:

- ✅ Secure password hashing with `bcrypt`
- ✅ Schema validation using `Zod`
- ✅ JWT-based session management using `jose`
- ✅ Cookie handling with `next/headers`
- ✅ Database integration via `Prisma` & `MongoDB`

---

## 📚 Key Concepts

### ✅ Authentication

- Verifies a user's identity using email and password
- Passwords are hashed with `bcrypt` before storing

### 🧠 Session Management

- Uses **JWT tokens** to store session data (`userId`, `expiresAt`)
- Sessions are stored in **`httpOnly` cookies** (not accessible by JS)
- All session logic is handled server-side with `next/headers`

### 🔐 Authorization

- Once authenticated, users can access protected pages (e.g. `/profile`)
- Sessions expire after 7 days unless refreshed

---

## 🛠️ Tech Stack

| Feature       | Tech Used              |
| ------------- | ---------------------- |
| Frontend      | Next.js (App Router)   |
| Backend       | Next.js Server Actions |
| Auth          | Custom JWTs via `jose` |
| Hashing       | `bcrypt`               |
| Validation    | `Zod`                  |
| ORM           | `Prisma`               |
| Database      | MongoDB                |
| Session Store | Cookies + JWT          |

---

## 🚀 Features

- ✅ User Signup & Login
- 🔐 Hashed passwords with `bcrypt`
- 🧪 Form validation with Zod
- 📦 Prisma schema for user management
- 🍪 Secure server-side sessions using JWT + Cookies
- 🧼 Graceful error handling & validation feedback

---

## 🖥️ Project Pages

- `/` — User registration form
- `/login` — User login form
- `/profile` — User profile preview page (protected route)

All pages are built using Next.js App Router with server-side authentication checks.

---

## 🚀 Deployment

This project is deployed live on [Vercel](https://vercel.com) —  
Visit the live demo here: [https://your-project-url.vercel.app](https://your-project-url.vercel.app)

---

## 🔄 Signup Flow

1. Validate user input with Zod
2. Hash password using `bcrypt`
3. Save user to MongoDB via Prisma
4. Create JWT-based session token
5. Store token in `httpOnly` cookie
6. Redirect user to `/profile`

---

## 🔁 Login Flow

1. Validate credentials with Zod
2. Find user by email using Prisma
3. Compare password using `bcrypt`
4. Create new session token
5. Store session in cookie
6. Redirect to `/profile`

---

## 🔁 Session Handling (`libs/sessions.ts`)

- 🔐 **`createSession(userId)`**  
  Generates a JWT token with 7-day expiration and stores it in a secure cookie.

- 🔄 **`updateSession()`**  
  Extends the expiration date of the current session.

- 🧠 **`getSession()`**  
  Verifies and decodes the JWT from the cookie, returning session payload.

- 🚪 **`deleteSession()`**  
  Deletes the session cookie to log the user out.

---

## 📦 Prisma Example (User Model)

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

---

## 💻 Getting Started

```bash
# 1. Clone the repo:
git clone https://github.com/your-username/nextjs-auth-system
cd nextjs-auth-system

# 2. Install dependencies:
npm install

# 3. Set up your environment variables:
# Create a .env file in the root of your project:
DATABASE_URL=mongodb+srv://your-db-url
SESSION_SECRET=your-secret-key

# 4. Generate Prisma client:
npx prisma generate

# 5. Run the development server:
npm run dev
```

---

## 👨‍💻 Author

Built with ❤️ by Francis Okpoluaefe  
🔗 [Connect on LinkedIn](https://linkedin.com/in/deulo)  
🌐 [GitHub Profile](https://github.com/engrfran6)

---

## 📌 Notes

This project uses no external auth libraries like NextAuth or Clerk — it is a 100% custom
authentication flow.

You can extend it with:

- ✅ Email verification
- ✅ Forgot/reset password functionality
- ✅ Role-based access control (RBAC)
- ✅ OAuth or magic link authentication

# nextjs-auth-jwt-prisma
