'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const GoogleSignInButton = () => {
  return (
    <button
      className='w-full inline-flex justify-center items-center rounded-lg border border-gray-300 text-gray-700 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80'
      onClick={() => signIn('google')}
    >
      <Image
        src='/assets/images/google.svg'
        alt='google'
        width={3}
        height={3}
        className='mr-3 h-3 w-3'
      />
      Continue with Google
    </button>
  )
}

export default GoogleSignInButton