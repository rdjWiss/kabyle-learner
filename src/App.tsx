import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import QuizPage from './pages/Quiz'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/lessons/:id" element={<LessonDetail />} />
      <Route path="/quiz/:id" element={<QuizPage />} />
    </Routes>
  )
}

export default App
