'use client';

import { useCallback, useState, useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle, LogOutIcon, SaveIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function AccountForm({ user }: { user: User | null }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [fullName, setFullName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const supabase = createClient();

  const getProfile = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullName(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch {
      alert('Error while loading user data');
    } finally {
      setIsLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatarUrl,
    fullName,
    website,
  }: {
    username: string | null;
    avatarUrl: string | null;
    fullName: string | null;
    website: string | null;
  }) {
    try {
      setIsLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullName,
        username,
        avatar_url: avatarUrl,
        website,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success('Profile updated.');
    } catch {
      toast.error('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='mx-auto w-[400px] h-screen flex flex-col justify-center'>
      <Avatar
        uid={user?.id ?? null}
        url={avatarUrl}
        size={400}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullName, username, website, avatarUrl: url });
        }}
      />
      <div className='grid grid-cols-[70px_1fr] items-center gap-x-6 mt-6'>
        <Label htmlFor='email' className='text-xs'>
          Email
        </Label>
        <Input
          id='email'
          type='text'
          value={user?.email}
          disabled
          className='disabled:cursor-not-allowed'
        />
      </div>
      <div className='grid grid-cols-[70px_1fr] items-center gap-x-6 mt-4'>
        <Label htmlFor='fullName' className='text-xs shrink-0'>
          Full Name
        </Label>
        <Input
          id='fullName'
          type='text'
          value={fullName || ''}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-[70px_1fr] items-center gap-x-6 mt-4'>
        <Label htmlFor='username' className='text-xs shrink-0'>
          Username
        </Label>
        <Input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-[70px_1fr] items-center gap-x-6 mt-4'>
        <Label htmlFor='website' className='text-xs shrink-0'>
          Website
        </Label>
        <Input
          id='website'
          type='url'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className='mt-4'>
        <Button
          onClick={() =>
            updateProfile({ fullName, username, website, avatarUrl })
          }
          disabled={isLoading}
          className='w-full'
        >
          {isLoading ? (
            <LoaderCircle className='w-3 h-3 animate-spin' />
          ) : (
            <SaveIcon className='w-3 h-3' />
          )}
          {isLoading ? 'Loading...' : 'Save changes'}
        </Button>
      </div>
      <div>
        <form action='/auth/signout' method='post'>
          <Button variant={'ghost'} className='w-full mt-6' type='submit'>
            <LogOutIcon className='w-3 h-3' />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
