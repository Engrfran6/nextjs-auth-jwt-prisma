"use client";

import { signup } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form
      action={action}
      className="max-w-md mx-auto mt-40 p-8 bg-white rounded-lg shadow-md space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {state?.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {state?.errors?.password && (
          <div className="mt-1 text-sm text-red-600">
            <p>Password must:</p>
            <ul className="list-disc list-inside ml-4">
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        disabled={pending}
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        Sign Up
      </button>
      <div className="text-center text-sm text-gray-600">
        No account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}
