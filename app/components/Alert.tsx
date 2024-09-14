'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

type Props = {
  cancelText?: string;
  confirmText?: string;
  message?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  open?: boolean;
  title?: string;
  type?: 'danger' | 'success' | 'warning';
};

export default function Alert({
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
  message,
  onCancel,
  onConfirm,
  open = true,
  title = 'Éxito',
  type = 'success',
}: Props) {
  const colors = {
    danger: {
      text: 'text-red-800',
      bg: 'bg-red-100',
      'bg-button': 'bg-red-800',
      hover: 'hover:bg-red-200',
      'hover-button': 'hover:bg-red-900',
    },
    success: {
      text: 'text-green-800',
      bg: 'bg-green-50',
      'bg-button': 'bg-green-50',
      hover: 'hover:bg-green-100',
      'hover-button': 'hover:bg-green-100',
    },
    warning: {
      text: 'text-yellow-800',
      bg: 'bg-yellow-100',
      'bg-button': 'bg-yellow-100',
      hover: 'hover:bg-yellow-200',
      'hover-button': 'hover:bg-yellow-902000',
    },
  };

  const Icon = ({ type }: { type: Props['type'] }) => {
    switch (type) {
      case 'danger':
        return (
          <ExclamationTriangleIcon
            aria-hidden="true"
            className={`h-6 w-6 ${colors[type].text}`}
          />
        );
      case 'success':
        return (
          <CheckCircleIcon
            aria-hidden="true"
            className={`h-6 w-6 ${colors[type].text}`}
          />
        );
      case 'warning':
        return (
          <InformationCircleIcon
            aria-hidden="true"
            className={`h-6 w-6 ${colors[type].text}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={() => onCancel?.()} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${colors[type].bg}`}
              >
                <Icon type={type} />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>
                {message ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => onConfirm?.()}
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors sm:ml-3 sm:w-auto ${colors[type].text} ${colors[type]['hover-button']} ${colors[type]['bg-button']}`}
              >
                {confirmText}
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => onCancel?.()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {cancelText}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
