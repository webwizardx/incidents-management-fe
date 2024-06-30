'use client';

import { Query } from '@/app/types';
import { capitalizeString } from '@/helpers';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Select,
} from '@headlessui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Spinner } from '../../components';
import { createUser, getRoles, updateUser } from '../api';
import { Role, User } from '../types';
import { DEFAULT_QUERY } from './Table';

const DEFAULT_FORM_VALUES = {
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  roleId: '3',
};

const userSchema = z
  .object({
    email: z.string({
      required_error: 'El correo electrónico es requerido',
    }),
    firstName: z.string({
      required_error: 'El nombre es requerido',
    }),
    lastName: z.string({
      required_error: 'El apellido es requerido',
    }),
    password: z.string({
      required_error: 'La contraseña es requerida',
    }),
    confirmPassword: z.string({
      required_error: 'La confirmación de la contraseña es requerida',
    }),
    roleId: z.string({
      required_error: 'El rol es requerido',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type USER_SCHEMA = z.infer<typeof userSchema>;

type Props = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  setQuery: (query: Query) => void;
  user?: User | null;
};

export default function UserFormModal({
  isOpen = true,
  onClose,
  setQuery,
  user,
}: Props) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const getFormValues = () => {
    if (user) {
      return {
        confirmPassword: '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
        roleId: user.role.id.toString(),
      };
    }

    return DEFAULT_FORM_VALUES;
  };
  const formik = useFormik({
    initialValues: getFormValues(),
    validationSchema: () => {
      if (user) {
        z;
      }

      return toFormikValidationSchema(userSchema);
    },
    onSubmit: async (values: USER_SCHEMA) => {
      const { confirmPassword: _, ...payload } = values;

      if (user) {
        const result = await updateUser(user.id, {
          ...payload,
          roleId: parseInt(payload.roleId),
        });
      } else {
        const result = await createUser({
          ...payload,
          roleId: parseInt(payload.roleId),
        });
      }

      setQuery({ ...DEFAULT_QUERY });
      onClose(false);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues(getFormValues);
    }
  }, [user]);

  useEffect(() => {
    getRoles().then(({ data }) => setRoles(data));
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose(false)}
      className='fixed inset-0 z-50 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0'
      transition={true}
    >
      <div className='fixed inset-0 z-50 flex w-screen items-center justify-center p-4'>
        <DialogPanel className='max-w-lg space-y-4 rounded-md border bg-white p-6'>
          <DialogTitle className='text-xl font-bold'>
            {user ? 'Editar' : 'Crear'} Usuario
          </DialogTitle>
          <form
            onSubmit={formik.handleSubmit}
            onKeyDown={(e) =>
              /Enter/i.test(e.key) ? formik.handleSubmit() : null
            }
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
                      {formik.errors.firstName}
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
                      {formik.errors.lastName}
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
                      {formik.errors.email}
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
                      {formik.errors.roleId}
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
                    {showPassword ? (
                      <EyeSlashIcon
                        className='h-4 w-4 cursor-pointer'
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeIcon
                        className='h-4 w-4 cursor-pointer'
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  <Input
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <small className='text-sm text-red-500'>
                      {formik.errors.password}
                    </small>
                  ) : null}
                </Field>
                <Field>
                  <div className='flex items-center gap-2'>
                    <Label className='text-sm font-medium leading-6 text-gray-900'>
                      Confirmar contraseña
                    </Label>
                    {showPassword ? (
                      <EyeSlashIcon
                        className='h-4 w-4 cursor-pointer'
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeIcon
                        className='h-4 w-4 cursor-pointer'
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  <Input
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    type={showPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <small className='text-sm text-red-500'>
                      {formik.errors.confirmPassword}
                    </small>
                  ) : null}
                </Field>
              </div>
            </Fieldset>
            <div className='mt-4 flex justify-end gap-4'>
              <button
                type='button'
                className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={() => onClose(false)}
              >
                Cerrar
              </button>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <Spinner /> : 'Guardar'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
