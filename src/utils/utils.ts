import colors from 'tailwindcss/colors';
import type { INoteItem } from '@/types/Note';
export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
};

export const backgroundColors = [
  colors.amber[300],
  colors.sky[300],
  colors.zinc[300],
  colors.pink[300],
  colors.stone[300],
  colors.red[300],
  colors.orange[300],
  colors.yellow[300],
  colors.violet[300],
  colors.green[300],
  colors.emerald[300],
  colors.teal[300],
  colors.cyan[300],
];

export const defaultList: INoteItem[] = [
  {
    id: 1,
    content: 'Test item',
    time: new Date(2023, 1, 10, 11, 20),
    background: getRandomColor(),
  },
  {
    id: 2,
    content: 'Test item 1',
    time: new Date(2023, 1, 11, 11, 20),
    background: getRandomColor(),
  },
  {
    id: 3,
    content: 'Test item 2',
    time: new Date(2023, 1, 12, 11, 20),
    background: getRandomColor(),
  },
  {
    id: 4,
    content: 'Test item 3',
    time: new Date(2023, 1, 13, 11, 20),
    background: getRandomColor(),
  },
  {
    id: 5,
    content: 'Test item 4',
    time: new Date(2023, 1, 14, 11, 20),
    background: getRandomColor(),
  },
  {
    id: 6,
    content: 'New 1',
    time: new Date(2023, 1, 14, 11, 20),
    background: getRandomColor(),
  },
  {
    id: 7,
    content: 'New 2',
    time: new Date(2023, 1, 14, 11, 20),
    background: getRandomColor(),
  },
  {
    id: 8,
    content: 'New 3',
    time: new Date(2023, 1, 14, 11, 20),
    background: getRandomColor(),
  },
];
