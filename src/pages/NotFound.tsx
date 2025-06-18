import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-amazigh-blue/10 px-4">
			<div className="bg-white border border-amazigh-red p-10 rounded-xl shadow-md text-center max-w-md w-full">
				<h1 className="text-4xl font-bold mb-4 text-amazigh-red">404</h1>
				<p className="text-lg text-gray-700 mb-4">Page Not Found</p>
				<p className="mb-6 text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
				<Link
					to="/"
					className="inline-block bg-amazigh-yellow text-black font-semibold px-6 py-2 rounded hover:bg-amazigh-green transition duration-200"
				>
					Go Home
				</Link>
			</div>
		</div>
	)
}
