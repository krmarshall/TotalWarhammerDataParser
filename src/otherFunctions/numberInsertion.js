const numberInsertion = (string, number) => {
  string = string.replace('%n', number);
  if (number > 0) {
    string = string.replace('%+n', `+${number}`);
  } else {
    string = string.replace('%+n', `${number}`);
  }
  return string;
};

export default numberInsertion;
