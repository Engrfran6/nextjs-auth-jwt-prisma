"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createUser, getUserByEmail } from "../libs/db/user";
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "../libs/definitions";
import { createSession, deleteSession } from "../libs/sessions";

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // TODO:
  // 4. Create user session
  await createSession(user.id);

  // 5. Redirect user
  redirect("/profile");
}

export async function login(state: FormState, formData: FormData) {
  // 1. Validate form fields using Zod
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // 2. If validation fails, return error messages
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // 3. Find user by email
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      errors: { email: ["No user found with this email."] },
    };
  }

  // 4. Compare password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      errors: { password: ["Incorrect password."] },
    };
  }

  // 5. Create session
  await createSession(user.id);

  // 6. Redirect on success
  redirect("/profile");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
