import { useParams, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'

export default function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessons.find((l) => l.id === id)

  if (!lesson) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 text-center text-amazigh-red font-semibold bg-white border border-amazigh-red rounded shadow">
        Lesson not found.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amazigh-blue/10 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 border border-amazigh-blue">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-amazigh-blue hover:underline mb-6"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-amazigh-red">
          📖 {lesson.title}
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-amazigh-green">Vocabulary</h3>
          <ul className="space-y-2 text-gray-800">
            {lesson.vocab.map((word, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-amazigh-blue font-medium">{word.kabyle}</span>
                <span>–</span>
                <span>{word.english}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-amazigh-green">Examples</h3>
          <ul className="space-y-2 text-gray-800">
            {lesson.examples.map((ex, idx) => (
              <li key={idx} className="pl-4 border-l-4 border-amazigh-yellow">
                {ex}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
