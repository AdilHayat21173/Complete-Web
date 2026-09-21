# 📸 Full-Stack Post App

A full-stack social post application built with **React, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, Multer, and ImageKit**.

## 📖 About the Project

Full-Stack Post App lets users share photo posts. A user can upload an image, add a caption, and publish it. Every post then appears in a responsive grid where all uploaded images and captions can be browsed.

The project is split into two independent parts that communicate over HTTP:

- **Frontend:** A React app (built with Vite and styled with Tailwind CSS) that provides a Home page, a View Posts page, and a Create Post page. It uses Axios to talk to the backend and `FormData` to send images.
- **Backend:** A Node.js and Express REST API that receives uploads with Multer, stores the image on ImageKit, and saves the post to MongoDB using Mongoose.

**How the data is stored:** MongoDB does not store the image itself. The image file is uploaded to ImageKit, which returns a public URL. MongoDB then stores only that URL together with the caption. This keeps the database small and lets images load quickly from ImageKit's CDN.

**Why this stack:** React and Tailwind make it fast to build a clean, responsive interface. Express keeps the API simple, MongoDB fits flexible post data, Multer handles file uploads, and ImageKit takes care of image storage and delivery.

The project is a practical example of full-stack fundamentals: REST APIs, file uploads, cloud storage, database modeling, CORS, environment variables, and frontend–backend separation.

## 🚀 Features

- Create posts with an image and caption
- View all posts in a responsive grid
- Images stored on ImageKit, post data stored in MongoDB
- REST API with Express and Mongoose

## 🛠️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Axios
**Backend:** Node.js, Express, MongoDB, Mongoose, Multer, ImageKit, dotenv, CORS

## 📁 Project Structure

```text
Complete-Post-App/
├── backend/
│   ├── src/
│   │   ├── db/db.js
│   │   ├── models/post.model.js
│   │   ├── services/storage.service.js
│   │   └── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/ (App.jsx, main.jsx, index.css)
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

> Never commit `.env` — add it and `node_modules` to `.gitignore`.

```bash
node server.js   # runs on http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # runs on http://localhost:5173
```

## 🔗 API

| Method | Endpoint | Description                                          |
| ------ | -------- | ---------------------------------------------------- |
| POST   | `/posts` | Create a post (`multipart/form-data`: `image`, `caption`) |
| GET    | `/posts` | Get all posts                                        |

Example response (`GET /posts`):

```json
{
  "message": "Posts fetched successfully",
  "posts": [
    {
      "_id": "66abc123",
      "image": "https://ik.imagekit.io/example/image.jpg",
      "caption": "My first post"
    }
  ]
}
```

## 🔄 How It Works

```text
React (FormData) → Axios POST /posts → Express → Multer → ImageKit → MongoDB (URL + caption)
```


## 👨‍💻 Author

**Adil Hayat** — Software Engineer | AI Engineer