interface AlertProps {
  children: React.ReactNode;
  variant: 'danger' | 'success';
}

export default function Alert({ children, variant }: AlertProps) {
  const variantClass = () => {
    if (variant === 'danger') {
      return 'text-red-500 bg-red-100 border-red-500';
    } else if (variant === 'success') {
      return 'bg-green-100 text-green-500 border-green-500';
    } else {
      return 'bg-white text-black border-black';
    }
  };

  return (
    <div className={`${variantClass()} rounded border p-3`}>{children}</div>
  );
}
