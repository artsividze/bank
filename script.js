'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [412.433,32,-43,231,321,-5322,41234.344,342,432,-4323,3244],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent form from submiting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  containerApp.style.opacity = 100;
  updateUI(currentAccount);
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, reciverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(Number(amount));
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    inputClosePin.value == currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// currencies.forEach(function(value,key,map){
//   console.log(`${key}:${value}`);
// })

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(function(movement,index){
//   console.log(`you deposited ${index} ${movement}`)
// })
/////////////////////////////////////////////////

// const arr = ['a','b','c','d','e'];
// const arr2=['j','i','h','g','f'];
// console.log(arr2.reverse());
// const letters = arr.concat(arr2);
// console.log(letters);

// let dogsJulia = [3, 5, 2, 12, 7];
// let dogsKate = [4, 1, 15, 8, 3];
// let dogsJulia1 = [9, 16, 6, 8, 3];
// let dogsKate1 = [10, 5, 6, 1, 4];

// function checkDogs(dogsJulia, dogsKate) {
//   let newDogsJulia = dogsJulia.slice(1, dogsJulia.length - 2);
//   let bothDogs = newDogsJulia.concat(dogsKate);
//   bothDogs.forEach(function (dogAge, index) {
//     if (dogAge >= 5) {
//       console.log(
//         `Dog number ${index + 1} is an adult,and is ${dogAge} years old`
//       );
//     } else {
//       console.log(`Dog number ${index + 1} is still puppy`);
//     }
//   });
//   console.log();
// }
// checkDogs(dogsJulia, dogsKate);
// checkDogs(dogsJulia1, dogsKate1);

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);
//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   return average;
// };
// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);
// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movementsUSD);
// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(mov * eurToUsd);
// }
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `movement ${i + 1}:you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// const withdrawals = movements.filter(x => x < 0);
// console.log(withdrawals);
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration${i}:${acc}`);
//   console.log(acc, cur);
//   return acc + cur;
// }, 100);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     console.log(acc, mov);
//     return acc;
//   } else {
//     console.log(acc, mov);
//     return mov;
//   }
// }, movements[0]);
// console.log(max);

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * eurToUsd)
//   .map((mov,i,arr) => {
//     return mov*eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
// console.log(movements);
// //equality
// console.log(movements.includes(-130));
// //condition
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);
// console.log(movements.every(mov => 0));
// console.log(account4.movements.every(mov => mov > 0));

// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arr.flat(2));

// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements) //only one level deep
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); //doesnot mutate
//return<0 , a,b
//return>0, b,a
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// console.log(movements);
// movements.sort((a, b) => {
//   a - b;
// });
// console.log(movements);
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
// movements.sort((a, b) => b - a);
// console.log(movements);
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// const x = new Array(7);
// console.log(x);
// x.fill(1, 3, 5);
// x[1] = 3;
// console.log(x);
// arr.fill(23, 4, 6);
// console.log(arr);
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 2);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   console.log(movementsUI2);
// });
//exercise 1
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .flat()
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur);

// console.log(bankDepositSum);
//2
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// console.log(numDeposits1000);

// let a = 10;
// console.log(++a);

//3
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       // return sums;
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits, withdrawals);

//4.
// const convertTitleCase = function (title) {
//   const capitzalize = str => str[0].toUpperCase() + str.slice(1);
//   const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (expections.includes(word) ? word : capitzalize(word)))
//     .join(' ');
//   return capitzalize(titleCase);
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));
////////////////////////////////////////////////////////////////////////////////////

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/
let OwnersEatTooMuch1 = [];
let OwnersEatTooLittle1 = [];
let dogsEatOkay = [];
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

let trueOrFalse = false;
let trueOrFalse1 = false;
dogs.forEach(dog => {
  dog.recommendedFood = (dog.weight ** 0.75 * 28) / 1000;
  if (dog.owners.includes('Sarah')) {
    Number(dog.curFood) / 1000 > Number(dog.recommendedFood)
      ? console.log(`${dog.owners[0]}'s dog eating too much`)
      : console.log(`${dog.owners[0]}'s dog eating too litle`);
  }
  if (Number(dog.curFood) / 1000 > Number(dog.recommendedFood)) {
    OwnersEatTooMuch1.push(dog.owners);
  } else {
    OwnersEatTooLittle1.push(dog.owners);
  }
  if (dog.recommendedFood === dog.curFood) {
    trueOrFalse = true;
  } else {
    trueOrFalse = false;
  }
  if (
    dog.recommendedFood * 0.9 < dog.curFood / 1000 &&
    dog.recommendedFood * 1.1 > dog.curFood / 1000
  ) {
    trueOrFalse1 = true;
    dogsEatOkay.push(dog);
  } else {
    trueOrFalse1 = false;
  }
});
console.log(trueOrFalse);
console.log(trueOrFalse1);
let OwnersEatTooMuch = OwnersEatTooMuch1.flat();
let OwnersEatTooLittle = OwnersEatTooLittle1.flat();
console.log(OwnersEatTooMuch.flat());
console.log(OwnersEatTooLittle.flat());
console.log(
  `${OwnersEatTooMuch[0]} and ${OwnersEatTooMuch[1]} and ${OwnersEatTooMuch[2]} dogs eat too much! ` +
    'and ' +
    `${OwnersEatTooLittle[0]} and ${OwnersEatTooLittle[1]} and ${OwnersEatTooLittle[2]} dogs eat too little!`
);
console.log(dogsEatOkay);

let dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
