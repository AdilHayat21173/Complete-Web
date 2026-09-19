// Chapter 3: Operators

let a = 10;
let b = 5;

console.log(a + b);
console.log(a > b);
console.log(a === 10);

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";

console.log(status);


// Chapter 4: Control Flow

let marks = 85;

if (marks >= 90) {
    console.log("A");
} else if (marks >= 80) {
    console.log("B");
} else {
    console.log("Fail");
}


// Chapter 5: Loops

for (let i = 1; i <= 5; i++) {
    console.log(i);
}

const numbers = [10, 20, 30];

for (const number of numbers) {
    console.log(number);
}


// Chapter 6: Functions

function add(x, y) {
    return x + y;
}

console.log(add(10, 20));

const multiply = (x, y) => x * y;

console.log(multiply(5, 4));


// Chapter 7: Arrays

const nums = [1, 2, 3, 4, 5];

const doubled = nums.map(n => n * 2);

const even = nums.filter(n => n % 2 === 0);

const total = nums.reduce((sum, n) => sum + n, 0);

console.log(doubled);
console.log(even);
console.log(total);


// Chapter 8: Objects

const student = {
    name: "Adil",
    age: 22,
    skills: ["Python", "C++", "JavaScript"]
};

console.log(student.name);

const { name, age: studentAge } = student;

console.log(name);
console.log(studentAge);

const updatedStudent = {
    ...student,
    city: "Peshawar"
};

console.log(updatedStudent);