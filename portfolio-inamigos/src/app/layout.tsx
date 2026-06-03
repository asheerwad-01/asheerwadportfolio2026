import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Inter, Architects_Daughter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-reenie",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaizen Edit — UI/UX & Graphics Designer",
  description:
    "Portfolio of Kaizen Edit — UI/UX Design, Graphic Design, Motion Design & Web Development. Crafting immersive digital experiences.",
  keywords: [
    "UI/UX Designer",
    "Graphic Designer",
    "Motion Designer",
    "Frontend Developer",
    "Portfolio",
    "Kaizen Edit",
    "Sonepur",
    "Odisha",
    "India",
  ],
  authors: [{ name: "Kaizen Edit" }],
  openGraph: {
    title: "Kaizen Edit — UI/UX & Graphics Designer",
    description:
      "Crafting immersive digital experiences. UI/UX Design, Graphics, Motion & Web Development.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceMono.variable} ${inter.variable} ${architectsDaughter.variable}`}
    >
      <body>
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* SVG Filters for scribble effects */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="scribble-filter">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.05"
                numOctaves="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
