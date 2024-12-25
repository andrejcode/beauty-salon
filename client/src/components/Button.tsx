import BootstrapButton from 'react-bootstrap/Button';

interface ButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  title,
  type,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  return (
    <BootstrapButton
      type={type}
      disabled={disabled}
      className={`main-color ${className}`}
      onClick={onClick}
    >
      {title}
    </BootstrapButton>
  );
}
