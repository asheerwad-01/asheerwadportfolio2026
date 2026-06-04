// ═══════════════════════════════════════════
// Constants & Data — Asheerwad Meher Portfolio
// ═══════════════════════════════════════════

export const SITE = {
  name: "Kaizen Edit",
  initials: "KE",
  title: "UI/UX & Graphics Designer",
  tagline: "I design visuals that connect brands with people and leave a lasting impact.",
  year: 2026,
  email: "asheerwad.sonepur@gmail.com",
  phone: "+91 87633 40197",
  location: "Sonepur, Odisha, India",
  timezone: "IST (UTC +5:30)",
  available: "Available for Freelance",
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Lab", href: "/lab" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/_asheerwad_/", icon: "instagram" },
  { label: "Behance", href: "https://www.behance.net/asheerwadmeher", icon: "behance" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/asheerwad-meher/", icon: "linkedin" },
  { label: "Discord", href: "https://discord.gg/J5UgaJ9MTu", icon: "discord" },
  { label: "YouTube", href: "https://www.youtube.com/@kaizen.edit_1", icon: "youtube" },
] as const;

export const WORK_ITEMS = [
  {
    id: "01",
    slug: "ui-ux",
    category: "UI/UX DESIGN",
    subcategories: ["User Interfaces", "Digital Experiences"],
    description: "Designing intuitive and engaging interfaces that deliver seamless user experiences.",
    image: "/images/projects/uiux.jpg",
  },
  {
    id: "02",
    slug: "graphics",
    category: "GRAPHICS DESIGN",
    subcategories: ["Brand Identity", "Visual Design"],
    description: "Crafting impactful visuals that communicate your brand's message with clarity and style.",
    image: "/images/projects/graphics.jpg",
  },
  {
    id: "03",
    slug: "web-dev",
    category: "FULL STACK WEB-D",
    subcategories: ["Frontend", "Backend", "Databases"],
    description: "Building robust, scalable web applications from concept to deployment.",
    image: "/images/projects/webdev.jpg",
  },
  {
    id: "04",
    slug: "motion",
    category: "MOTION GRAPHICS/AMV",
    subcategories: ["Animations", "Video Editing"],
    description: "Bringing ideas to life through motion and animation that captivate and engage.",
    image: "/images/projects/motion.jpg",
  },
] as const;

export const STATS = [
  { value: "2+", label: "Years of\nExperience", icon: "trophy" },
  { value: "50+", label: "Projects\nCompleted", icon: "folder" },
  { value: "30+", label: "Happy\nClients", icon: "heart" },
  { value: "∞", label: "Hours of\nPassion", icon: "gamepad" },
] as const;

export const SKILLS = [
  { name: "UI/UX Design", level: 90 },
  { name: "Graphic Design", level: 85 },
  { name: "Motion Graphics", level: 80 },
  { name: "Video Editing", level: 75 },
  { name: "Branding", level: 85 },
] as const;

export const TOOLS = [
  { name: "Figma", short: "Fg", color: "#A259FF" },
  { name: "Photoshop", short: "Ps", color: "#31A8FF" },
  { name: "Illustrator", short: "Ai", color: "#FF9A00" },
  { name: "After Effects", short: "Ae", color: "#9999FF" },
  { name: "Premiere Pro", short: "Pr", color: "#9999FF" },
  { name: "Adobe XD", short: "Xd", color: "#FF61F6" },
] as const;

export const SERVICES = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Designing intuitive and engaging interfaces that deliver seamless user experiences.",
    items: ["User Research", "Wireframing & Prototyping", "Interaction Design", "Usability Testing"],
  },
  {
    id: "02",
    title: "Graphic Design",
    description: "Crafting impactful visuals that communicate your brand's message with clarity and style.",
    items: ["Brand Identity", "YouTube Thumbnails", "Social Media Graphics", "Marketing Materials"],
  },
  {
    id: "03",
    title: "Motion Graphics / AMV",
    description: "Bringing ideas to life through motion, anime editing, and animations that captivate and engage.",
    items: ["Anime Music Videos (AMVs)", "Beat Synchronization", "VFX & Compositing", "Kinetic Typography"],
  },
  {
    id: "04",
    title: "Full Stack Web Development",
    description: "Building robust, scalable web applications with modern frameworks and technologies.",
    items: ["Frontend Development", "Backend Development", "Database Design", "API Integration"],
  },
] as const;

export const LAB_EXPERIMENTS = [
  {
    id: "01",
    category: "UI/UX",
    title: "Chapter Genesis Concept",
    description: "A gamified reading platform concept with streaks, challenges, and dark styling.",
    tools: ["Figma", "React", "Tailwind CSS"],
    image: "/Chapter Genesis Dark Theme.jpg",
    href: "/work/ui-ux",
  },
  {
    id: "02",
    category: "Motion",
    title: "Anime Music Video (AMV)",
    description: "A high-octane visual sequence beat-synced with custom visual effects.",
    tools: ["After Effects", "Premiere Pro", "VFX"],
    image: "/Marvel Rivals Wolverine.png",
    href: "/gallery/motion-amv",
  },
  {
    id: "03",
    category: "Web",
    title: "DM Enterprises E-Commerce",
    description: "A full-stack, responsive e-commerce platform for rubber stamps and corporate items.",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/DM Home.png",
    href: "/gallery/dm-enterprises",
  },
  {
    id: "04",
    category: "Graphic",
    title: "YouTube Thumbnail Design",
    description: "High CTR promotional thumbnails designed with custom 3D lighting and text styling.",
    tools: ["Photoshop", "Lightroom"],
    image: "/Kaizen Brand Identity.png",
    href: "/gallery/youtube-thumbnails",
  },
  {
    id: "05",
    category: "Code",
    title: "Aether UI Concept",
    description: "A futuristic web layout incorporating bold typography and smooth custom scroll animations.",
    tools: ["Figma", "GSAP", "React"],
    image: "/Home page.png",
    href: "/work/ui-ux",
  },
] as const;
