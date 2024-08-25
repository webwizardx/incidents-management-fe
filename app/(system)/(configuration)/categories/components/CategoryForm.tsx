'use client';

import { Spinner } from '@/app/components';
import { Field, Fieldset, Input, Label } from '@headlessui/react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { createCategory, patchCategory } from '../actions';
import { Category } from '../types';

type Props = {
  category?: Category;
};

const categorySchema = z.object({
  name: z.string({
    required_error: 'El nombre de la categoría es requerido',
  }),
});

export default function CategoryForm({ category }: Props) {
  const formik = useFormik({
    initialValues: {
      name: category?.name || '',
    },
    validationSchema: toFormikValidationSchema(categorySchema),
    onSubmit: async (values: any) => {
      if (category) {
        await patchCategory(category.id, values);
      } else {
        await createCategory(values);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      onKeyDown={(e) => (/Enter/i.test(e.key) ? formik.handleSubmit() : null)}
    >
      <Fieldset className="space-y-8">
        <div className="grid grid-cols-1 gap-4">
          <Field>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Nombre de la Categoría
            </Label>
            <Input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <small className="text-sm text-red-500">
                {formik.errors.name as string}
              </small>
            ) : null}
          </Field>
        </div>
      </Fieldset>
      <div className="mt-4 flex justify-end gap-4">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
