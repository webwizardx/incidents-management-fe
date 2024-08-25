import { notAuthorized } from '@/app/(system)/not-authorized';
import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCategory } from '../../actions';
import CategoryForm from '../../components/CategoryForm';

export const metadata: Metadata = {
  title: 'Actualización de Categoría',
};

export default async function UpdateIncident({
  params: { id },
}: {
  params: { id: number };
}) {
  const response = await checkCurrentPermissions({
    action: Action.Update,
    subject: 'categories',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  const category = await getCategory(id);
  if (!category) {
    return redirect('/categories');
  }

  return (
    <div className="grid p-8">
      <div className="mb-4 px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Categoría #{id} - {category.name}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Esta es la información de la categoría.
        </p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
