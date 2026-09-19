// ================================
// JavaScript Data Types
// ================================

// 1. Primitive Types
// String
let name = "Adil";

// Number
let age = 18;

// Boolean
let isStudent = true;

// Undefined
let value;

// Null
let data = null;

// BigInt
let bigNumber = 9007199254740991n;

// Symbol
let id = Symbol("id");


// ================================
// 2. Primitive - Copy by Value
// ================================

let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20


// ================================
// 3. Reference Types
// ================================

// Array
let arr = [1, 2, 3];

// Object
let person = {
    name: "Adil",
    age: 18
};

// Function
let greet = function () {
    console.log("Hello");
};


// ================================
// 4. Reference - Copy by Reference
// ================================

let x = [1, 2, 3];
let y = x;

y.push(4);

console.log(x); // [1, 2, 3, 4]
console.log(y); // [1, 2, 3, 4]


// ================================
// 5. BigInt
// ================================

console.log(Number.MAX_SAFE_INTEGER);

let big = 9007199254740991n;

console.log(big);
console.log(typeof big); // bigint


// ================================
// 6. Dynamic Typing
// ================================

let variable = 18;

console.log(variable); // 18

variable = true;

console.log(variable); // true

variable = [];

console.log(variable); // []


// ================================
// 7. Type Coercion
// ================================

console.log("5" + 1);       // "51"
console.log("5" - 1);       // 4
console.log(true + 1);      // 2
console.log(null + 1);      // 1
console.log(undefined + 1); // NaN


// ================================
// 8. Truthy and Falsy
// ================================

// Falsy values
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

// Truthy values
console.log(Boolean("0"));       // true
console.log(Boolean("false"));   // true
console.log(Boolean([]));        // true
console.log(Boolean({}));        // true


// ================================
// 9. Loose vs Strict Equality
// ================================

console.log(5 == "5");  // true
console.log(5 === "5"); // false


// ================================
// 10. typeof
// ================================

console.log(typeof "Adil");       // string
console.log(typeof 99);           // number
console.log(typeof true);         // boolean
console.log(typeof undefined);    // undefined
console.log(typeof null);         // object
console.log(typeof []);            // object
console.log(typeof {});            // object
console.log(typeof function(){}); // function
console.log(typeof NaN);           // number