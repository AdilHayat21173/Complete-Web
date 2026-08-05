// selection of element by id 
let abc= document.getElementById('heading');
console.log(abc);


// selection of element by class name
let xyz= document.getElementsByClassName('heading1');
console.log(xyz);

// query by selector  i have three h1 and same class name it take first one and ignore other
let pqr= document.querySelector('h2');
console.log(pqr);

// query selector all it will take all the element with same class name
let lmn= document.querySelectorAll('h2');
console.log(lmn);

// Text Manipulation
// inner text change the text and outer text change the text innerhtml and outer html change the html content of the element 
let text= document.getElementById('text');
// text.outerText= "This is outer text";
console.dir(text);
text.outerHTML= "<i> This is outer text </i>";

// set attrubute
let a=document.querySelector('a');
a.href= "https://www.google.com";
// or
a.setAttribute('href', 'https://www.google.com');

let img= document.querySelector('img');
// img.src= "https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8";

// or 
img.setAttribute('src', 'https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8');

// get attribute 
let get= img.getAttribute('src');
console.log(get);

// getremove
// let remove= img.removeAttribute('src');
// console.log(remove);
// or 
let  remove =document.querySelector('img')
remove.removeAttribute('alt');

// Create Element
// append /prepand 
let h1 = document.createElement('h1');

h1.textContent = "This is h1 tag";
console.log(h1);

// document.body.prepend(h1); // come on top
document.querySelector('body').prepend(h1);


let h2= document.createElement('h2');
h2.textContent= "This is h2 tag";
console.log(h2);

document.querySelector('div').append(h2); // come on bottom

// through javascript change style of element 
// color background etc 
// add class also 
let style= document.querySelector('h1');
style.style.color= "red";

// class remove
//  hulu is the class name we add the style in html
style.classList.remove('hulu');
style.classList.add('hulu1');
