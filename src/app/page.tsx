import Chat from '@/components/chat';
import Editor from '@/components/editor';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className='grid grid-rows-[16px_1fr_16px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] w-full row-start-2 items-center sm:items-start'>
        <div className='grid grid-cols-2 gap-10 w-full'>
          <Editor />
          <Chat />
        </div>
      </main>
    </div>
  );
}
