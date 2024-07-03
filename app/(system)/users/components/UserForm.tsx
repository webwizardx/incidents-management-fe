'use client';

import { ShowPasswordIcon, Spinner } from '@/app/components';
import { capitalizeString } from '@/helpers';
import { Field, Fieldset, Input, Label, Select } from '@headlessui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { createUser, patchUser } from '../actions';
import { Role } from '../types';

type Props = {
  initialValues?: {
    confirmPassword: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roleId: string;
  };
  roles: Role[];
  userId?: number;
};

const userSchema = z.object({
  email: z
    .string({
      required_error: 'El correo electrónico es requerido',
    })
    .email('El correo electrónico no es válido'),
  firstName: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .regex(/^[a-zA-Z]*$/, 'El nombre solo puede contener letras'),
  lastName: z
    .string({
      required_error: 'El apellido es requerido',
    })
    .regex(/^[a-zA-Z]*$/, 'El apellido solo puede contener letras'),
  password: z.string({
    required_error: 'La contraseña es requerida',
  }),
  confirmPassword: z.string({
    required_error: 'La confirmación de la contraseña es requerida',
  }),
  roleId: z.string({
    required_error: 'El rol es requerido',
  }),
});

userSchema.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

const getValidationSchema = (initialValues: Props['initialValues']) => {
  if (!initialValues) {
    return toFormikValidationSchema(userSchema);
  }

  const optionalSchema = userSchema.partial();

  return toFormikValidationSchema(optionalSchema);
};

export default function UserForm({ initialValues, roles, userId }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = getValidationSchema(initialValues);
  const formik = useFormik({
    initialValues: initialValues || {
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      roleId: '3',
    },
    validationSchema,
    onSubmit: async (values: any) => {
      let result = null;

      if (initialValues) {
        result = await patchUser(userId!, values);
      } else {
        result = await createUser(values);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      onKeyDown={(e) => (/Enter/i.test(e.key) ? formik.handleSubmit() : null)}
    >
      <Fieldset className='space-y-8'>
        <div className='grid grid-cols-2 gap-4'>
          <Field>
            <Label className='block text-sm font-medium leading-6 text-gray-900'>
              Nombre
            </Label>
            <Input
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <small className='text-sm text-red-500'>
                {formik.errors.firstName as string}
              </small>
            ) : null}
          </Field>
          <Field>
            <Label className='block text-sm font-medium leading-6 text-gray-900'>
              Apellido
            </Label>
            <Input
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <small className='text-sm text-red-500'>
                {formik.errors.lastName as string}
              </small>
            ) : null}
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Field>
            <Label className='block text-sm font-medium leading-6 text-gray-900'>
              Dirección de correo electrónico
            </Label>
            <Input
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <small className='text-sm text-red-500'>
                {formik.errors.email as string}
              </small>
            ) : null}
          </Field>
          <Field>
            <Label className='block text-sm font-medium leading-6 text-gray-900'>
              Rol
            </Label>
            <Select
              className='block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              {...formik.getFieldProps('roleId')}
            >
              {roles.map((role) => (
                <option key={role?.id} value={role?.id}>
                  {capitalizeString(role?.name)}
                </option>
              ))}
            </Select>
            {formik.touched.roleId && formik.errors.roleId ? (
              <small className='text-sm text-red-500'>
                {formik.errors.roleId as string}
              </small>
            ) : null}
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Field>
            <div className='flex items-center gap-2'>
              <Label className='text-sm font-medium leading-6 text-gray-900'>
                Contraseña
              </Label>
              <ShowPasswordIcon
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            <Input
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              type={showPassword ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <small className='text-sm text-red-500'>
                {formik.errors.password as string}
              </small>
            ) : null}
          </Field>
          <Field>
            <div className='flex items-center gap-2'>
              <Label className='text-sm font-medium leading-6 text-gray-900'>
                Confirmar contraseña
              </Label>
              <ShowPasswordIcon
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            <Input
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              type={showPassword ? 'text' : 'password'}
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <small className='text-sm text-red-500'>
                {formik.errors.confirmPassword as string}
              </small>
            ) : null}
          </Field>
        </div>
      </Fieldset>
      <div className='mt-4 flex justify-end gap-4'>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
