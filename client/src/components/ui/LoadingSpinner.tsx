import { Loader } from 'lucide-react';

export default function LoadingSpinner({ size }: { size?: number | string }) {
  return (
    <Loader
      className="animate-spin"
      size={size}
      role="status"
      aria-label="Loading..."
      aria-live="polite"
    />
  );
}
