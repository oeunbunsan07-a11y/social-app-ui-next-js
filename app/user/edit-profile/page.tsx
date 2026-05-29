"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { userService } from "@/apis/services/user-service";

interface Profile {
  username: string;
  bio: string;
  profile_pic_url: string;
  cover_pic_url: string;
}

export default function EditProfileForm() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profile_pic_url: "",
    cover_pic_url: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await userService.getProfile();

      const user = res?.user;

      setProfile(user);

      // Populate form after data loads
      setFormData({
        username: user?.username || "",
        bio: user?.bio || "",
        profile_pic_url:
          user?.profile_pic_url || "",
        cover_pic_url:
          user?.cover_pic_url || "",
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { username, bio, profile_pic_url, cover_pic_url } = formData;

    const payload = {  username, bio, profile_pic_url, cover_pic_url };

    try {
      setLoading(true);

      const res = await userService.updateProfile(payload);

      alert("Profile updated!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-2xl rounded-3xl">
      {/* Cover Preview */}
      <div className="relative h-56 w-full bg-muted">
        {formData.cover_pic_url ? (
          <img
            src={formData.cover_pic_url}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-violet-500 to-indigo-500" />
        )}

        {/* Profile Preview */}
        <div className="absolute -bottom-14 left-6">
          {formData.profile_pic_url ? (
            <img
              src={formData.profile_pic_url}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-background object-cover shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-background bg-muted shadow-lg" />
          )}
        </div>
      </div>

      <CardContent className="pt-20 pb-8 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Profile
          </h1>

          <p className="text-muted-foreground mt-2">
            Update your personal information and
            profile appearance.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">
              Username
            </Label>

            <Input
              id="username"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              className="h-12 rounded-xl"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>

            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell something about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="min-h-[120px] rounded-xl resize-none"
            />
          </div>

          {/* Profile Picture */}
          <div className="space-y-2">
            <Label htmlFor="profile_pic_url">
              Profile Picture URL
            </Label>

            <Input
              id="profile_pic_url"
              name="profile_pic_url"
              placeholder="https://example.com/profile.jpg"
              value={formData.profile_pic_url}
              onChange={handleChange}
              className="h-12 rounded-xl"
            />
          </div>

          {/* Cover Picture */}
          <div className="space-y-2">
            <Label htmlFor="cover_pic_url">
              Cover Picture URL
            </Label>

            <Input
              id="cover_pic_url"
              name="cover_pic_url"
              placeholder="https://example.com/cover.jpg"
              value={formData.cover_pic_url}
              onChange={handleChange}
              className="h-12 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl text-base font-semibold"
          >
            {loading
              ? "Saving Changes..."
              : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}