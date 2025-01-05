interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-200 p-8 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
