'use client';

import { signOut } from '@/app/(auth)/action/action';
import { Button } from './ui/button';

export default function SignOutForm() {
  return (
    <form
      onSubmit={(e) => {
        if (!confirm('Apakah Anda yakin ingin keluar?')) {
          e.preventDefault();
        }
      }}
    >
      <Button
        className="flex items-center gap-4 text-xl hover:text-red-500 transition-all duration-300"
        formAction={signOut}
        variant="ghost"
      >
        Keluar
        <span>{'>'}</span>
      </Button>
    </form>
  );
}
