import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Blog', description: 'Next + Supabase' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-4xl px-4 py-3 flex gap-4 items-center">
            <Link href="/" className="font-bold">Blog</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/posts/new" className="ml-auto rounded border px-3 py-1 text-sm">New Post</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}