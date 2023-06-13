import GoogleSignInButton from '@components/GoogleSignInButton'

export const metadata = {
  title: 'SignIn-promptopia',
  description: 'Signin promptopia to discover and share AI prompts',
}

const SignInPage = () => {
  return (
    <section className='flex min-h-full overflow-hidden pt-16 sm:py-28'>
      <div className='mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6'>
        <div className='relative mt-12 sm:mt-16'>
          <h1 className='text-center text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-200'>
            Sign in to your account
          </h1>
        </div>
        <div className='sm:rounded-lg -mx-4 mt-10 flex-auto border border-gray-300 dark:border-gray-700 bg-white/20 dark:bg-gray-700 px-4 py-10 shadow-2xl shadow-gray-900/10 dark:shadow-gray-200/10 sm:mx-0 sm:flex-none sm:p-24'>
          <p className='text-center font-satoshi font-medium text-gray-500 dark:text-gray-300'>
            {' '}
            Email and Password Login
          </p>

          <div className='mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
          </div>
          <GoogleSignInButton />
        </div>
      </div>
    </section>
  )
}

export default SignInPage
