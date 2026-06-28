import type { Metadata } from "next";
import { Cinzel, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Griha Pravesh & Vastu Puja Invitation",
  description: "Join us in celebrating the auspicious inauguration of our new home. Griha Pratishtha and Vastu Puja ceremony details, schedule, RSVP and directions.",
  openGraph: {
    title: "Griha Pravesh & Vastu Puja Invitation",
    description: "Join us in celebrating the auspicious inauguration of our new home.",
    type: "website",
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
      className={`${cinzel.variable} ${greatVibes.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
