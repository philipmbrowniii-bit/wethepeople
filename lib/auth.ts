import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export async function getCurrentProfile() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  return data;
}

export async function requireWriter() {
  const profile = await getCurrentProfile();

  if (!profile || !["admin", "writer"].includes(profile.role)) {
    redirect("/auth/login");
  }

  return profile;
}

export async function requireAdmin() {
  const profile = await getCurrentProfile();

  if (!profile || profile.role !== "admin") {
    redirect("/admin");
  }

  return profile;
}
