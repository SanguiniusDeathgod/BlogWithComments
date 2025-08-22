import { createPost } from '@/app/actions';

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">New Post</h1>
      <form action={createPost} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea name="content" rows={6} className="mt-1 w-full rounded border px-3 py-2" required />
        </div>
        {/* Optional: categories, leave empty for now */}
        <input type="hidden" name="category_id" value="" />
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">Create</button>
      </form>
    </div>
  );
}