'use client';

import { Query } from '@/app/types';
import { classNames } from '@/helpers';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export type Props = {
  query: Query;
  totalCount: number;
};

export default function Pagination({
  query: { limit, page },
  totalCount = 0,
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isFirstPage = page === 1;
  const isLastPage = page * limit >= totalCount ? true : false;
  const fromValue = page && limit ? page * limit - limit + 1 : 0;
  const lastPage = Math.ceil(totalCount / limit);
  const toValue =
    page && limit ? (page * limit > totalCount ? totalCount : page * limit) : 0;

  const pages = useMemo(() => {
    const pages = [page];
    const lastPage = Math.ceil(totalCount / limit);
    const prevPage = page > 1 ? page - 1 : 0;
    const nextPage = page < lastPage ? page + 1 : 0;

    if (prevPage) pages.unshift(prevPage);

    if (nextPage) pages.push(nextPage);

    return pages;
  }, [page, totalCount, limit]);

  function setPage(page?: number) {
    const params = new URLSearchParams(searchParams);

    if (page) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='sticky left-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 md:static'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          disabled={isFirstPage}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          disabled={isLastPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{fromValue}</span> to{' '}
            <span className='font-medium'>{toValue}</span> of{' '}
            <span className='font-medium'>{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <button
              className={classNames(
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                isFirstPage ? 'cursor-not-allowed' : ''
              )}
              disabled={isFirstPage}
              onClick={() => setPage()}
            >
              <span className='sr-only'>Previous</span>
              <ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              className={classNames(
                'relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                isFirstPage ? 'cursor-not-allowed' : ''
              )}
              disabled={isFirstPage}
              onClick={() => setPage(page - 1)}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pages.map((pageValue) => (
              <button
                aria-current='page'
                className={classNames(
                  'relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  page === pageValue
                    ? 'bg-blue-500 text-white focus-visible:outline-blue-400'
                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                )}
                key={`pagination-page-${pageValue}`}
                onClick={() => setPage(pageValue === 1 ? undefined : pageValue)}
              >
                {pageValue}
              </button>
            ))}
            <button
              className={classNames(
                'relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                isLastPage ? 'cursor-not-allowed' : ''
              )}
              disabled={isLastPage}
              onClick={() => setPage(page + 1)}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              className={classNames(
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                isLastPage ? 'cursor-not-allowed' : ''
              )}
              disabled={isLastPage}
              onClick={() => setPage(lastPage)}
            >
              <span className='sr-only'>Next</span>
              <ChevronDoubleRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
