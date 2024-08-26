'use client';

import { Spinner, Tiptap } from '@/app/components';
import { capitalizeString } from '@/helpers';
import { Field, Fieldset, Label, Select } from '@headlessui/react';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { User } from '../../users/types';
import { createComment, patchIncident } from '../actions';

type Props = {
  assignedTo: string;
  incidentId: number;
  isAdmin?: boolean;
  ownerId: string;
  userId: number;
  users?: User[];
};

const commentSchema = z.object({
  assignedTo: z
    .string({
      required_error: 'El asignado de la incidencia es requerida',
    })
    .optional(),
  content: z
    .string({
      required_error: 'El comentario es requerido',
    })
    .optional(),
  imageUrl: z
    .string({
      required_error: 'El título de la incidencia es requerido',
    })
    .url()
    .optional(),
  incidentId: z.string({
    required_error: 'El id de la incidencia es requerido',
  }),
  ownerId: z.string({
    required_error: 'El dueño de la incidencia es requerida',
  }),
  userId: z.string({
    required_error: 'El dueño del comentario es requerido',
  }),
});

export default function UpdateIncidentForm({
  assignedTo,
  incidentId,
  isAdmin = false,
  ownerId,
  users = [],
  userId,
}: Props) {
  const formik = useFormik({
    initialValues: {
      assignedTo,
      content: '',
      imageUrl: '',
      incidentId: incidentId.toString(),
      ownerId,
      userId: userId.toString(),
    },
    validationSchema: toFormikValidationSchema(commentSchema),
    onSubmit: async (values) => {
      const {
        assignedTo: newAssignedTo,
        ownerId: newOwnerId,
        ...comment
      } = values;
      if (comment.content) {
        let result = null;
        result = await createComment(comment as any);
        handleCommentChange('');
      }

      await patchIncident(incidentId, {
        assignedTo:
          newAssignedTo !== assignedTo ? Number(newAssignedTo) : undefined,
        ownerId: newOwnerId !== ownerId ? Number(newOwnerId) : undefined,
      });
    },
  });
  const technicians = useMemo(
    () => users.filter((user) => user.roleId === 2),
    [users]
  );
  const handleCommentChange = (content: string) => {
    formik.setFieldValue('content', content);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Fieldset className="space-y-8">
        {isAdmin ? (
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                Propietario
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
            Agregar comentario
          </Label>
          <div className="mb-4">
            <Tiptap
              content={formik.values.content}
              onChange={handleCommentChange}
            />
          </div>
          {formik.touched.content && formik.errors.content ? (
            <small className="text-sm text-red-500">
              {formik.errors.content as string}
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
