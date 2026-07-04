# QualifAi

University Accreditation Management System

A graduation project that streamlines the university accreditation process through an integrated platform for managing documents, deadlines, reports, and role-based access.

## Roles

- **Admin** – Manage faculties, employees, roles, subscriptions, and notifications
- **Manager** – Oversee accreditation types, documents, deadlines, reports, and payments
- **Employee** – Evaluate colleges, manage reports, and communicate with institutions

## Features

- **Authentication & Authorization** – Login, signup, logout, JWT-based protected routes with role-based access
- **Accreditation Management** – Academic and Programmatic accreditation types with section-level document upload and year-by-year details
- **Accreditation Evaluation** – Employee-side evaluation panel for scoring college accreditation criteria
- **College / Faculty Management** – CRUD for colleges and faculties
- **Employee Management** – Employee listing, creation, activity log, and profiles
- **Role Management** – View and create roles with permissions
- **Reporting** – Reports listing, details, final reports, and role-specific report views
- **Deadline Management** – Set deadlines with reminders and calendar integration
- **Subscription & Payments** – Pricing plans, payment processing, success/error flows
- **Notifications** – Bell icon with unread badge, notification list, admin send-notification form
- **Chat / Communication** – Full messaging interface to contact colleges with emoji picker and file attachments
- **Global Search** – Search bar in the topbar
- **Profile** – View and edit user profile
- **Help / Support** – Dedicated help page

## Tech Stack

- **React 19** – UI framework
- **Vite 7** – Build tool
- **React Router v7** – Routing
- **Axios** – HTTP client
- **Lucide React** / **FontAwesome** / **React Icons** – Icons
- **Recharts** – Charts and graphs
- **React Calendar** / **React Datepicker** – Date pickers
- **React Toastify** – Notifications
- **Emoji Picker React** – Emoji support in chat

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint the code |
