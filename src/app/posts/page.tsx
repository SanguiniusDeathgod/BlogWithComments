import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { deletePost } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function PostsPage({ searchParams }: { searchParams: { sort?: 'asc' | 'desc' } }) {
  const sort = searchParams?.sort === 'asc' ? 'asc' : 'desc';

  const { data: posts, error } = await supabaseAdmin
    .from('posts')
    .select('id, title, created_at')
    .order('created_at', { ascending: sort === 'asc' });

  if (error) return <div>Error loading posts</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <div className="flex gap-2">
          <Link href={`/posts?sort=${sort === 'asc' ? 'desc' : 'asc'}`} className="rounded border px-3 py-1 text-sm">
            Sort: {sort.toUpperCase()}
          </Link>
          <Link href="/posts/new" className="rounded bg-black px-3 py-1 text-sm text-white">New</Link>
        </div>
      </div>

      <ul className="space-y-3">
        {posts?.map((p) => (
          <li key={p.id} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Link href={`/posts/${p.id}`} className="font-medium hover:underline">{p.title}</Link>
              <span className="ml-auto text-xs text-gray-500">{new Date(p.created_at).toLocaleString()}</span>
            </div>
            <form action={async () => { 'use server'; await deletePost(p.id); }} className="mt-3">
              <button type="submit" className="rounded border px-3 py-1 text-sm hover:bg-gray-50">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}