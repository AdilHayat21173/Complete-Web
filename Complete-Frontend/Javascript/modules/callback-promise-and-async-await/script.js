// ==========================================
// 1. SYNCHRONOUS
// ==========================================

console.log("Start");

console.log("Hello");

console.log("End");


// ==========================================
// 2. ASYNCHRONOUS
// ==========================================

console.log("Async Start");

setTimeout(() => {
    console.log("Async Task Finished");
}, 2000);

console.log("Async End");


// ==========================================
// 3. CALLBACK
// ==========================================

function greet(name, callback) {
    console.log("Hello " + name);

    callback();
}

function sayBye() {
    console.log("Goodbye");
}

// Calling the function
greet("Adil", sayBye);


// ==========================================
// 4. PROMISE
// ==========================================

let promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Promise Successful");
    } else {
        reject("Promise Failed");
    }

});

// Calling Promise
promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


// ==========================================
// 5. PROMISE WITH RANDOM NUMBER
// ==========================================

let randomPromise = new Promise((resolve, reject) => {

    setTimeout(() => {

        let number = Math.floor(Math.random() * 10);

        if (number > 5) {
            resolve("Resolved with " + number);
        } else {
            reject("Rejected with " + number);
        }

    }, 2000);

});

// Calling Promise
randomPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


// ==========================================
// 6. ASYNC / AWAIT
// ==========================================

function getData() {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve("Data received");
        }, 2000);

    });

}


// Async function
async function showData() {

    let data = await getData();

    console.log(data);
}


// Calling async function
showData();


// ==========================================
// 7. ASYNC / AWAIT WITH TRY / CATCH
// ==========================================

function getUser() {

    return new Promise((resolve, reject) => {

        let success = true;

        if (success) {
            resolve("User data received");
        } else {
            reject("Failed to get user");
        }

    });

}


async function showUser() {

    try {

        let user = await getUser();

        console.log(user);

    } catch (error) {

        console.log(error);

    }

}


// Calling function
showUser();