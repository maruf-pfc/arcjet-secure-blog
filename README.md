# Arcjet Secure Blog

**A highly secure and performance-optimized blogging platform built with Next.js, Tailwind CSS, ShadCN, and Arcjet.**  

## 🚀 Features

- **Advanced Security**: Protects against common web threats using Arcjet Shield WAF.
- **Bot Detection**: Prevents automated attacks and spam submissions.
- **Rate Limiting**: Controls the number of requests to safeguard APIs.
- **Email Validation**: Ensures only valid emails are accepted during sign-ups.
- **PII Redaction**: Masks sensitive user data like emails, phone numbers, and IPs.
- **Customizable Security Rules**: Define security policies directly in code.
- **API Protection**: Secures API endpoints against SQL injection, XSS, CSRF, and other attacks.
- **Testing in Dev & Prod**: Allows testing security policies before deploying.

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) + [ShadCN](https://ui.shadcn.com/)
- **Security**: [Arcjet](https://arcjet.dev/)
- **Backend**: Next.js API Routes (secured with Arcjet middleware)

---

## 🔒 Security Implementation

### Middleware Configuration (`middleware.ts`)

```typescript
import arcjet, { createMiddleware, shield } from "@arcjet/next";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Apply to all routes except static assets
};

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "LIVE", // Set to "DRY_RUN" for testing
    }),
  ],
});

export default createMiddleware(aj);
```

---

## 📌 Getting Started

### 1️⃣ Installation

```bash
npm install @arcjet/no
```

### 2️⃣ Setting Up Arcjet

Create a `.env.local` file and add your **Arcjet API Key**:

```txt
ARCJET_KEY=your-api-key-here
```

### 3️⃣ Running the Project

```bash
npm run dev
```

---

## 📖 Usage Examples

### 🚀 Protecting a Signup Form

```typescript
import arcjet from "@arcjet/next";

const aj = arcjet({ key: process.env.ARCJET_KEY! });

export default async function handler(req, res) {
  const decision = await aj.check(req);
  if (!decision.allow) {
    return res.status(403).json({ message: "Access denied" });
  }
  res.status(200).json({ message: "Signup successful" });
}
```

### 🔐 Rate Limiting an API Endpoint

```typescript
import { rateLimit } from "@arcjet/next";

export default async function handler(req, res) {
  const decision = await rateLimit(req, { max: 100, window: "1m" }); // 100 requests per minute
  if (!decision.allow) {
    return res.status(429).json({ message: "Too many requests" });
  }
  res.status(200).json({ message: "Request accepted" });
}
```

---

## 🛠 Testing Security Rules

Use `DRY_RUN` mode to test security policies before enforcing them:

```typescript
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "DRY_RUN", // Logs attacks instead of blocking
    }),
  ],
});
```

Run tests using `Newman`:

```bash
newman run security-tests.json
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📩 Support

For any issues, reach out to **[Arcjet Support](https://arcjet.dev/)** or open a GitHub issue.

---
