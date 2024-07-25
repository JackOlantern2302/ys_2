'use client';
import { login } from '../action/action';

import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <section className="flex flex-row flex-grow">
      <div className="flex flex-1 justify-center">
        <form
          action={login}
          className="flex flex-col w-[25vw] border shadow-md rounded-xl gap-2 px-12 py-8"
        >
          <p className="text-2xl">Login</p>

          <label htmlFor="email">Email:</label>
          <input
            className="border-b focus:outline-none pb-2"
            id="email"
            name="email"
            type="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="border-b focus:outline-none pb-2"
            id="password"
            name="password"
            type="password"
            required
          />
          <div className="flex flex-col text-center">
            <button
              formAction={login}
              type="submit"
              className={`border border-green-500 hover:bg-green-500 hover:text-white font-semibold rounded-full transition-all duration-300 p-2 my-4`}
            >
              Log in
            </button>
            <p className="text-slate-500 my-2">or make a new account</p>
            <Link
              href={'/register'}
              className={`bg-green-500 text-white hover:bg-transparent hover:border hover:border-green-500 hover:text-black font-semibold rounded-full transition-all duration-300 p-2 my-4`}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
