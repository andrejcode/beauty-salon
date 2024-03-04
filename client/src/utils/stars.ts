export function calculateStarsByIndex(index: number): number {
  let stars;

  if (index === 0) {
    stars = 1;
  } else if (index === 1) {
    stars = 2;
  } else if (index === 2) {
    stars = 3;
  } else if (index === 3) {
    stars = 4;
  } else {
    stars = 5;
  }

  return stars;
}
