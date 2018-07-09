function findNumbers(max) {
  let myArray = [];
  for (let i = 1; i < max; i++) {
    if (parseInt(i / 3) === i / 3 || parseInt(i / 5) === i / 5) {
      myArray.push(i);
    }
  }
  console.log(myArray);
  const reducer = (value1, value2) => value1 + value2;
  console.log(myArray.reduce(reducer));
}

findNumbers(1000);
// =233168
