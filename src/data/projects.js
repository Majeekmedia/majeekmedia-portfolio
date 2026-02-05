export const projects = [
  {
    title: "Village Headmaster Estate Management Platform",
    type: "Client Project",
    summary:
      "A comprehensive digital platform transforming residential estate management in Nigeria. Streamlines operations, automates billing, enhances transparency, and builds thriving communities for property managers, landlords, and residents.",
    features: [
      "Unified role-based dashboards for admins, landlords, and residents",
      "Smart financial management with automated levy creation and payment tracking",
      "Multi-estate & multi-tenancy support for property management companies",
      "Community engagement through announcements and discussion forums",
      "Capital project tracking with real-time funding progress",
      "Structured dispute resolution system with messaging threads",
      "Real-time notifications for invoices, payments, and updates",
      "Enterprise security with Row-Level Security (RLS) and role-based access"
    ],
    role: [
      "Full-stack development",
      "Database architecture and RLS implementation",
      "UI/UX design and implementation"
    ],
    outcome: "70% reduction in administrative overhead, 95% payment transparency, 3x faster billing cycles",
    demoUrl: "https://vhm-estatemgt.netlify.app",
    images: [
      "/projects/village-headmaster/dashboard.png",
      "/projects/village-headmaster/home1.png",
      "/projects/village-headmaster/home2.png",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "Lucide Icons"],
  },
  {
    title: "MajeekHub - Music Career Management Platform",
    type: "SaaS Product",
    summary:
      "An all-in-one career management system for music artists and talent managers. Helps organize careers, plan music releases, manage promotions, create professional Electronic Press Kits (EPKs), and generate smart music links with click tracking.",
    features: [
      "Release management for singles, EPs, and albums with metadata tracking",
      "Smart music links with automatic platform routing and click analytics",
      "Professional Electronic Press Kit (EPK) builder",
      "Artist profile management with social media integration",
      "Career management tools (notes, revenue tracking, tasks)",
      "Subscription & billing with Stripe and Paystack integration",
      "Monorepo architecture ready for mobile app expansion",
      "Cross-platform business logic for React Native compatibility"
    ],
    role: [
      "Full-stack development with TypeScript",
      "Monorepo architecture setup",
      "Payment integration (Stripe + Paystack)",
      "UI/UX design and implementation"
    ],
    outcome: "Production-ready SaaS platform serving music artists and talent managers with dual payment gateway support",
    demoUrl: "https://majeekhub.netlify.app",
    images: [
      "/projects/majeekhub/dashboard.png",
      "/projects/majeekhub/home1.png",
      "/projects/majeekhub/home2.png",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Stripe", "Paystack"],
  },
  {
    title: "Unitrade - Crypto Exchange Platform",
    type: "Functional MVP",
    summary:
      "A professional crypto exchange platform with Bybit-style UX. Features real-time trading simulation, KYC verification, wallet management, and admin controls. Built with a clean dark UI using orange and blue accents for a fintech-grade experience.",
    features: [
      "User authentication with email/password and session management",
      "KYC system with document upload, verification workflow, and admin review",
      "Real-time dashboard with portfolio overview and P&L tracking",
      "Simulated wallet interface with deposit/withdraw functionality",
      "Dynamic coin listing module managed by admins",
      "Buy/sell order execution with transaction history",
      "Live market data with price charts and indicators",
      "Comprehensive admin panel for user, KYC, and coin management"
    ],
    role: [
      "Full-stack development",
      "Trading interface implementation",
      "Real-time data integration",
      "Admin system architecture"
    ],
    outcome: "Fully functional MVP with simulated trading, deployable and ready for user testing",
    demoUrl: "https://unitradeupdated.netlify.app/",
    images: [
      "/projects/unitrade/dashboard1.png",
      "/projects/unitrade/home1.png",
      "/projects/unitrade/dashboard2.png",
      "/projects/unitrade/dashboard3.png",
      "/projects/unitrade/dashboard4.png",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "Node.js"],
    note: "Simulated trading environment - no real blockchain execution or live funds involved yet."
  },
  {
    title: "E-commerce Platform",
    type: "Collaborative project",
    summary:
      "Production-ready e-commerce experience with admin tooling and order workflows.",
    features: ["Product management", "Order processing", "Admin dashboard"],
    role: ["Frontend development", "Feature integration"],
    outcome: "Production-ready platform",
    images: [],
    tech: ["React"],
  },
  {
    title: "Majeek Media Portfolio Website",
    type: "Internal project",
    summary:
      "A fast, SEO-friendly portfolio site built to convert visitors into leads and showcase real project experience.",
    features: ["Responsive UI", "Contact form with EmailJS", "Modern design system", "SEO optimized"],
    tech: ["React", "Vite", "Tailwind CSS", "EmailJS"],
    demoUrl: "https://majeekmedia.com",
    images: [],
  }
];