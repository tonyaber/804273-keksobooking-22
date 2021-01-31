const getRandomInt = (min, max) =>{
  if (max > min && min >= 0) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.round(Math.random() * (max - min) + min);
  }
  else{
    return null;
  }
}
const getRandomFloat = (min, max, numberOfDigits)=>{
  if (max > min && min >= 0) {
    let numberOfSigns = 1;
    for (let i = 0; i < numberOfDigits; i++){
      numberOfSigns *= 10;
    }
    return Math.round((Math.random() * (max - min) + min)*numberOfSigns)/numberOfSigns;
  }
  else{
    return null;
  }
}

