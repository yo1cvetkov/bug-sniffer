'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LockIcon, MailIcon } from 'lucide-react';
import { login, signup } from './actions';
import { useActionState, useState } from 'react';

export default function LoginForm() {
  const [loginState, loginAction, isLoginPending] = useActionState(login, null);
  const [signupState, signupAction, isSignupPending] = useActionState(
    signup,
    null
  );

  const [showPassword, setShowPassword] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <form className='w-[350px] mx-auto flex gap-y-4 flex-col h-screen justify-center'>
      <div className='space-y-1'>
        <Label htmlFor='email' className='text-xs'>
          Email
        </Label>
        <div className='relative'>
          <MailIcon className='absolute left-3 top-3 h-3 w-3 text-muted-foreground' />
          <Input
            id='email'
            className='pl-8'
            name='email'
            type='email'
            required
          />
        </div>
      </div>
      <div className='space-y-1'>
        <Label className='text-xs' htmlFor='password'>
          Password
        </Label>
        <div className='relative'>
          <LockIcon className='absolute left-3 top-3 h-3 w-3 text-muted-foreground' />
          <Input
            id='password'
            name='password'
            className='pl-8 pr-8'
            placeholder='••••••••'
            type={showPassword ? 'text' : 'password'}
            required
          />
          <Button
            size={'icon'}
            type='button'
            onClick={togglePasswordVisibility}
            variant={'ghost'}
            className='absolute right-0 top-0 h-9 w-9 hover:bg-transparent text-muted-foreground'
          >
            {showPassword ? (
              <Eye className='h-3 w-3 text-muted-foreground' />
            ) : (
              <EyeOff className='h-3 w-3 text-muted-foreground' />
            )}
          </Button>
        </div>
      </div>
      {loginState?.error ? (
        <span className='text-xs text-red-500 text-center'>
          {loginState.error}
        </span>
      ) : null}
      <Button
        variant={'default'}
        disabled={isLoginPending || isSignupPending}
        formAction={loginAction}
      >
        {isLoginPending ? 'Logging in...' : 'Log in'}
      </Button>
      <span className='text-xs text-muted-foreground text-center'>or</span>
      <Button
        disabled={isSignupPending || isLoginPending}
        variant={'outline'}
        formAction={signupAction}
      >
        Sign up
      </Button>
      {signupState?.error ? (
        <span className='text-xs text-red-500 text-center'>
          {signupState.error}
        </span>
      ) : null}
      {signupState?.message ? (
        <span className='text-xs text-green-500 text-center'>
          {signupState.message}
        </span>
      ) : null}
    </form>
  );
}
