import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex p-8 justify-evenly items-center border shadow-lg bg-yellow-200">
      <Link href={'/stock'}>Stock</Link>
      <Link href={'/transaction'}>Transaction</Link>
    </div>
  );
};

export default Navbar;
