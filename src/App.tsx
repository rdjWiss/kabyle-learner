import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import QuizPage from './pages/Quiz'
import NotFound from './pages/NotFound'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/lessons" element={<Lessons />} />
			<Route path="/lessons/:id" element={<LessonDetail />} />
			<Route path="/quiz/:id" element={<QuizPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default App
