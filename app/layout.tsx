import "./globals.css";

export const metadata = {
  title: "Premium Motion Landing",
  description: "Smooth scrolling, subtle animations, and accessible UX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
