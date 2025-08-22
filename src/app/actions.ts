'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// ------- POSTS -------
export async function createPost(formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const category_id = formData.get('category_id') ? Number(formData.get('category_id')) : null;
  if (!title || !content) throw new Error('Title and content are required');

  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert({ title, content, category_id })
    .select('id')
    .single();
  if (error) throw error;

  // Redirect to the new post
  redirect(`/posts/${data.id}`);
}

export async function updatePost(id: number, formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const category_id = formData.get('category_id') ? Number(formData.get('category_id')) : null;

  const { error } = await supabaseAdmin
    .from('posts')
    .update({ title, content, category_id })
    .eq('id', id);
  if (error) throw error;

  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

export async function deletePost(id: number) {
  const { error } = await supabaseAdmin.from('posts').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/posts');
}

// ------- COMMENTS -------
export async function addComment(postId: number, formData: FormData) {
  const author = (formData.get('author') as string) || 'Anonymous';
  const body = String(formData.get('body') || '').trim();
  if (!body) throw new Error('Comment cannot be empty');

  const { error } = await supabaseAdmin
    .from('comments')
    .insert({ post_id: postId, author, body });
  if (error) throw error;

  revalidatePath(`/posts/${postId}`);
}

export async function updateComment(postId: number, commentId: number, formData: FormData) {
  const author = (formData.get('author') as string) || 'Anonymous';
  const body = String(formData.get('body') || '').trim();

  const { error } = await supabaseAdmin
    .from('comments')
    .update({ author, body })
    .eq('id', commentId)
    .eq('post_id', postId);
  if (error) throw error;

  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}