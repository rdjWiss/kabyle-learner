# Kabyle Learner

A simple web app for studying and revising the Kabyle language (North Africa), built with React, Vite, TypeScript, and Tailwind CSS.

🔗 **Live site**: [kabyle-learner on GitHub Pages](https://your-username.github.io/kabyle-learner/)

---

## 🚀 Features

- 📚 Browse lessons with vocabulary and example phrases
- ✅ Take interactive quizzes with feedback and score tracking
- ⏱ Timer-based questions
- 🔁 Retry quizzes with new random questions
- ⛔ Stop quiz anytime
- 🔊 Sound effects for correct and wrong answers
- 🎨 Clean UI using Tailwind CSS with Amazigh theme colors
- 📱 Mobile-friendly layout
- 🧭 Routing with React Router
- 🚫 404 page for unmatched routes

---

## 💪 Tech Stack

- [Vite](https://vite.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/kabyle-learner.git
cd kabyle-learner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at: `http://localhost:5173/`

---

## 🧺 Project Structure

```
src/
├── assets/           # Static assets (e.g. sound effects)
├── components/       # (optional shared components)
├── data/             # Static lesson data (vocab + examples)
│   └── lessons.ts
├── pages/
│   ├── Home.tsx
│   ├── Lessons.tsx
│   ├── LessonDetail.tsx
│   ├── Quiz.tsx
│   └── NotFound.tsx
├── App.tsx
├── main.tsx
└── index.css         # Tailwind CSS + color definitions
```

---

## 🎨 Custom Styling

Tailwind theme colors were extended via CSS variables in `index.css`:

```css
@import "tailwindcss";

@theme {
  --color-amazigh-blue: #0091db;
  --color-amazigh-green: #79bf1a;
  --color-amazigh-yellow: #ffd700;
  --color-amazigh-red: #d0004b;
}
```

Then used in Tailwind classes like `bg-amazigh-blue`, `text-amazigh-green`, etc.

---

## 📚 Add More Lessons

Edit `src/data/lessons.ts` and add to the array like this:

```ts
{
  id: "greetings",
  title: "Greetings",
  vocab: [
    { kabyle: "Azul", english: "Hello" },
    // ...
  ],
  examples: [
    "Azul fell-awen — Hello everyone",
    // ...
  ]
}
```

---

## 📝 License

MIT — free to use, modify, and share.

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to improve the app or add content, feel free to fork and submit.

