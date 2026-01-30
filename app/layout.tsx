import "./globals.css"; // 
import QueryProvider from "./providers/QueryProvider";

export const metadata = {
  title: "Azalea Subdivision",
  description: "Azalea Subdivision Web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased"> {/* Added antialiased for cleaner text */}
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}