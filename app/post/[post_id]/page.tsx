import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({ params }: { params: Promise<{ post_id: string }> }) {
  const resolvedParams = await params;
  const postId = Number(resolvedParams.post_id);

  if (isNaN(postId)) {
    console.log('Nannnn')
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      likes: true,
    },
  });

  if (!post) notFound();

  return (
    <div className="p-6">
        <div><Link className="text-red-500" href="/"> - Retour à la page d'accueil</Link></div>

      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        Auteur : {post.author?.firstName || "Inconnu"}
      </p>
      <p className="text-gray-800">{post.content}</p>
    </div>
  );
}
