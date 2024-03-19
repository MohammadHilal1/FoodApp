import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import MainHeaderBackground from "@/components/main-header/main-header-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meals",
  description: "Favourite meals of the food lovers across the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBackground />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
