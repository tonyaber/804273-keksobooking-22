const getRandomNumber = (min, max, numberOfDigits = 0) => {
  if (max >= 0 && min >= 0) {
    const numberOfSigns = 10 ** numberOfDigits;

    return Math.round((Math.random() * (max - min) + min) * numberOfSigns) / numberOfSigns;
  }

  throw new Error('Число меньше нуля');
}
