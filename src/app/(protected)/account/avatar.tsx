'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useRef, useState } from 'react';
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoaderCircle, UploadIcon } from 'lucide-react';

interface AvatarProps {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}

export default function Avatar({ uid, url, onUpload }: AvatarProps) {
  const supabase = createClient();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadRef = useRef<HTMLInputElement | null>(null);

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

  const uploadButtonText = isUploading
    ? 'Uploading...'
    : avatarUrl
    ? 'Change avatar'
    : 'Upload avatar';

  return (
    <div className='flex flex-col items-center gap-y-4'>
      <AvatarComponent className={cn(`w-20 h-20`)}>
        <AvatarImage
          src={avatarUrl as string}
          alt='User avatar'
          className='object-cover object-top'
        />
        <AvatarFallback>BS</AvatarFallback>
      </AvatarComponent>

      <div>
        <Button
          onClick={() => {
            uploadRef.current?.click();
          }}
          variant={'outline'}
          size={'sm'}
          className='text-xs'
        >
          {isUploading ? (
            <LoaderCircle className='w-3 h-3 animate-spin' />
          ) : (
            <UploadIcon className='w-3 h-3' />
          )}
          {uploadButtonText}
        </Button>
        <input
          ref={uploadRef}
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
