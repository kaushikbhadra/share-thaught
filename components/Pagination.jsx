import Link from 'next/link'
import React from 'react'

const Pagination = ({
  totalPosts,
  totalPages,
  postPerPage,
  currentPage,
  skip,
  isProfilePage,
}) => {
  let pageNumber = []
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  for (let page = currentPage - 3; page <= currentPage + 3; page++) {
    if (page < 1) continue
    if (page > totalPages) break
    pageNumber.push(page)
  }

  return (
    <div className='pagination mb-5 pb-5'>
      <div className='flex flex-1 justify-between sm:hidden'>
        {prevPage >= 1 && (
          <Link
            href={`${isProfilePage ? '/profile' : ''}/?page=${prevPage}`}
            className='btn-sm-pagination'
          >
            Previous
          </Link>
        )}
        {nextPage <= totalPages && (
          <Link
            href={`${isProfilePage ? '/profile' : ''}/?page=${nextPage}`}
            className='ml-3 btn-sm-pagination'
          >
            Next
          </Link>
        )}
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700 dark:text-gray-300'>
            Showing
            <span className='font-semibold m-1 dark:font-bold'>
              {skip + 1} - {Math.min(skip + postPerPage, totalPosts)}
            </span>
            of
            <span className='font-semibold m-1 dark:font-bold'>
              {totalPosts}
            </span>
            <span className='mr-2'>results</span>
          </p>
        </div>
        <div className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
          {prevPage >= 1 && (
            <Link
              href={`${isProfilePage ? '/profile' : ''}/?page=${prevPage}`}
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          )}

          {pageNumber.map((page) => (
            <Link
              href={`${isProfilePage ? '/profile' : ''}/?page=${page}`}
              key={page}
              className={
                page === currentPage
                  ? 'btn-index-pagination btn-pagination-active'
                  : 'btn-index-pagination'
              }
            >
              {page}
            </Link>
          ))}

          {nextPage <= totalPages && (
            <Link
              href={`${isProfilePage ? '/profile' : ''}/?page=${nextPage}`}
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Next</span>
              <svg
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pagination
