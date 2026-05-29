"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Post = {
    id: number;
    content: string;
    media_url: string;
    created_at: string;
    author_id: number;
    author_username: string;
    author_profile_pic: string;
};

interface Props {
    post: Post;
}

export default function PostCard({
    post,
    ...other
}: Props) {
    return (
        <Card className="overflow-hidden rounded-2xl border shadow-sm" {...other}>
            {/* HEADER */}
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <Avatar className="h-11 w-11">
                    <AvatarImage
                        src={post?.author_profile_pic ?? "jdd"}
                    />

                    <AvatarFallback>
                        {post?.author_username
                            ? post.author_username.charAt(0).toUpperCase()
                            : "Default"}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <h2 className="font-semibold">
                        { post?.author_username ? post?.author_username : "Default" }
                    </h2>

                    <p className="text-xs text-muted-foreground">
                        {new Date(
                            post?.created_at
                        ).toLocaleString()}
                    </p>
                </div>
            </CardHeader>

            {/* CONTENT */}
            <CardContent className="space-y-4">
                <p className="text-[15px] leading-relaxed">
                    {post?.content}
                </p>

                {/* IMAGE */}
                {post?.media_url && (
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
                            alt="Post"
                            className="h-[350px] w-full object-cover"
                        />
                    </div>
                )}
            </CardContent>

            {/* ACTIONS */}
            <CardFooter className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                >
                    <Heart className="h-4 w-4" />
                    Like
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                >
                    <MessageCircle className="h-4 w-4" />
                    Comment
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                >
                    <Share2 className="h-4 w-4" />
                    Share
                </Button>
            </CardFooter>
        </Card>
    );
}