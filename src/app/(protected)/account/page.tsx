import { createClient } from '@/utils/supabase/server';
import AccountForm from './account-form';

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <AccountForm user={user} />
    </main>
  );
}
