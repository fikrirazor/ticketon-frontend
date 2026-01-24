# TicketOn - Event Management Platform

TicketOn is a premium event management platform built with React, TypeScript, and Tailwind CSS. It allows users to discover events, book tickets, and manage transactions seamlessly.

## 🚀 Recent Features: Transaction Flow UI

We have implemented a complete transaction flow that includes:

- **Checkout Page**: Dynamic price calculation, point usage settings, and voucher application.
- **Payment Proof Page**: 2-hour transaction timer, file upload with preview, and progress indicator.
- **Transaction Status**: Visual timeline tracking 6 statuses (Waiting for Payment, Verification, Done, Rejected, Expired, Canceled).
- **Core Components**: `CountdownTimer`, `PriceSummary`, `CheckoutForm`, `PaymentProofUpload`, and `TransactionStatus`.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **State Management**: Zustand
- **Routing**: React Router Dom v6

## 🔑 Mock Credentials (For Testing)

Since the backend is currently in development, you can use these mock credentials to explore the app:

| Role                   | Email             | Password     |
| ---------------------- | ----------------- | ------------ |
| **Organizer (Admin)**  | `admin@pwk.com`   | `admin`      |
| **Participant (User)** | _Any valid email_ | _Any string_ |

## 📦 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components/transactions`: Transaction-specific UI components.
- `src/pages`: Main application pages (Home, Checkout, PaymentProof, etc.).
- `src/store`: Zustand state management (Auth, etc.).
- `src/types`: TypeScript interface definitions.
