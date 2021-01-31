const getRandomNumber = (min, max, numberOfDigits = 0) => {
  if (max >= min && min >= 0) {
    let numberOfSigns = 10 ** numberOfDigits;
    return Math.round((Math.random() * (max - min) + min) * numberOfSigns) / numberOfSigns;
  }
  throw new Error('Число меньше нуля');
}
