import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { addComment } from '@/app/actions';

export default async function PostShow({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const [{ data: post }, { data: comments }] = await Promise.all([
    supabaseAdmin.from('posts').select('*').eq('id', id).single(),
    supabaseAdmin.from('comments').select('id, author, body, created_at').eq('post_id', id).order('created_at', { ascending: false })
  ]);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <Link href={`/posts/${id}/edit`} className="ml-auto text-sm underline">Edit</Link>
        </div>
        <p className="mt-3 whitespace-pre-wrap leading-relaxed">{post.content}</p>
        <p className="mt-2 text-xs text-gray-500">Posted {new Date(post.created_at).toLocaleString()}</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-medium">Add a comment</h2>
          <form action={async (fd) => { 'use server'; await addComment(id, fd); }} className="space-y-3">
            <input name="author" placeholder="Your name (optional)" className="w-full rounded border px-3 py-2" />
            <textarea name="body" rows={4} placeholder="Write something..." className="w-full rounded border px-3 py-2" required />
            <button type="submit" className="rounded bg-black px-4 py-2 text-white">Post Comment</button>
          </form>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-medium">Comments</h2>
          <ul className="space-y-3">
            {comments?.map((c) => (
              <li key={c.id} className="rounded border p-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{c.author || 'Anonymous'}</span>
                  <span className="ml-auto text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}