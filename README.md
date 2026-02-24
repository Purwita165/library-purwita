Library Purwita

Library Purwita is a web-based library application built using React and TypeScript.  
This project was developed as part of a frontend bootcamp assignment with focus on clean architecture, state management, and modern UI practices.

---

Live Demo

https://library-purwita.vercel.app

---

Tech Stack

-React + TypeScript – Component-based architecture with type safety  
-Vite – Fast development & build tool  
-Tailwind CSS – Utility-first styling  
-Redux Toolkit – Global state management (auth, UI state)  
-TanStack Query (React Query) – Data fetching & caching  
-React Router – Routing & protected routes  
-Day.js – Date formatting  

---

Features

Authentication
- Login & Register
- JWT token handling
- Protected routes

Book Browsing
- View book list
- Search & filter by category
- Book detail page
- Review display

Borrow System
- Borrow book with optimistic update
- Stock automatically reduced
- Loan history tracking

User Features
- My Loans (BORROWED / RETURNED status)
- My Profile (user data & statistics)

---

Project Structure

src/ 
├── components/   → Reusable UI components 
├── pages/        → Main application pages 
├── services/     → API service layer 
├── routes/       → Route protection 
├── constants/    → Static configs 
├── lib/          → Utility functions

The project follows a layered approach:
- UI Layer (components)
- State Layer (Redux & React Query)
- Service Layer (API calls)
- Routing Layer (ProtectedRoute)

---

Installation & Setup

```bash
npm install
npm run dev

MVP Scope
Login & Register working
Book list with filter/search
Book detail & reviews
Borrow book with stock update
Loan history
Responsive UI
Loading & error states handled

Author
Purwita Musaffa
Frontend Developer