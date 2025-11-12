import Image from "next/image";
import prisma from "../lib/prisma";
import Link from "next/link";
import { createPost, deletePost } from "./actions/action";


export default async function Home() {
  const posts = await prisma.post.findMany({
      include: {
        author: true,
        likes: true // <-- ceci permet d'inclure les infos de l'auteur
      },
  });

  const userId = 1;

  return (
    <main className="flex flex-col w-full h-full items-center justify-center">
    <div className="flex flex-col items-center justify-center w-[90%] rounded-sm h-full px-6 py-5 bg-green-300 mt-5">
      <h1 className="text-black">Binevenur sur ce Blog !</h1>
    </div>

    <div className="flex flex-col gap-5 w-[80%] h-full items-center justify-center px-6 py-5 bg-white">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col w-full h-full border border-gray-500 rounded-md">
              <div className="flex flex-col w-full h-full items-center justify-center p-2 rounded-md">
                
                <div className="flex flex-col w-full h-auto bg-gray-200 px-6 py-3 mb-3">
                  <h2 className="text-gray-600 text-lg">{post.title}</h2>
                  <p className="text-gray-800">{post.author ? post.author.firstName + " " + post.author.lastName : "Unknown Author"}</p>
                </div>
                <div className="flex flex-col w-full p-2  h-auto">
                  <p className="text-black text-sm">{post.content}</p>
                </div>
                <div className="flex flex-row w-full items-center justify-around h-auto bg-gray-200 px-6 py-3 mt-3">
                <p className="flex flex-col text-gray-600 text-sm">
                  Likes: {post.likes.length}
                </p>

                <Link href={`/post/${post.id}`}>
                      <h2 className="text-blue-600">En savoir plus ...</h2>
                </Link>

                  <form action={deletePost}>
                    <input type="hidden" name="post_id" value={post.id} />
                    <button type="submit" className="text-red-500 text-sm">
                      Delete
                    </button>
                  </form>

                </div>
              </div>


        </div>
      ))}
    </div>

      <div className="flex flex-col items-center justify-center px-6 py-5 bg-white gap-5 rounded-xl mt-5 mb-10">
        <h2 className="text-black text-xl flex flex-col ">Crée un nouveau post</h2>

        <form action={createPost} className="flex flex-col s gap-2">
          <input className="border border-gray-500 text-black px-2 py-1 rounded-sm hidden" type="number" name="userId" defaultValue={userId} />
          <label htmlFor="postTitle" className="text-black">Titre :</label>
          <input className="border border-gray-500 text-black px-2 py-1 rounded-sm" type="text" name="postTitle"  />
          <label htmlFor="postContent" className="text-black">Contenu :</label>
          <textarea className="border border-gray-500 text-black px-2 py-1 rounded-sm" name="postContent" id="" />
          <button type="submit" className="flex items-center justify-center text-black bg-gray-200 w-full h-full p-3 rounded-xl hover:bg-gray-300">Submit</button>
        </form>
      </div>

    </main>

  );
}
