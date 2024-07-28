import { notAuthorized } from '@/app/(system)/not-authorized';
import DefaultUserSVG from '@/app/components/DefaultUserSVG';
import { Action } from '@/app/enum/action.enum';
import { checkCurrentPermissions } from '@/app/login/actions';
import { classNames } from '@/helpers';
import DOMPurify from 'isomorphic-dompurify';
import { Metadata } from 'next';
import { getComments, getIncident } from '../../actions';
import UpdateIncidentForm from '../../components/UpdateIncidentForm';

export const metadata: Metadata = {
  title: 'Actualización de Incidente',
};

export default async function UpdateIncident({
  params: { id },
}: {
  params: { id: number };
}) {
  const response = await checkCurrentPermissions({
    action: Action.Create,
    subject: 'incidents',
  });

  if (!response?.hasPermission) {
    notAuthorized();
  }

  const incident = await getIncident(id);
  const { data } = await getComments({
    incidentId: id,
    include: ['user'],
  });

  return (
    <div className="grid p-8">
      <div className="mb-4 px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Incidente #{id} - {incident.title}
        </h2>
      </div>
      <div className="mx-auto mb-20 w-full max-w-xl">
        <UpdateIncidentForm
          incidentId={incident.id}
          userId={incident.ownerId}
        />
      </div>
      <ul role="list" className="space-y-6">
        {data.map((comment, i) => (
          <li key={comment.id} className="relative flex gap-x-4">
            <div
              className={classNames(
                i === data.length - 1 ? 'h-6' : '-bottom-6',
                'absolute left-0 top-0 flex w-6 justify-center'
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            <>
              <DefaultUserSVG className="z-10 h-6 w-6" />
              <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">{`${comment?.user?.firstName} ${comment?.user?.lastName}`}</span>{' '}
                    commented
                  </div>
                  <time
                    dateTime={comment.createdAt}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <div
                  className="tiptap text-sm leading-6 text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.content).replaceAll(
                      '"',
                      ''
                    ),
                  }}
                ></div>
              </div>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
}
