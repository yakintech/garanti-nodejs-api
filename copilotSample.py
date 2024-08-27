# generate a random password with 8 characters ( 4 letters, 2 numbers, 2 special characters)

import random
import string

def generate_password():
    password = []
    password.extend(random.choices(string.ascii_letters, k=4))
    password.extend(random.choices(string.digits, k=2))
    password.extend(random.choices(string.punctuation, k=2))
    random.shuffle(password)
    return ''.join(password)

print(generate_password())

# Output: 7!bD3aA


# var randomNumbers2 = [];
# while (randomNumbers2.length < 5) {
#     var randomNumber = Math.floor(Math.random() * 100) + 1;
#     if (randomNumbers2.indexOf(randomNumber) === -1) {
#         randomNumbers2.push(randomNumber);
#     }
# }

# console.log(randomNumbers2);

#convert to python

import random

randomNumbers2 = []
while len(randomNumbers2) < 5:
    randomNumber = random.randint(1, 100)
    if randomNumber not in randomNumbers2:
        randomNumbers2.append(randomNumber)

print(randomNumbers2)

# Output: [23, 45, 67, 89, 12]



