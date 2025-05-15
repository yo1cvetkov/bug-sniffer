'use client';

import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AvatarProps {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}

export default function Avatar({ uid, url, size, onUpload }: AvatarProps) {
  const supabase = createClient();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);

        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);

        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setIsUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch {
      alert('Failed to upload avatar.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <div>
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt='Avatar'
            className='avatar-image'
            style={{ height: size, width: size }}
          />
        </div>
      ) : (
        <div style={{ height: size, width: size }}>No avatar</div>
      )}
      <div style={{ width: size }}>
        <label className='block' htmlFor='single'>
          {isUploading ? 'Uploading...' : 'Upload'}
        </label>
        <input
          style={{ visibility: 'hidden', position: 'absolute' }}
          type='file'
          accept='image/*'
          id='single'
          onChange={uploadAvatar}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}
