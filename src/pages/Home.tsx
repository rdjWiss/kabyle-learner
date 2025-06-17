import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amazigh-blue/10 px-4">
      <div className="bg-white border border-amazigh-yellow p-10 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-amazigh-red">
          Welcome to Kabyle Learner
        </h1>
        <p className="text-gray-600 mb-6">
          Learn the Kabyle language through lessons and quizzes.
        </p>
        <Link
          to="/lessons"
          className="inline-block bg-amazigh-yellow text-black font-semibold hover:bg-amazigh-green px-6 py-3 rounded transition duration-200"
        >
          Start Learning
        </Link>
      </div>
    </div>
  )
}
