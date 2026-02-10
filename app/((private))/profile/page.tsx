import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { PersonStandingIcon } from 'lucide-react';
import SignOutForm from '@/components/SignOutForm';

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col shadow py-8 px-12 gap-8 rounded-lg mx-16 my-8">
      <section className="flex gap-16">
        {/* TODO: Make change picture functionality */}
        {/* Profile Picture */}
        <div className="flex rounded-full aspect-square object-cover overflow-hidden max-w-60 bg-slate-100 hover:blur-sm transition-all duration-300">
          <PersonStandingIcon className="size-48" />
        </div>
        <div className="flex flex-col divide-y-2 divide-yellow-600">
          <p className="text-2xl">
            Hello <span className="text-yellow-400">{data.user.email}</span>
          </p>
        </div>
      </section>
      <section className="flex self-center">
        <SignOutForm />
      </section>
    </div>
  );
}
