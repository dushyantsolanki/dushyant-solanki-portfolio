export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Brand {
  name: string;
}

export interface Project {
  category: string;
  title: string;
  image: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { label: "HOME", href: "#home", active: true },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "TESTIMONIALS", href: "#testimonials" },
  { label: "CONTACT", href: "#contact" },
];

export const stats: Stat[] = [
  { value: "7+", label: "YEARS EXPERIENCE" },
  { value: "150+", label: "PROJECTS COMPLETED" },
  { value: "98%", label: "CLIENT SATISFACTION" },
];

export const brands: Brand[] = [
  { name: "Next.js" },
  { name: "React" },
  { name: "Node.js" },
  { name: "AWS" },
  { name: "Docker" },
  { name: "Vercel" },
  { name: "MongoDB" },
  { name: "TypeScript" },
];

export const projects: Project[] = [
  {
    category: "DIGITAL AGENCY",
    title: "NEXORA AGENCY",
    image: "/images/project-nexora.jpg",
  },
  {
    category: "BRANDING STUDIO",
    title: "STUDIO NORTH",
    image: "/images/project-studio-north.jpg",
  },
  {
    category: "SAAS PLATFORM",
    title: "INNOVATE AI",
    image: "/images/project-innovate-ai.jpg",
  },
];

export const services: Service[] = [
  {
    icon: "monitor",
    title: "WEB DESIGN",
    description:
      "Custom website design that's visually stunning, user-friendly, and built to convert.",
  },
  {
    icon: "code",
    title: "WEB DEVELOPMENT",
    description:
      "Clean, responsive, and high-performing websites built with the latest technologies.",
  },
  {
    icon: "smartphone",
    title: "UI/UX DESIGN",
    description:
      "Intuitive user experiences that engage users and drive meaningful interactions.",
  },
  {
    icon: "pen",
    title: "BRANDING",
    description:
      "Strong visual identities that communicate your brand's value and ethos.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "I learn about your goals, audience, and vision to create the right strategy.",
  },
  {
    number: "02",
    title: "PLAN",
    description:
      "I structure the sitemap, wireframes, and layout to build a solid foundation.",
  },
  {
    number: "03",
    title: "DESIGN",
    description:
      "I craft clean, modern designs that reflect your brand and engage users.",
  },
  {
    number: "04",
    title: "DEVELOP",
    description:
      "I bring the design to life with clean code and smooth functionality.",
  },
  {
    number: "05",
    title: "LAUNCH",
    description:
      "I test, optimize, and launch your website for maximum impact.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      '"Owen is a phenomenal designer! He took our ideas and turned them into a beautiful, high-converting website. The process was smooth and professional from start to finish."',
    name: "Jason Miller",
    role: "CEO, Nexora",
    avatar: "/images/avatar-jason.jpg",
  },
  {
    quote:
      '"Working with Owen was a fantastic experience. His attention to detail, creativity, and expertise truly set him apart. Our new site has never performed better."',
    name: "Sarah Thompson",
    role: "Marketing Director, Studio North",
    avatar: "/images/avatar-sarah.jpg",
  },
  {
    quote:
      '"Owen delivered beyond our expectations. The website is modern, fast, and perfectly represents our brand. Highly recommended!"',
    name: "Daniel Roberts",
    role: "Founder, Innovate AI",
    avatar: "/images/avatar-daniel.jpg",
  },
  {
    quote:
      '"The redesign completely transformed our online presence. Owen understood our vision from day one and executed it flawlessly. Traffic increased by 40% within the first month."',
    name: "Emily Chen",
    role: "COO, Vertex Labs",
    avatar: "/images/avatar-sarah.jpg",
  },
  {
    quote:
      '"Owen has an incredible eye for design. He created a website that not only looks stunning but also drives real business results. A true professional."',
    name: "Marcus Williams",
    role: "Director, Craft & Co",
    avatar: "/images/avatar-jason.jpg",
  },
  {
    quote:
      '"From concept to launch, Owen made the entire process effortless. His ability to translate complex ideas into clean, intuitive designs is unmatched."',
    name: "Lisa Park",
    role: "Founder, Bloom Studio",
    avatar: "/images/avatar-daniel.jpg",
  },
];

export const socialLinks: SocialLink[] = [
  { platform: "linkedin", href: "#", label: "LinkedIn" },
  { platform: "twitter", href: "#", label: "Twitter" },
  { platform: "dribbble", href: "#", label: "Dribbble" },
  { platform: "instagram", href: "#", label: "Instagram" },
];
