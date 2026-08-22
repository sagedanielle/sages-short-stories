import './globals.css';
import { Quicksand } from "next/font/google";

const font = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-serif",
});

export const metadata = {
  title: 'Sages Short Stories',
  description: 'A blog built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className={"bg-white text-[#171717] font-serif min-h-screen"}>
        {children}
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 font-serif">
      {/* font-serif instead of font-sans; Tailwind also has font-mono if you like */}
      <header className="py-8 px-6 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight">Snow</h1>
        {/* text-6xl makes it bigger; font-extrabold for more weight */}
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">
        {children}
        {/* text-lg for bigger body text, leading-relaxed for more spacing */}
      </main>
    </div>
  );
}