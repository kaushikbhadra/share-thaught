import Image from 'next/image'

export default function Spinner() {
  return (
    <div className='flex-center h-screen w-screen'>
      <Image
        src='/assets/icons/loader.svg'
        alt='loading...'
        width={16}
        height={16}
        className='animate-spin h-20 w-20'
      />
    </div>
  )
}
