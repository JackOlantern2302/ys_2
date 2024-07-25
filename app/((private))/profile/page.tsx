import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { signOut } from '../../((auth))/action/action';
import Image from 'next/image';

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col shadow py-8 px-12 gap-8 rounded-lg">
      <section className="flex gap-16">
        {/* TODO: Make change picture functionality */}
        {/* Profile Picture */}
        <div className="flex rounded-full aspect-square object-cover overflow-hidden max-w-60 bg-slate-100 hover:blur-sm transition-all duration-300">
          <Image
            src="/vercel.svg"
            className="w-full"
            alt="Profile Picture"
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-col">
          <p>Hello {data.user.email}</p>
        </div>
      </section>
      <section className="flex self-center">
        <form>
          <button
            className="flex items-center gap-4 text-xl hover:text-red-500 transition-all"
            formAction={signOut}
          >
            Sign Out
            <span>{'>'}</span>
          </button>
        </form>
      </section>
    </div>
  );
}
