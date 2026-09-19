
# Object-Oriented Programming (OOP) in JavaScript

## What is OOP?

**OOP (Object-Oriented Programming)** is a way of writing programs using **classes and objects**.

A simple way to understand OOP:

> **Class = Blueprint**  
> **Object = Real thing createda from the blueprint**

For example, a `Car` class can be a blueprint, and `car1` and `car2` can be objects created from that class.

---

# 1. Class

A **class** is a blueprint used to create objects.

### Example

```javascript
class Car {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
````

Here, `Car` is a class.

Think of it as a blueprint:

```text
Car
├── name
└── color
```

---

# 2. Object

An **object** is a real thing created from a class.

We use `new` to create an object.

```javascript
const car1 = new Car("BMW", "Black");
const car2 = new Car("Toyota", "White");
```

Now we have two objects:

```text
car1 → BMW, Black
car2 → Toyota, White
```

Both objects were created using the same `Car` class.

### Simple Definition

> **Object = an instance of a class.**

---

# 3. Constructor

The `constructor()` is a special method that runs **automatically when we create an object**.

```javascript
class Car {

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
```

When we write:

```javascript
const car1 = new Car("BMW", "Black");
```

The constructor automatically runs:

```javascript
constructor("BMW", "Black")
```

### Simple Definition

> **Constructor = A method that runs automatically when an object is created.**

---

# 4. `this`

`this` refers to the **current object**.

```javascript
class Car {

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
```

When we create:

```javascript
const car1 = new Car("BMW", "Black");
```

Then:

```javascript
this.name
```

means:

```javascript
car1.name
```

And:

```javascript
this.color
```

means:

```javascript
car1.color
```

### Simple Definition

> **`this` = the current object.**

---

# 5. Method

A **method** is a function inside a class that performs an action.

```javascript
class Car {

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    drive() {
        console.log("Car is driving");
    }
}
```

Create an object:

```javascript
const car1 = new Car("BMW", "Black");
```

Call the method:

```javascript
car1.drive();
```

Output:

```text
Car is driving
```

### Simple Definition

> **Method = A function inside a class.**

---

# 6. Inheritance

**Inheritance** means a child class can use the properties and methods of a parent class.

For example, an `Admin` is a type of `User`.

```javascript
class User {

    login() {
        console.log("User logged in");
    }
}

class Admin extends User {

    deleteUser() {
        console.log("User deleted");
    }
}
```

Create an Admin object:

```javascript
const admin = new Admin();

admin.login();
admin.deleteUser();
```

Output:

```text
User logged in
User deleted
```

`Admin` can use `login()` because it inherited it from `User`.

### Simple Definition

> **Inheritance = Child class gets features from the parent class.**

### `extends`

```javascript
class Admin extends User
```

`extends` means:

> **Admin inherits from User.**

---

# 7. `super()`

`super()` is used to call the **parent class constructor**.

```javascript
class User {

    constructor(name) {
        this.name = name;
    }
}

class Admin extends User {

    constructor(name, role) {
        super(name);
        this.role = role;
    }
}
```

Create an object:

```javascript
const admin = new Admin("Adil", "Admin");

console.log(admin.name);
console.log(admin.role);
```

Output:

```text
Adil
Admin
```

`super(name)` calls the constructor of the `User` class.

### Simple Definition

> **`super()` = Call the parent class constructor.**

---

# 8. Private Fields

Sometimes we don't want a property to be accessed directly from outside the class.

We can use `#` to make a property private.

```javascript
class BankAccount {

    #balance = 0;

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}
```

Create an account:

```javascript
const account = new BankAccount();

account.deposit(500);

console.log(account.getBalance());
```

Output:

```text
500
```

But this is not allowed:

```javascript
console.log(account.#balance);
```

### Simple Definition

> **`#` = Makes a class property private.**

---

# 9. Prototype

A **prototype** is a JavaScript mechanism used to share methods and properties between objects.

For example:

```javascript
class Car {

    drive() {
        console.log("Car is driving");
    }
}
```

The `drive()` method is stored on the class's prototype and can be shared by objects created from the class.

```javascript
const car1 = new Car();
const car2 = new Car();

car1.drive();
car2.drive();
```

Both objects can use the same `drive()` method.

### Simple Definition

> **Prototype = A mechanism JavaScript uses to share methods between objects.**

---

# 🧠 OOP Quick Summary

| Concept         | Simple Definition                         |
| --------------- | ----------------------------------------- |
| **Class**       | Blueprint for creating objects            |
| **Object**      | Real thing created from a class           |
| **Constructor** | Runs automatically when object is created |
| **`new`**       | Creates an object                         |
| **`this`**      | Refers to the current object              |
| **Method**      | Function inside a class                   |
| **Inheritance** | Child gets features from parent           |
| **`extends`**   | Used for inheritance                      |
| **`super()`**   | Calls the parent constructor              |
| **Private `#`** | Makes a property private                  |
| **Prototype**   | Used to share methods between objects     |

---

# ⭐ Complete Simple Example

Here is everything together:

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

    login() {
        console.log(`${this.name} logged in`);
    }
}

class Admin extends User {

    constructor(name, role) {
        super(name);
        this.role = role;
    }

    deleteUser() {
        console.log("User deleted");
    }
}

const admin = new Admin("Adil", "Admin");

admin.login();
admin.deleteUser();

console.log(admin.name);
console.log(admin.role);
```

Output:

```text
Adil logged in
User deleted
Adil
Admin
```

### How it works

```text
Class User
    ↓
Creates basic user structure
    ↓
Class Admin extends User
    ↓
Admin inherits User features
    ↓
new Admin(...)
    ↓
Creates admin object
```

## Remember

> **Class → Blueprint**
> **Object → Created from class**
> **Constructor → Sets initial data**
> **`this` → Current object**
> **Method → Action**
> **Inheritance → Reuse parent features**

```
```
