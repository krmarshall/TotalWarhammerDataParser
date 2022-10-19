const log = (message, color) => {
  let colorReference;
  switch (color) {
    case 'grey': {
      colorReference = '90';
      break;
    }
    case 'red': {
      colorReference = '31';
      break;
    }
    case 'green': {
      colorReference = '32';
      break;
    }
    case 'yellow': {
      colorReference = '33';
      break;
    }
    default: {
      colorReference = '0';
      break;
    }
  }

  console.log(`\x1b[${colorReference}m`, `\b${message}`, '\x1b[0m');
};

export default log;
