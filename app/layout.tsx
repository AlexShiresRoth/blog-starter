import "./globals.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-abeezee",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "SATACTSENSE",
  description: "Tutoring for the SAT and ACT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={`${rubik.className}`}>
        <body className="bg-gray-50">{children}</body>
      </html>
    </>
  );
}
