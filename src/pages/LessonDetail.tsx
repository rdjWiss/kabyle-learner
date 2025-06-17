import { useParams, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'

export default function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessons.find((l) => l.id === id)

  if (!lesson) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-4 text-center text-red-500">
        Lesson not found.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

      <h3 className="text-xl font-semibold mb-2">Vocabulary</h3>
      <ul className="mb-6 space-y-1 list-disc list-inside text-gray-800">
        {lesson.vocab.map((word, idx) => (
          <li key={idx}>
            <span className="font-medium">{word.kabyle}</span> – {word.english}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Examples</h3>
      <ul className="space-y-1 list-disc list-inside text-gray-800">
        {lesson.examples.map((ex, idx) => (
          <li key={idx}>{ex}</li>
        ))}
      </ul>
    </div>
  )
}
