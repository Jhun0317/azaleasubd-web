import "./globals.css"; 
// Add this line back! Make sure the path matches where your provider file is
import QueryProvider from "./providers/QueryProvider"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          {children} 
        </QueryProvider>
      </body>
    </html>
  );
}
