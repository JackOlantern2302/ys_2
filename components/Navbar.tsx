import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex py-4 px-16 justify-between items-center border shadow-lg">
      <Link href={'/'}>
        <Image src={'/Logo.png'} alt="Logo" width={44} height={44} />
      </Link>
      <div className="flex items-center gap-4">
        <Link href={'/stock'} className="hover:font-bold transition-all">
          Stok
        </Link>
        <Link href={'/transaction'} className="hover:font-bold transition-all">
          Transaksi
        </Link>

        {user === null ? (
          <Link
            href={'/login'}
            className="bg-yellow-400 px-4 py-2 rounded-md hover:scale-[1.03] transition-all"
          >
            Masuk
          </Link>
        ) : (
          <Link
            href={'/profile'}
            className="bg-yellow-400 px-4 py-2 rounded-md hover:scale-[1.03] transition-all"
          >
            {user.user_metadata?.display_name || user.email}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
