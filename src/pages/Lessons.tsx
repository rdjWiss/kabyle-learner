import { Link, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'

export default function Lessons() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-amazigh-blue/10 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 border border-amazigh-blue">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-amazigh-blue hover:underline mb-6"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-6 text-amazigh-red text-center">
          📚 Kabyle Lessons
        </h2>

        <ul className="space-y-4">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-amazigh-yellow p-5 rounded-lg bg-white hover:bg-amazigh-yellow/10 transition"
            >
              <span className="text-lg font-semibold text-amazigh-blue">
                {lesson.title}
              </span>
              <div className="flex gap-3">
                <Link
                  to={`/lessons/${lesson.id}`}
                  className="px-4 py-2 text-sm font-medium bg-amazigh-green text-white rounded hover:bg-amazigh-green/80 transition"
                >
                  View Lesson
                </Link>
                <Link
                  to={`/quiz/${lesson.id}`}
                  className="px-4 py-2 text-sm font-medium bg-amazigh-red text-white rounded hover:bg-amazigh-red/80 transition"
                >
                  Take Quiz
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
