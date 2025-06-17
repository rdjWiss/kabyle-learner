import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Go to Home
      </Link>
    </div>
  )
}
