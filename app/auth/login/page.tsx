import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-5xl font-bold">Admin login</h1>
      <p className="mt-3 text-muted">Approved writers and admins can manage We The People here.</p>
      <LoginForm />
    </main>
  );
}
