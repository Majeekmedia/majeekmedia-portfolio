export const projects = [
  {
    title: "E-commerce Platform",
    type: "Collaborative project",
    summary:
      "Production-ready e-commerce experience with admin tooling and order workflows.",
    features: ["Product management", "Order processing", "Admin dashboard"],
    role: ["Frontend development", "Feature integration"],
    outcome: "Production-ready platform",
    demoUrl: "https://your-ecommerce-demo.netlify.app", // add when ready
    images: [
      "/projects/ecommerce/ecommerce1.jpg",
      "/projects/ecommerce/ecommerce2.jpg",
      // add more if you have them
    ],
    tech: ["React"], // optional (add if you want)
  },
  {
    title: "Crypto Trading Platform",
    type: "Client project (in progress)",
    summary:
      "Dashboard-driven trading interface with secure authentication and real-time data handling.",
    features: ["User dashboards", "Secure authentication", "Real-time data handling"],
    tech: ["React", "Supabase"],
    note: "No sensitive data or links required.",
    // demoUrl intentionally omitted
    images: [
      "/projects/crypto/crypto1.jpg",
      // "/projects/crypto/crypto2.jpg",
    ],
  },

  // Optional: add your own portfolio site as a project (see section 5)
  {
  title: "Majeek Media Portfolio Website",
  type: "Internal project",
  summary:
    "A fast, SEO-friendly portfolio site built to convert visitors into leads and showcase real project experience.",
  features: ["Responsive UI", "Contact form with EmailJS", "Modern design system", "SEO optimized"],
  tech: ["React", "Vite", "Tailwind CSS", "EmailJS"],
  demoUrl: "https://majeekmedia.com",
  images: [
    "/projects/majeek/majeek1.jpg",
  ],
}
];