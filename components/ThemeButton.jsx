'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }
  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='rounded-lg transition-all'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='h-5 w-5 text-orange-500' />
      ) : (
        <MoonIcon className='h-5 w-5 text-slate-800' />
      )}
    </button>
  )
}
