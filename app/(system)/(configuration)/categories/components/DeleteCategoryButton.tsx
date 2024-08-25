'use client';

import { Alert } from '@/app/components';
import { useState } from 'react';
import { deleteCategory } from '../actions';
import { Category } from '../types';

type Props = {
  category: Category;
};

export default function DeleteCategoryButton({ category }: Props) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen(false);
    setErrorMessage('');
  };

  const onDelete = async (id: number) => {
    const response = await deleteCategory(id);
    console.log('response', response);
    if (typeof response === 'string') {
      setErrorMessage(response);
      setOpen(true);
    }
  };

  return (
    <>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-red-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-red-600 transition-colors hover:bg-red-700 focus:z-10"
        onClick={() => onDelete(category.id)}
      >
        Borrar <span className="sr-only">, {category.id}</span>
      </button>
      <Alert
        message={errorMessage}
        onCancel={onClick}
        onConfirm={onClick}
        open={open}
        title="Error"
        type="danger"
      />
    </>
  );
}
