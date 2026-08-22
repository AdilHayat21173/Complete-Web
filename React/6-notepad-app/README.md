# 📝 Notepad App

A simple and responsive **Notepad App** built with **React.js** and **Tailwind CSS**.

This project allows users to create notes by entering a **title** and **details**. The notes are displayed as cards on the right side of the application.

## 📸 Project Screenshot

![Notepad App]!(./src/assets/project.png)

## 🚀 Features

- Add a new note
- Enter note title
- Enter note details
- Display notes dynamically
- Delete button for notes
- Responsive layout
- Styled using Tailwind CSS
- Uses React state for managing notes

## 🛠️ Technologies Used

- React.js
- JavaScript
- Tailwind CSS
- Vite
- HTML

## ⚛️ React Concepts Used

### useState

`useState` is used to manage the title, details, and notes array.

```js
const [title, settitle] = useState('')
const [detail, setdetail] = useState('')
const [task, settask] = useState([])
```

### Form Handling

The form uses `onSubmit` to handle adding a new note.

```js
const SubmitHandler = (e) => {
  e.preventDefault()

  const copytask = [...task]

  copytask.push({
    title,
    detail
  })

  settask(copytask)

  settitle('')
  setdetail('')
}
```

### Rendering Notes

The `map()` method is used to display each note as a card.

```js
{task.map((elem, idx) => {
  return (
    <div key={idx}>
      <h3>{elem.title}</h3>
      <p>{elem.detail}</p>
    </div>
  )
})}
```

## 📂 Project Structure

```
notepad-app/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── project.png
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Go to the project folder:

```bash
cd notepad-app
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## 📚 What I Learned

While building this project, I practiced:

- React components
- useState
- Controlled inputs
- Two-way data binding
- Form submission
- Event handling
- Arrays and objects
- JavaScript map()
- Dynamic rendering
- Tailwind CSS
- Responsive design

## 👨‍💻 Author

**Adil Hayat**

Software Engineer | AI Engineer | Web Developer
