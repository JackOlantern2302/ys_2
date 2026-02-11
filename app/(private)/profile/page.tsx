import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { PersonStandingIcon } from 'lucide-react';
import SignOutForm from '@/components/SignOutForm';
import EditProfileForm from '@/components/EditProfileForm';

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  const displayName = data.user.user_metadata?.display_name || '';

  return (
    <div className="flex flex-col shadow py-8 px-12 gap-8 rounded-lg mx-16 my-8 bg-white">
      <section className="flex gap-16">
        {/* TODO: Make change picture functionality */}
        {/* Profile Picture */}
        <div className="flex rounded-full aspect-square object-cover overflow-hidden max-w-60 bg-slate-100 hover:blur-sm transition-all duration-300">
          <PersonStandingIcon className="size-48" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col divide-y-2 divide-yellow-600">
            <p className="text-2xl">
              Halo <span className="text-yellow-400">{displayName || data.user.email}</span>
            </p>
            {displayName && <p className="text-sm text-gray-500">{data.user.email}</p>}
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Edit Profil</h3>
            <EditProfileForm initialDisplayName={displayName} />
          </div>
        </div>
      </section>
      <section className="flex self-center">
        <SignOutForm />
      </section>
    </div>
  );
}
