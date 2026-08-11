
function CreatePencil(name, price, color, company) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.company = company;

    this.write = function () {
        let h1 = document.createElement("h1");

        h1.textContent = "Hey How Are You";
        h1.style.color = color;

        document.body.append(h1);
    };
}



let pencil1= new CreatePencil("Pencil", 100,"red","Dollar")

// another method 
function CreatePen(name, price, color, company) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.company = company;

    
}
CreatePen.prototype.writepen = function (text) {
        let h1 = document.createElement("h1");

        h1.textContent = text;
        h1.style.color = this.color;

        document.body.append(h1);
    };


let pen1= new CreatePen("Pencil", 100,"red","Dollar")



//inheritance
// Parent Class
class User {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    login() {
        console.log(this.name + " is logged in");
    }
}


// Child Class
class Admin extends User {

    constructor(name, age, role) {
        super(name, age);
        this.role = role;
    }

    deleteUser() {
        console.log(this.name + " deleted a user");
    }
}


// Create Admin Object
let admin1 = new Admin("Adil", 24, "Admin");


// Parent method
admin1.login();

// Child method
admin1.deleteUser();

console.log(admin1.name);
console.log(admin1.age);
console.log(admin1.role);