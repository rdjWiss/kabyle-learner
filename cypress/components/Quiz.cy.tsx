import { MemoryRouter, Route, Routes } from 'react-router-dom'
import QuizPage from '../../src/pages/Quiz'
import { lessons } from '../../src/data/lessons'

describe('<QuizPage />', () => {
	const sampleLesson = lessons[0]

	it('renders a quiz for the given lesson and shows question', () => {
		cy.mount(
			<MemoryRouter initialEntries={[`/quiz/${sampleLesson.id}`]}>
				<Routes>
					<Route path="/quiz/:id" element={<QuizPage />} />
				</Routes>
			</MemoryRouter>
		)

		cy.contains(`Quiz: ${sampleLesson.title}`).should('exist')
		cy.contains('What does').should('exist')
	})

	it('selects an answer and shows feedback', () => {
		cy.mount(
			<MemoryRouter initialEntries={['/quiz/greetings']}>
				<Routes>
					<Route path="/quiz/:id" element={<QuizPage />} />
				</Routes>
			</MemoryRouter>
		)

		cy.get('[data-cy=stop-quiz]').should('exist')

		cy.get('[data-cy=quiz-option]').first().click()

		cy.get('[data-cy=quiz-option]').should(($buttons) => {
			const feedbackShown = [...$buttons].some(btn =>
				btn.textContent?.includes('✅') || btn.textContent?.includes('❌')
			)
			expect(feedbackShown).to.be.true
		})
	})

	it('resets the quiz with Try Again button', () => {
		cy.mount(
			<MemoryRouter initialEntries={['/quiz/greetings']}>
				<Routes>
					<Route path="/quiz/:id" element={<QuizPage />} />
				</Routes>
			</MemoryRouter>
		)

		// Simulate completing the quiz
		for (let i = 0; i < 10; i++) {
			cy.get('[data-cy=quiz-option]').first().click()
			cy.wait(300)
		}

		cy.get('[data-cy=try-again]').click()

		cy.get('[data-cy=quiz-option]').should('exist')
	})
})
