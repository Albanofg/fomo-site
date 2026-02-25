import { Chakra_Petch, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "FOMO Protocol — Decentralized Clearing",
  description:
    "A dual-chain architecture that nets bilateral obligations at scale. No asset custody. No oracles. Pure deterministic clearing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${chakraPetch.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
