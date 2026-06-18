"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "@/lib/actions";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="w-full border border-ink bg-ink px-4 py-3 text-sm font-bold uppercase text-white disabled:opacity-50">
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useFormState(signIn, { ok: false, message: "" });

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide">
          Email
        </label>
        <input id="email" name="email" type="email" required className="mt-2 w-full border border-rule bg-white px-3 py-2" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-bold uppercase tracking-wide">
          Password
        </label>
        <input id="password" name="password" type="password" required className="mt-2 w-full border border-rule bg-white px-3 py-2" />
      </div>
      <LoginButton />
      {state.message ? <p className="text-sm text-red-800">{state.message}</p> : null}
    </form>
  );
}
