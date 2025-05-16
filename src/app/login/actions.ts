'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { loginSchema } from '@/schemas/login-schema';
import { signupSchema } from '@/schemas/signup-schema';

export async function login(
  state: { error: string | null; message: string | null } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { success, error: validationError } = loginSchema.safeParse(data);

  if (!success) {
    const errorsObj = validationError?.flatten().fieldErrors;

    if (errorsObj?.email) {
      return { error: errorsObj.email[0], message: null };
    }

    if (errorsObj?.password) {
      return { error: errorsObj.password[0], message: null };
    }

    return { error: validationError.message, message: null };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.code === 'invalid_credentials') {
      return { error: 'Email or password is incorrect.', message: null };
    }

    return { error: 'Failed to login.', message: null };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(
  state: { error: string | null; message: string | null } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { success, error: validationError } = signupSchema.safeParse(data);

  if (!success) {
    const errorsObj = validationError?.flatten().fieldErrors;

    if (errorsObj?.email) {
      return { error: errorsObj.email[0], message: null };
    }

    if (errorsObj?.password) {
      return { error: errorsObj.password[0], message: null };
    }

    return { error: validationError.message, message: null };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: 'Failed to signup.', message: null };
  }

  revalidatePath('/', 'layout');
  return { error: null, message: 'Check your inbox at ' + data.email };
}
