"use client";

import { useEffect, useState } from "react";
import { userService } from "@/apis/services/user-service";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import PostListing from "@/components/customs/posts/post-listing";
import { loadingStore } from "@/stores/loading";
import { useRouter } from "next/navigation";
import { postService } from "@/apis/services/post-service";


export default function Home() {
  const [profile, setProfile]: any = useState(null);
  const [posts, setPosts] = useState([]);

  const { setIsLoading } = loadingStore();
  const router = useRouter();

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const res = await postService.getPosts();
      setPosts(res.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const loadProfile = async () => {
    try {
      const res = await userService.getProfile();

      setProfile(res?.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-muted/30">
      {/* HEADER */}
      <header className="border-b bg-white px-6 py-4">
        <section className="mx-auto flex max-w-7xl items-center justify-between">
          {/* LOGO */}
          <div>
            <h1 className="text-xl font-bold">
              MPWT
            </h1>
          </div>

          {/* PROFILE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none">
                <Avatar className="h-11 w-11 cursor-pointer border-2 border-primary">
                  <AvatarImage
                    src={profile?.profile_pic_url || ""}
                    alt={profile?.name || "User"}
                  />

                  <AvatarFallback>
                    {profile?.username?.charAt(0).toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-72 rounded-2xl p-4"
            >
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={profile?.profile_pic_url || ""}
                  />

                  <AvatarFallback className="text-lg">
                    {profile?.username
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h2 className="text-lg font-semibold">
                    {profile?.username || "Unknown User"}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>

                <Button onClick={ () => router.push("/user/edit-profile")} className="w-full">
                  Edit Profile
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </header>

      <PostListing posts={posts} />
    </main>
  );
}