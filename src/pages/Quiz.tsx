import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { lessons } from '../data/lessons'
import { useNavigate } from 'react-router-dom'

const TIMER = 20 // seconds

export default function QuizPage() {
	const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const lesson = lessons.find(l => l.id === id)
	const vocab = lesson?.vocab ?? []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timer, setTimer] = useState(TIMER)
	const [answerLocked, setAnswerLocked] = useState(false)

	useEffect(() => {
		if (selectedAnswer !== null || showResult || currentIndex >= vocab.length || answerLocked) return
	
		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev <= 1) {
					clearInterval(interval)
					handleAnswer(null) // 🔥 Time's up
					return 0           // ✅ Show "0s" before next question
				}
				return prev - 1
			})
		},  TIMER * 100)
	
		return () => clearInterval(interval)
	}, [selectedAnswer, currentIndex, showResult, answerLocked])

  const currentItem = vocab[currentIndex]

  const options = useMemo(() => {
		if (!currentItem) return []

    const correct = currentItem.english
    const wrong = vocab
      .map(v => v.english)
      .filter(e => e !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    const all = [...wrong, correct].sort(() => 0.5 - Math.random())
    return all
  }, [currentItem?.english, vocab])

	if (!lesson || vocab.length === 0) {
		return <p>Lesson not found or empty.</p>
	}

	const handleAnswer = (answer: string | null) => {
		if (answerLocked) return // ✅ prevent double triggers
		setAnswerLocked(true)
	
		const current = vocab[currentIndex]
		if (!current) return
	
		const isCorrect = answer === current.english
		setSelectedAnswer(answer)
		if (isCorrect) setScore((s) => s + 1)
	
		setTimeout(() => {
			const next = currentIndex + 1
			if (next < vocab.length) {
				setCurrentIndex(next)
				setSelectedAnswer(null)
				setTimer(TIMER)
				setAnswerLocked(false)
			} else {
				setShowResult(true)
			}
		}, TIMER * 100)
	}

  const resetQuiz = () => {
		setCurrentIndex(0)
		setScore(0)
		setSelectedAnswer(null)
		setShowResult(false)
		setTimer(TIMER)
		setAnswerLocked(false)
	}

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
			<button
				onClick={() => navigate(-1)}
				className="mb-4 text-sm text-blue-600 hover:underline"
			>
				← Back
			</button>
      <h2 className="text-2xl font-semibold mb-4 text-center">Quiz: {lesson.title}</h2>

      {showResult ? (
        <div className="text-center">
          <p className="text-lg mb-4">You scored <strong>{score}</strong> out of <strong>{vocab.length}</strong></p>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Question {currentIndex + 1} / {vocab.length}</p>
            <p className="text-red-500 font-mono">
							{timer > 0 ? `⏱ ${timer}s` : '⏱ Time’s up!'}
						</p>
          </div>

          <p className="text-lg mb-4">
            What does <span className="font-bold">"{currentItem?.kabyle ?? ''}"</span> mean?
          </p>

          <div className="grid grid-cols-1 gap-4">
            {options.map((opt, idx) => {
              const isCorrect = opt === currentItem?.english
              const isSelected = selectedAnswer === opt
              let bg = "bg-gray-100"

              if (selectedAnswer) {
                if (isCorrect) bg = "bg-green-200"
                else if (isSelected) bg = "bg-red-200"
              }

              return (
                <button
                  key={idx}
                  disabled={!!selectedAnswer}
                  onClick={() => handleAnswer(opt)}
                  className={`${bg} border px-4 py-2 rounded text-left hover:bg-gray-200 transition disabled:opacity-70`}
                >
                  {opt}
                  {selectedAnswer !== null && isCorrect && " ✅"}
									{selectedAnswer !== null && isSelected && !isCorrect && " ❌"}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
