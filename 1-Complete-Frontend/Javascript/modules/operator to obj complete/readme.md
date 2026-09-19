# JavaScript Learning — Chapters 3 to 8

## Chapter 3: Operators

Operators are used to perform calculations, comparisons, and logic.

### Arithmetic

```js
+  -  *  /  %  **
```

### Comparison

```js
==   // value comparison
===  // value + type
!=
!==
>
<
>=
<=
```

### Logical

```js
&&   // AND
||   // OR
!    // NOT
```

### Other

```js
=    // assignment
+=
-=
++
--
typeof
? :  // ternary
```

Use `===` instead of `==` in most cases.

---

## Chapter 4: Control Flow

Control flow decides which code should run.

```js
if (condition) {
    
} else if (condition) {
    
} else {
    
}
```

### Switch

```js
switch (value) {
    case 1:
        break;
    default:
        break;
}
```

Use `break` to stop a case.

---

## Chapter 5: Loops

Loops repeat code.

### for

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

### while

```js
while (condition) {
    // code
}
```

### do while

```js
do {
    // code
} while (condition);
```

### Useful loops

```js
for (const value of array) {
    console.log(value);
}

for (const key in object) {
    console.log(key);
}
```

`break` stops a loop.
`continue` skips the current iteration.

---

## Chapter 6: Functions

Functions contain reusable code.

```js
function add(a, b) {
    return a + b;
}
```

### Arrow Function

```js
const add = (a, b) => a + b;
```

### Default Parameter

```js
function greet(name = "User") {
    console.log(`Hello ${name}`);
}
```

### Rest Parameter

```js
function sum(...numbers) {
    return numbers;
}
```

JavaScript functions can be stored in variables and passed to other functions.

---

## Chapter 7: Arrays

Arrays store multiple values.

```js
const numbers = [10, 20, 30, 40];
```

### Common Methods

```js
push()       // add at end
pop()        // remove from end
shift()      // remove from start
unshift()    // add at start
slice()      // copy/extract
splice()     // add/remove
```

### Important Methods

```js
map()        // create new array
filter()     // filter values
reduce()     // create one result
find()       // find first match
forEach()    // run function for each item
```

Example:

```js
const numbers = [1, 2, 3, 4];

const even = numbers.filter(n => n % 2 === 0);
```

---

## Chapter 8: Objects

Objects store data using key-value pairs.

```js
const student = {
    name: "Adil",
    age: 22,
    city: "Peshawar"
};
```

### Access

```js
student.name;
student["name"];
```

### Destructuring

```js
const { name, age } = student;
```

### Spread

```js
const newStudent = {
    ...student,
    grade: "A"
};
```

### Object Methods

```js
Object.keys()
Object.values()
Object.entries()
```

### Optional Chaining

```js
student?.address?.city;
```

It safely accesses nested properties without throwing an error when something is missing.

---

## Key Things to Remember

* Use `===` instead of `==`
* Use `const` by default and `let` when the value changes
* Use `for...of` for array values
* Use `for...in` for object keys
* Learn `map()`, `filter()`, and `reduce()` well
* Objects store structured data
* Functions are values in JavaScript
* Spread and destructuring are very common in modern JavaScript
