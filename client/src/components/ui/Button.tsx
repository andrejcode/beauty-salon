interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
}: ButtonProps) {
  let variantClass = '';
  if (variant === 'primary') {
    variantClass = 'bg-pink-100 hover:bg-pink-200';
  } else {
    variantClass = 'border border-black hover:bg-black hover:text-white';
  }

  return (
    <button
      type={type}
      className={`rounded px-4 py-2 text-black transition duration-300 ${variantClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
