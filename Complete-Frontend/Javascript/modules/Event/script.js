// Add event listener AND REMOVE EVENT LISTENER
// click
let h1 =document.querySelector('h1');
h1.addEventListener('click', function() {
    h1.style.color = 'red';
});

// Double click

let p = document.querySelector('p');

function dbclick() {
    p.style.color = 'green';
}
p.addEventListener('dblclick', dbclick);

// REMOVE LISTERNER    
p.removeEventListener('dblclick', dbclick);

//input in every event listener we receiveor accept data in function 
// let input = document.querySelector('input');
// input.addEventListener('input', function() {
//     console.log("types");
// });

let inp=document.querySelector("input");
inp.addEventListener("input",function(e){
    if(e.data !== null){
        console.log(e.data);
    }   

});

//change event listener


let sel=document.querySelector("select");
let device=document.querySelector("#device");
// go to console and check which one are selected 

sel.addEventListener("change",function(e){
    // device.textContent="Device Selected";
    device.textContent=`${e.target.value} Device selected`;
    // console.log(e.target.value);
   
    // check the type of event
    // console.log(e.type);

});

//  window event listener
let h2 =document.querySelector('h2');

window.addEventListener("keydown",function(e){
    // console.log(`Key pressed is ${e.key}`);
    if(e.key === " "){
        h2.textContent="SPC";

    }else{
        h2.textContent=e.key;
    }

}
);

// input file event listener instead of bydefault input types ww make itself
let btn= document.querySelector("#btn");
let fileinp=document.querySelector("#fileinp");

btn.addEventListener("click",function(){
    fileinp.click();
}
);

fileinp.addEventListener("change",function(e){
    // console.log(e.target.files[0].name); 

    const file=e.target.files[0];
    if(file){
        btn.textContent=file.name;

    }

});

// we submit the form but nor reload the page we use preventDefault() method to prevent the default behaviour of the form

// let form=document.querySelector("form");
// form.addEventListener("submit",function(e){
//     e.preventDefault();
//     console.log("Form Submitted");
// });




// change the form to the card  above code make the remove
let form = document.querySelector("#form");
let cards = document.querySelector("#cards");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    let email = document.querySelector("#email").value;
    let file = document.querySelector("#profile-pic").files[0];

    let imageURL = URL.createObjectURL(file);

    cards.innerHTML = `
        <div class="card">
            <div class="profile">
                <img src="${imageURL}" alt="Profile Picture">
            </div>

            <h2>${name}</h2>
            <p>Age: ${age}</p>
            <p>Email: ${email}</p>
        </div>
    `;

    form.reset();
});


// mouse channge color
let box = document.querySelector("#box");

box.addEventListener("mouseover", function () {
    box.style.backgroundColor = "yellow";
});

box.addEventListener("mouseout", function () {
    box.style.backgroundColor = "red";
});


// if we move the mouse the box are also moving 
// window.addEventListener("mousemove",function(data){
//     box.style.top=data.clientY + "px";
//     box.style.bottom=data.clientY + "px";
//     box.style.left=data.clientX + "px";
//     box.style.right=data.clientX + "px";

// });

// Event Bubbling
document.querySelector("#nav1").addEventListener("click",function(){alert("Clicked")});



// if we click the line appear on text and we check again remove 

let ul = document.querySelector("ul");


// click on text come line above on text 
// ul.addEventListener("click", function(data) {
//     data.target.classList.add("lt");
// });

// we click on text line occur and we click again go 

ul.addEventListener("click", function(data) {
    data.target.classList.toggle("lt");
});