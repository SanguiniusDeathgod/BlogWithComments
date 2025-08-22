import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updatePost } from "@/app/actions";

export default async function EditPost({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const { data: post } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (!post) return <div>Not found</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Edit Post</h1>
      <form
        action={async (fd) => {
          "use server";
          await updatePost(id, fd);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            defaultValue={post.title}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            name="content"
            rows={8}
            defaultValue={post.content}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Save
        </button>
      </form>
    </div>
  );
}
