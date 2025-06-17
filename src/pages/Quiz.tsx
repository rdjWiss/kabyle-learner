import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { lessons } from '../data/lessons'
import { useNavigate } from 'react-router-dom'

const TIMER = 10 // seconds

export default function QuizPage() {
	const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const lesson = lessons.find(l => l.id === id)
	const [quizVocab, setQuizVocab] = useState(() => generateQuizVocab())

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timer, setTimer] = useState(TIMER)
	const [answerLocked, setAnswerLocked] = useState(false)

	useEffect(() => {
		if (selectedAnswer !== null || showResult || currentIndex >= quizVocab.length || answerLocked) return
	
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

  const currentItem = quizVocab[currentIndex]

  const options = useMemo(() => {
		if (!currentItem) return []

    const correct = currentItem.english
    const wrong = quizVocab
      .map(v => v.english)
      .filter(e => e !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    const all = [...wrong, correct].sort(() => 0.5 - Math.random())
    return all
  }, [currentItem?.english, quizVocab])

	if (!lesson || quizVocab.length === 0) {
		return <p>Lesson not found or empty.</p>
	}

	function generateQuizVocab() {
		if (!lesson?.vocab) return []
		return [...lesson.vocab].sort(() => 0.5 - Math.random()).slice(0, 10)
	}

	const correctAudio = new Audio(`${import.meta.env.BASE_URL}sounds/correct.mp3`)
	const wrongAudio = new Audio(`${import.meta.env.BASE_URL}sounds/wrong.mp3`)

	const handleAnswer = (answer: string | null) => {
		if (answerLocked) return // ✅ prevent double triggers
		setAnswerLocked(true)
	
		const current = quizVocab[currentIndex]
		if (!current) return
	
		const isCorrect = answer === current.english
		setSelectedAnswer(answer)
		if (isCorrect) setScore((s) => s + 1)

		if (answer === null) {
			wrongAudio.play()
		} else {
			isCorrect ? correctAudio.play() : wrongAudio.play()
		}
	
		setTimeout(() => {
			const next = currentIndex + 1
			if (next < quizVocab.length) {
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
		setQuizVocab(generateQuizVocab())
		setCurrentIndex(0)
		setScore(0)
		setSelectedAnswer(null)
		setShowResult(false)
		setTimer(TIMER)
		setAnswerLocked(false)
	}

  return (
    <div className="min-h-screen bg-amazigh-blue/10 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 border border-amazigh-yellow">
        
				{!showResult ?  (
					<button
						onClick={() => navigate('/lessons')}
						className="text-sm text-red-600 hover:underline mb-4 ml-4"
					>
						⏹ Stop Quiz
					</button>
				) : <button
				onClick={() => navigate(-1)}
				className="text-sm text-amazigh-blue hover:underline mb-4"
			>
				← Back
			</button>}

        <h2 className="text-2xl font-bold mb-4 text-center text-amazigh-red">Quiz: {lesson.title}</h2>

        {showResult ? (
          <div className="text-center">
            <p className="text-lg mb-4 text-amazigh-green">
              You scored <strong>{score}</strong> out of <strong>{quizVocab.length}</strong>
            </p>
            <button
              onClick={resetQuiz}
              className="bg-amazigh-blue text-white px-6 py-2 rounded hover:bg-amazigh-green transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 font-medium">
                Question {currentIndex + 1} / {quizVocab.length}
              </p>
              <p className="text-amazigh-red font-mono text-sm">
                {timer > 0 ? `⏱ ${timer}s` : '⏱ Time’s up!'}
              </p>
            </div>

            <p className="text-lg mb-4 font-semibold text-center">
              What does <span className="text-amazigh-blue">"{currentItem?.kabyle}"</span> mean?
            </p>

            <div className="grid grid-cols-1 gap-4">
              {options.map((opt, idx) => {
                const isCorrect = opt === currentItem?.english
                const isSelected = selectedAnswer === opt
                let bg = 'bg-gray-100'

                if (selectedAnswer) {
                  if (isCorrect) bg = 'bg-amazigh-green/50'
                  else if (isSelected) bg = 'bg-amazigh-red/50'
                }

                return (
                  <button
                    key={idx}
                    disabled={!!selectedAnswer}
                    onClick={() => handleAnswer(opt)}
                    className={`${bg} border px-4 py-2 rounded text-left hover:bg-gray-200 transition disabled:opacity-70`}
                  >
                    {opt}
                    {selectedAnswer !== null && isCorrect && ' ✅'}
                    {selectedAnswer !== null && isSelected && !isCorrect && ' ❌'}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
