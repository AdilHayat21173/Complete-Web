let count = 0;
let seconds = 5;

let progress = document.querySelector(".progress-bar");
let percentText = document.querySelector("#percentText");

let intv = setInterval(function () {

    if (count <= 99) {

        count++;

        progress.style.width = `${count}%`;
        percentText.textContent = `${count}%`;

    } else {

        document.querySelector("h2").textContent = "Downloaded.";

        clearInterval(intv);
    }

}, (seconds * 1000) / 100);