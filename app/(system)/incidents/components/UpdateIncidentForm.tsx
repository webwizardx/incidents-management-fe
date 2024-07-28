'use client';

import { Spinner, Tiptap } from '@/app/components';
import { Fieldset, Label } from '@headlessui/react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { createComment } from '../actions';

type Props = {
  incidentId: number;
  userId: number;
};

const commentSchema = z.object({
  content: z.string({
    required_error: 'El comentario es requerido',
  }),
  imageUrl: z
    .string({
      required_error: 'El título de la incidencia es requerido',
    })
    .url()
    .optional(),
  incidentId: z.string({
    required_error: 'El id de la incidencia es requerido',
  }),
  userId: z.string({
    required_error: 'El dueño del comentario es requerido',
  }),
});

export default function UpdateIncidentForm({ incidentId, userId }: Props) {
  const formik = useFormik({
    initialValues: {
      content: '',
      imageUrl: '',
      incidentId: incidentId.toString(),
      userId: userId.toString(),
    },
    validationSchema: toFormikValidationSchema(commentSchema),
    onSubmit: async (values: any) => {
      let result = null;
      result = await createComment(values);
      handleCommentChange('');
    },
  });

  const handleCommentChange = (content: string) => {
    formik.setFieldValue('content', content);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Fieldset className="space-y-8">
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
