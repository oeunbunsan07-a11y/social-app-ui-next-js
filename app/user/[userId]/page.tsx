"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { postService } from "@/apis/services/post-service";
import PostListing from "@/components/customs/posts/post-listing";

type Post = {
  id: number;
  content: string;
  media_url: string;
  created_at: string;
  author_username: string;
  author_profile_pic: string;
};

export default function UserPage() {
  const { userId } = useParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    loadPosts();
  }, [userId]);

  const loadPosts = async () => {
    try {
      setLoading(true);

      const res = await postService.getUserPosts(
        userId as string
      );

      setPosts(res.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-10 border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <h1 className="text-lg font-bold">
            Social App
          </h1>

          <div className="text-sm text-gray-500">
            User: {userId}
          </div>
        </div>
      </header>

      {/* FEED */}
      <section className="mx-auto max-w-2xl px-4 py-6">
        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No posts yet
          </div>
        ) : (
            // @ts-ignore
          <PostListing posts={posts} />
        )}
      </section>
    </main>
  );
}