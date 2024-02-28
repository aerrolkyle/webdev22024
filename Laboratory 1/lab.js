// Number 1
function isOdd(number) {
    return new Promise((resolve, reject) => {
        if (number % 2 !== 0) {
            resolve(true);
        } else {
            reject(false);
        }
    });
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
    isOdd(numbers[i])
        .then((result) => {
            console.log(numbers[i] + ' is odd.');
        })
        .catch((error) => {
        });
}

// Number 2
function getRandomCharacter() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const randomIndex = Math.floor(Math.random() * characters.length);
            const randomCharacter = characters.charAt(randomIndex);
            resolve(randomCharacter);
        }, 500);
    });
}

async function printRandomCharacter() {
    try {
        const randomChar = await getRandomCharacter();
        console.log('Random Character:', randomChar);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

printRandomCharacter();

//Number 3
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Random data could not be fetched.");
        }, 500);
    });
}

async function reject() {
    try {
        await getData();
    } catch (error) {
        console.log(error);
    }
}

reject();

//Number 4
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
      resolve(randomCharacter);
    }, 500);
  });
}

async function rejectResolve() {
  return new Promise(async (resolve, reject) => {
    let attempts = 0;

    const attemptOperation = (isResolve) => {
      setTimeout(async () => {
        try {
          const result = await getData();
          console.log(isResolve ? 'Resolved:' : 'Rejected:', result);

          if (isResolve) {
            resolve(result);
          } else {
            reject('Operation failed. Promise rejected.');
          }
        } catch (error) {
          attempts++;
          if (attempts < 2) {
            console.error('Attempt', attempts, 'failed. Retrying...');
            attemptOperation(isResolve);
          } else {
            reject('Maximum attempts reached. Promise rejected.');
          }
        }
      }, 500);
    };

    attemptOperation(false); // Reject
    attemptOperation(true);  // Resolve
  });
}

rejectResolve()
  .then((data) => {
    console.log('Final Resolved:', data);
  })
  .catch((error) => {
    console.error('Final Rejected:', error);
  });