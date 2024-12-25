import { FaRegStar, FaStar } from 'react-icons/fa';

interface StarsProps {
  size?: number | string;
  numberOfFullStars: number;
  onStarClick?: (index: number) => void;
  isUpdatable?: boolean;
}

export default function Stars({
  size,
  numberOfFullStars,
  onStarClick,
}: StarsProps) {
  const starIcons = [];

  function handleClick(index: number) {
    if (onStarClick) {
      onStarClick(index);
    }
  }

  for (let i = 0; i < 5; i++) {
    if (numberOfFullStars !== 0) {
      starIcons.push(
        <FaStar
          size={size}
          color="#ffd250"
          key={i}
          onClick={() => {
            handleClick(i);
          }}
          className={onStarClick ? 'clickable' : ''}
        />,
      );
      numberOfFullStars--;
    } else {
      starIcons.push(
        <FaRegStar
          size={size}
          key={i}
          onClick={() => handleClick(i)}
          className={onStarClick ? 'clickable' : ''}
        />,
      );
    }
  }

  return <div>{starIcons}</div>;
}
