import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex py-4 px-16 justify-between items-center border shadow-lg">
      <Image src={'/Logo.png'} alt="Logo" width={44} height={44} />
      <div className="flex items-center gap-4">
        <Link href={'/stock'} className="hover:font-bold transition-all">
          Stock
        </Link>
        <Link href={'/transaction'} className="hover:font-bold transition-all">
          Transaction
        </Link>
        <Link
          href={'/new-order'}
          className="bg-yellow-400 px-4 py-2 rounded-md hover:scale-[1.03] transition-all"
        >
          New Order
        </Link>
        {user === null ? (
          <Link
            href={'/login'}
            className="bg-yellow-400 px-4 py-2 rounded-md hover:scale-[1.03] transition-all"
          >
            Login
          </Link>
        ) : (
          <Link
            href={'/profile'}
            className="bg-yellow-400 px-4 py-2 rounded-md hover:scale-[1.03] transition-all"
          >
            {user.email}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
