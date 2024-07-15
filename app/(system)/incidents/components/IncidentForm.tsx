'use client';

import { Spinner } from '@/app/components';
import { capitalizeString } from '@/helpers';
import { Field, Fieldset, Input, Label, Select } from '@headlessui/react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { User } from '../../users/types';
import { createIncident, patchIncident } from '../actions';
import { Category, Status } from '../types';

type Props = {
  categories: Category[];
  incidentId?: number;
  initialValues?: {
    assignedTo?: string;
    categoryId: string;
    closedAt?: string;
    ownerId: string;
    statusId: string;
    title: string;
  };
  ownerId?: string;
  status: Status[];
  users: User[];
};

const incidentSchema = z
  .object({
    assignedTo: z
      .string({
        required_error: 'La persona asignada a la incidencia es requerida',
      })
      .optional(),
    categoryId: z.string({
      required_error: 'La categoría es requerida',
    }),
    closedAt: z
      .string()
      .datetime('La fecha de cierre de incidencia no es válida')
      .optional(),
    ownerId: z.string({
      required_error: 'El dueño de la incidencia es requerida',
    }),
    statusId: z.string({
      required_error: 'El status de la incidencia es requerida',
    }),
    title: z.string({
      required_error: 'El título de la incidencia es requerido',
    }),
  })
  .refine(
    (schema) => {
      if (schema.statusId === '3') {
        return Boolean(schema.closedAt);
      }
      return true;
    },
    {
      message: 'La fecha de cierre de incidencia es requerida',
      path: ['closedAt'],
    }
  );

const getValidationSchema = (initialValues: Props['initialValues']) => {
  if (!initialValues) {
    return toFormikValidationSchema(incidentSchema);
  }

  const optionalSchema = incidentSchema.optional();

  return toFormikValidationSchema(optionalSchema);
};

export default function IncidentForm({
  categories,
  incidentId,
  initialValues,
  ownerId,
  status,
  users,
}: Props) {
  const validationSchema = getValidationSchema(initialValues);
  const formik = useFormik({
    initialValues: initialValues || {
      assignedTo: '',
      categoryId: categories[0]?.id.toString() || '',
      closedAt: '',
      ownerId,
      statusId: status[0]?.id.toString() || '',
      title: '',
    },
    validationSchema,
    onSubmit: async (values: any) => {
      let result = null;
      if (values.statusId !== '3') {
        delete values.closedAt;
      }

      if (initialValues) {
        result = await patchIncident(incidentId!, values);
      } else {
        result = await createIncident(values);
      }
    },
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let date = null;
    if (e.target.value) {
      date = `${e.target.value}:00Z`;
    }
    formik.setFieldValue('closedAt', date || e.target.value);
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
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Status
            </Label>
            <Select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formik.getFieldProps('statusId')}
            >
              {status.map((_status) => (
                <option key={_status?.id} value={_status?.id}>
                  {capitalizeString(_status?.name)}
                </option>
              ))}
            </Select>
            {formik.touched.statusId && formik.errors.statusId ? (
              <small className="text-sm text-red-500">
                {formik.errors.statusId as string}
              </small>
            ) : null}
          </Field>
          <Field>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              Asignado a
            </Label>
            <Select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...formik.getFieldProps('assignedTo')}
            >
              <option value="">Sin asignar</option>
              {users.map((user) => (
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

        {formik.values.statusId === '3' ? (
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium leading-6 text-gray-900">
                  Fecha de cierre
                </Label>
              </div>
              <Input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...formik.getFieldProps('closedAt')}
                min={new Date().toISOString().slice(0, 16)}
                onChange={handleDateChange}
                value={formik.values.closedAt?.slice(0, 16)}
                type="datetime-local"
              />
              {formik.touched.closedAt && formik.errors.closedAt ? (
                <small className="text-sm text-red-500">
                  {formik.errors.closedAt as string}
                </small>
              ) : null}
            </Field>
          </div>
        ) : null}
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
