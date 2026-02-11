'use client';
import { login } from '../action/action';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Page() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setErrorMsg(null);
    const result = await login(formData);
    if (result?.error) {
      setErrorMsg(result.error);
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-row flex-grow">
      <div className="flex flex-1 justify-center">
        <form
          action={handleSubmit}
          className="flex flex-col w-[25vw] border shadow-md rounded-xl gap-2 px-12 py-8"
        >
          <p className="text-2xl">Masuk</p>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm my-2">
              {errorMsg}
            </div>
          )}

          <label htmlFor="email">Email:</label>
          <input
            className="border-b focus:outline-none pb-2"
            id="email"
            name="email"
            type="email"
            required
          />
          <label htmlFor="password">Kata Sandi:</label>
          <input
            className="border-b focus:outline-none pb-2"
            id="password"
            name="password"
            type="password"
            required
          />
          <div className="flex flex-col text-center">
            <Button
              disabled={loading}
              type="submit"
              className={`border border-green-500 hover:bg-green-500 hover:text-white font-semibold rounded-full transition-all duration-300 p-2 my-4`}
              variant="outline"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </Button>
            <p className="text-slate-500 my-2">atau buat akun baru</p>
            <Link
              href={'/register'}
              className={`bg-green-500 text-white hover:bg-transparent hover:border hover:border-green-500 hover:text-black font-semibold rounded-full transition-all duration-300 p-2 my-4`}
            >
              Daftar
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
