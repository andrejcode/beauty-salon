interface SocialIconProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  fill?: string;
}

export default function SocialIcon({
  children,
  width = 24,
  height = 24,
  fill = 'black',
}: SocialIconProps) {
  return (
    <svg
      role="img"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
