'use client';

import { useCallback, useState, useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';

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

      alert('Profile updated.');
    } catch {
      alert('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='form-widget'>
      {/* ... */}
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          type='text'
          value={fullName || ''}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='url'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <button
          className='button primary block'
          onClick={() =>
            updateProfile({ fullName, username, website, avatarUrl })
          }
          disabled={isLoading}
        >
          {isLoading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <form action='/auth/signout' method='post'>
          <button className='button block' type='submit'>
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
