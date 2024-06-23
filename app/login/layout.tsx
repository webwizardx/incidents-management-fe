import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio de sesión',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
