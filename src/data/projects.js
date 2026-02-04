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
    title: "Crypto Trading Platform",
    type: "Client project (in progress)",
    summary:
      "Dashboard-driven trading interface with secure authentication and real-time data handling.",
    features: ["User dashboards", "Secure authentication", "Real-time data handling"],
    tech: ["React", "Supabase"],
    note: "No sensitive data or links required.",
    images: [],
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