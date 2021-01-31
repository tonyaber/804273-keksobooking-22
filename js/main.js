const getRandomInt = function (min, max) {
  if (max > min && min >= 0) {

    min = Math.floor(min);
    max = Math.floor(max);

    let date = new Date();
    let number = date.getMilliseconds();
    number = number * number + number * 8571254;

    while (number > max) {
      number %= max;
      if (number < min) {
        number += min;
      }
    }
    return number;
  }
  else
  {
    return null;
  }
}

const getRandomFloat = function (min, max, numberOfDigits){
  if (max > min && min >= 0) {

    let numberOfSigns = 1;
    for (let i = 0; i < numberOfDigits; i++){
      numberOfSigns *= 10;

    }
    let date = new Date();
    let number = date.getMilliseconds();
    number = number * number + number * 8571254;

    while (number > max) {
      number %= max;
      if (number < min) {
        number += min;
      }
    }
    return Math.round(number * numberOfSigns) / numberOfSigns;
  }
  else
  {
    return null;
  }
}

