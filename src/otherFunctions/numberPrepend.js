const numberPrepend = (string, value, how) => {
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

export default numberPrepend;
