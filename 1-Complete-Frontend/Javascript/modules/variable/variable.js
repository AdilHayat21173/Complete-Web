// var,let,const

// var a; //declaration
var x = 5; //intailization  
let y = 10; 
const z = 15; 

// block scope 
{
    let k=23;
}

// function scope 
function test(){
    var a = 10;
    let b = 20;
    const c = 30;
    console.log(a);
    console.log(b);
    console.log(c);
}


// reassignment, redeclaration
// in javascript, we can reassign and redeclare variables declared with var, but we cannot redeclare variables declared with let and const.
var x = 20; //reassignment
x = 30; //reassignment

var x = 40; //redeclaration
var x = 50; //redeclaration

let y = 20; //reassignment
y = 30; //reassignment

// let y = 40; //redeclaration (this will throw an error) 



if(true){
    var a=9;
    let b=10;
}
console .log(a) //it give 9
console .log(b)  //it give error because b is block scope variable and it is not accessible outside the block and var is function scope variable and it is accessible outside the block.


const person ={name:"John",age:30};
person.name="Doe"; //this is allowed because we are not reassigning the variable, we are changing the property of the object.
person={name:"Jane",age:25}; //this is not allowed because we are reassigning the variable.