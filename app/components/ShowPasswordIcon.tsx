import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type Props = {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
};

export default function ShowPasswordIcon({
  showPassword,
  setShowPassword,
}: Props) {
  return (
    <>
      {showPassword ? (
        <EyeSlashIcon
          className="h-4 w-4 cursor-pointer"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <EyeIcon
          className="h-4 w-4 cursor-pointer"
          onClick={() => setShowPassword(true)}
        />
      )}
    </>
  );
}
