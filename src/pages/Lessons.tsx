import { Link, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'

export default function Lessons() {
  const navigate = useNavigate()

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">All Lessons</h2>

      <ul className="space-y-3">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="flex justify-between items-center border p-4 rounded hover:bg-gray-50">
            <span className="font-medium">{lesson.title}</span>
            <div className="space-x-4">
              <Link
                to={`/lessons/${lesson.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
              <Link
                to={`/quiz/${lesson.id}`}
                className="text-green-600 hover:underline"
              >
                Quiz
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
