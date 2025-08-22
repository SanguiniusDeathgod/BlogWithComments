import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-gray-600">A simple blog built with Next.js, Tailwind, and Supabase.</p>
      <div className="flex gap-2">
        <Link href="/posts" className="rounded-xl bg-black px-3 py-2 text-white">View Posts</Link>
        <Link href="/posts/new" className="rounded-xl border px-3 py-2">Create Post</Link>
      </div>
    </div>
  );
}