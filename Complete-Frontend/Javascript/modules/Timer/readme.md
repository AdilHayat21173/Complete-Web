# Timers and Intervals

JavaScript provides timers to run code **after a delay** or **repeatedly after a fixed time**.

---

## `setTimeout()`

Runs a function **once after a specific time**.

```javascript
setTimeout(() => {
    console.log("Hello");
}, 3000);

```

*Runs after 3 seconds.*

---

## `clearTimeout()`

Cancels a `setTimeout()`.

```javascript
let timer = setTimeout(() => {
    console.log("Hello");
}, 3000);

clearTimeout(timer);

```

---

## `setInterval()`

Runs a function **repeatedly after a fixed time**.

```javascript
setInterval(() => {
    console.log("Hello");
}, 1000);

```

*Runs every 1 second.*

---

## `clearInterval()`

Stops an interval.

```javascript
let timer = setInterval(() => {
    console.log("Hello");
}, 1000);

clearInterval(timer);

```

---

## `setInterval()` vs `setTimeout()` Recursion

### `setInterval()`

`Run → Wait → Run → Wait → Run`

### `setTimeout()` Recursion

```javascript
function run() {
    console.log("Hello");

    setTimeout(run, 1000);
}

run();

```

`Run → Wait → Run → Wait → Run`

---

##  Real-World Uses

Timers are commonly used for:

* Countdown timers
* Auto-refresh
* Delaying UI actions
* Showing/hiding messages
* Notifications
* Download progress

### Example: Auto-hide Alert

```javascript
setTimeout(() => {
    alertBox.style.display = "none";
}, 3000);

```

*The alert disappears after 3 seconds.*

---

## 🧪 Practice

1. Create a countdown timer.
2. Create an alert banner that automatically hides after 3 seconds.
3. Create a timer that prints numbers every second.
4. Create a download progress bar from 0% to 100%.

---

## 🧠 Remember

| Function | Purpose |
| --- | --- |
| `setTimeout()` | Run once after a delay |
| `clearTimeout()` | Cancel a timeout |
| `setInterval()` | Run repeatedly |
| `clearInterval()` | Stop an interval |