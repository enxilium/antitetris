import "./styles.css";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({ subsets: ['latin'] });

export const metadata = {
  title: "ANTITHESIS",
  description: "A submission for NewHacks 2024.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={oxanium.className}
      >
        {children}
      </body>
    </html>
  );
}
