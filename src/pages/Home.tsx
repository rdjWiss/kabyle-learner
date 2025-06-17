import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Kabyle Learner</h1>
        <Link
          to="/lessons"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Start Learning
        </Link>
      </div>
    </div>
  )
}
