

//generate 10 Turkey cities
var cities = ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Gaziantep", "Konya", "Antalya", "Mersin", "Kayseri"];

//generate 20 countries
var countries = ["Turkey", "Germany", "France", "Italy", "Spain", "Portugal", "Greece", "Russia", "Ukraine", "United Kingdom", "Netherlands", "Belgium", "Austria", "Switzerland", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Czech Republic"];

//generate 5 uniq random numbers between 1-100. use for loop
var randomNumbers = [];
for (var i = 0; i < 5; i++) {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumbers.indexOf(randomNumber) === -1) {
        randomNumbers.push(randomNumber);
    }
}

//generate 5 uniq random numbers between 1-100. use while loop
var randomNumbers2 = [];
while (randomNumbers2.length < 5) {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumbers2.indexOf(randomNumber) === -1) {
        randomNumbers2.push(randomNumber);
    }
}

//How to get screen size with javascript
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;

// generate a random hex color code
var randomColor = Math.floor(Math.random() * 16777215).toString(16);

//write a function to check if a number is even or odd
function isEven(number) {
    return number % 2 === 0;
}

//convert a string to title case ( capitalize the first letter of each word)
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

toTitleCase("hello world"); // Hello World
toTitleCase("HELLO WORLD"); // Hello World


//her kıtadan sadece bir şehir olacak şekilde string bir dizi oluşturun. Örneğin Avrupa'dan sadece Paris. Asya'dan sadece Tokyo gibi.
var citiesByContinent = ["Paris", "Tokyo", "New York", "Sydney", "Cape Town", "Rio de Janeiro"];

//generate a random password with 8 characters ( 4 letters, 2 numbers, 2 special characters)
function generatePassword() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var numbers = "0123456789";
    var specialChars = "!@#$%^&*()_+";
    var password = "";
    for (var i = 0; i < 4; i++) {
        password += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (var i = 0; i < 2; i++) {
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    for (var i = 0; i < 2; i++) {
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    }
    return password;
}

// output: "aBcD1234!@"

//generate products object array. fields: id, name, price, stock, category
var products = [
    { id: 1, name: "Ürün 1", price: Math.floor(Math.random() * 1000) + 1, stock: 20, category: "Kategori 1" },
    { id: 2, name: "Ürün 2", price: Math.floor(Math.random() * 1000) + 1, stock: 40, category: "Kategori 2" },
    { id: 3, name: "Ürün 3", price: Math.floor(Math.random() * 1000) + 1, stock: 60, category: "Kategori 3" },
    { id: 4, name: "Ürün 4", price: Math.floor(Math.random() * 1000) + 1, stock: 80, category: "Kategori 4" },
    { id: 5, name: "Ürün 5", price: Math.floor(Math.random() * 1000) + 1, stock: 100, category: "Kategori 5" },
];


//Ho to catch mouse position with javascript
document.addEventListener("mousemove", function (event) {
    var x = event.clientX;
    var y = event.clientY;
    console.log(x, y);
});



