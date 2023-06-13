import Link from 'next/link'
import Image from 'next/image'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powerd platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 dark:text-gray-200'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 dark:text-gray-200'>
            Tag{' '}
            <span className='font-normal'>
              (#product, #webdevlopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='Write your tags without # symbol before your tags...'
            required
            className='form_input'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link
            prefetch={false}
            href='/'
            className='text-gray-500 text-sm dark:text-white'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='flex items-center px-5 py-1.5 text-sm bg-orange-600 hover:bg-orange-700 rounded-full text-white'
          >
            {submitting ? (
              <>
                <Image
                  src='/assets/icons/button-loader.svg'
                  alt='loading...'
                  width={5}
                  height={5}
                  className='mr-3 h-5 w-5 animate-spin'
                />
                <span>{type}</span>
              </>
            ) : (
              type
            )}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
