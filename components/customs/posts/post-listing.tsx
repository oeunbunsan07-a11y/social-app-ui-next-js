"use client";
import PostCard from "@/components/customs/posts/post-card";
import { useRouter } from "next/navigation";

export default function PostListing({ posts } : any) {
    const router = useRouter();
    return (
        <section className="mx-auto flex max-w-2xl flex-col gap-6 py-6">
            {posts.map((post : any) => (
                <PostCard
                    key={post.id}
                    post={post}
                    // @ts-ignore
                    onClick={() => router.push(`/user/${post.author_id}`)}
                />
            ))}
        </section>
    );
}