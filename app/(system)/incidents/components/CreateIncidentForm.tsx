'use client';

import { Spinner, Tiptap } from '@/app/components';
import { capitalizeString } from '@/helpers';
import { Field, Fieldset, Input, Label, Select } from '@headlessui/react';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { User } from '../../users/types';
import { createIncident } from '../actions';
import { Category, Status } from '../types';

type Props = {
  categories: Category[];
  isAdmin?: boolean;
  ownerId: string;
  status: Status[];
  users?: User[];
};

const incidentSchema = z.object({
  assignedTo: z
    .string({
      required_error: 'El asignado de la incidencia es requerida',
    })
    .optional(),
  categoryId: z.string({
    required_error: 'La categoría es requerida',
  }),
  comment: z.string({
    required_error: 'El comentario es requerido',
  }),
  ownerId: z.string({
    required_error: 'El dueño de la incidencia es requerida',
  }),
  statusId: z.string({
    required_error: 'El status de la incidencia es requerida',
  }),
  title: z.string({
    required_error: 'El título de la incidencia es requerido',
  }),
});

export default function CreateIncidentForm({
  categories,
  isAdmin = false,
  ownerId,
  status,
  users = [],
}: Props) {
  const formik = useFormik({
    initialValues: {
      categoryId: categories[0]?.id.toString() || '',
      comment: '',
      ownerId,
      statusId: status[0]?.id.toString() || '',
      title: '',
    },
    validationSchema: toFormikValidationSchema(incidentSchema),
    onSubmit: async (values: any) => {
      await createIncident(values);
    },
  });
  const technicians = useMemo(
    () => users.filter((user) => user.roleId === 2),
    [users]
  );

  const handleCommentChange = (content: string) => {
    formik.setFieldValue('comment', content);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      onKeyDown={(e) => (/Enter/i.test(e.key) ? formik.handleSubmit() : null)}
    >
      <Fieldset className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Título
            </Label>
            <Input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title ? (
              <small className="text-sm text-red-500">
                {formik.errors.title as string}
              </small>
            ) : null}
          </Field>
          <Field>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Categoría
            </Label>
            <Select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formik.getFieldProps('categoryId')}
            >
              {categories.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {capitalizeString(category?.name)}
                </option>
              ))}
            </Select>
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <small className="text-sm text-red-500">
                {formik.errors.categoryId as string}
              </small>
            ) : null}
          </Field>
        </div>
        {isAdmin ? (
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Propetario
              </Label>
              <Select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...formik.getFieldProps('ownerId')}
              >
                {users.map((user) => (
                  <option key={user?.id} value={user?.id}>
                    {capitalizeString(`${user?.firstName} ${user?.lastName}`)}
                  </option>
                ))}
              </Select>
              {formik.touched.ownerId && formik.errors.ownerId ? (
                <small className="text-sm text-red-500">
                  {formik.errors.ownerId as string}
                </small>
              ) : null}
            </Field>
            <Field>
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Asignado
              </Label>
              <Select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...formik.getFieldProps('assignedTo')}
              >
                <option value="">Auto Asignar</option>
                {technicians.map((user) => (
                  <option key={user?.id} value={user?.id}>
                    {capitalizeString(`${user?.firstName} ${user?.lastName}`)}
                  </option>
                ))}
              </Select>
              {formik.touched.assignedTo && formik.errors.assignedTo ? (
                <small className="text-sm text-red-500">
                  {formik.errors.assignedTo as string}
                </small>
              ) : null}
            </Field>
          </div>
        ) : null}
        <div>
          <Label className="mb-4 block text-sm font-medium leading-6 text-gray-900">
            Comentario
          </Label>
          <Tiptap onChange={handleCommentChange} />
          {formik.touched.comment && formik.errors.comment ? (
            <small className="text-sm text-red-500">
              {formik.errors.comment as string}
            </small>
          ) : null}
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
