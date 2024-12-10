import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Personal Notes App",
  description: "Using NextJS and NestJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-mono">
         <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-start ">
      <header className="w-full p-4 bg-gray-900 text-white text-center drop-shadow">
        <h1 className="text-xl lg:text-2xl  uppercase lg:font-bold">Personal Notes App</h1>
      </header>
      <main className="w-full max-w-3xl p-8">{children}</main>
    </div>
      </body>
    </html>
  );
}
