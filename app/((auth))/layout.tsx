import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect('/');
  }
  return (
    <section>
      <main className="flex h-screen justify-center items-center">
        {children}
      </main>
    </section>
  );
}
