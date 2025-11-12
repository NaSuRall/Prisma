'use server';
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
    console.log(formData);
    await prisma.post.create({
        data: {
            title: formData.get('postTitle') as string,
            content: formData.get('postContent') as string,
            authorId: Number(formData.get('userId')),
        },
    });
    revalidatePath('/');
}
 
export async function deletePost(formData: FormData) {
  const postId = Number(formData.get('post_id'));
  if (!postId) return;

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath('/');
}