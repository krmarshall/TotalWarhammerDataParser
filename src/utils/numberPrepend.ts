export const HowEnum = {
  add: 'add',
  mult: 'mult',
} as const;

const numberPrepend = (string: string, value: number, how: HowEnum) => {
  if (string[0] !== ' ') {
    string = ` ${string}`;
  }
  switch (how) {
    case 'add': {
      if (value > 0) {
        string = `+${value}${string}`;
      } else {
        string = `${value}${string}`;
      }
      break;
    }
    case 'mult': {
      string = `x${value}${string}`;
      break;
    }
    default:
      throw 'Invalid prepend how';
  }
  return string;
};

export type HowEnum = typeof HowEnum[keyof typeof HowEnum];
export default numberPrepend;
