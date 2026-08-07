# JavaScript Browser Storage

JavaScript provides different ways to store data in the browser.

## 1. Local Storage

`localStorage` stores data in the browser and keeps it even after the browser is closed.

### Add / Update

```javascript
localStorage.setItem("username", "Adil");
```

### Get

```javascript
localStorage.getItem("username");
```

### Remove

```javascript
localStorage.removeItem("username");
```

### Remove All

```javascript
localStorage.clear();
```

---

## 2. Session Storage

`sessionStorage` works like `localStorage`, but the data is available only for the current browser tab/session.

### Add / Update

```javascript
sessionStorage.setItem("username", "Adil");
```

### Get

```javascript
sessionStorage.getItem("username");
```

### Remove

```javascript
sessionStorage.removeItem("username");
```

### Remove All

```javascript
sessionStorage.clear();
```

---

## 3. Cookies

Cookies are small pieces of data stored by the browser. They can also be sent to the server with HTTP requests.

### Add / Save

```javascript
document.cookie = "username=Adil";
```

### Get

```javascript
console.log(document.cookie);
```

### Update

```javascript
document.cookie = "username=Ahmed";
```

### Set Expiry

```javascript
document.cookie = "username=Adil; max-age=604800";
```

`604800` seconds = **7 days**.

### Delete

```javascript
document.cookie = "username=; max-age=0";
```

---

## Quick Comparison

| Storage          | Add / Update      | Get               | Delete         |
| ---------------- | ----------------- | ----------------- | -------------- |
| `localStorage`   | `setItem()`       | `getItem()`       | `removeItem()` |
| `sessionStorage` | `setItem()`       | `getItem()`       | `removeItem()` |
| Cookies          | `document.cookie` | `document.cookie` | `max-age=0`    |

## Main Difference

* **localStorage** → Data stays until manually deleted.
* **sessionStorage** → Data is removed when the tab/session ends.
* **Cookies** → Small data that can have an expiry time and can be sent to the server.
