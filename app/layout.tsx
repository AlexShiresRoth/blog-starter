import "./globals.css";

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
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
