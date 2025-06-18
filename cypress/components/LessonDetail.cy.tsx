import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LessonDetail from '../../src/pages/LessonDetail'
import { lessons } from '../../src/data/lessons'

describe('<LessonDetail />', () => {
	const sampleLesson = lessons[0]

	it('renders the lesson detail with vocab and examples', () => {
		cy.mount(
			<MemoryRouter initialEntries={[`/lessons/${sampleLesson.id}`]}>
				<Routes>
					<Route path="/lessons/:id" element={<LessonDetail />} />
				</Routes>
			</MemoryRouter>
		)

		cy.contains(sampleLesson.title).should('exist')

		sampleLesson.vocab.forEach((word) => {
			cy.contains(word.kabyle).should('exist')
			cy.contains(word.english).should('exist')
		})

		sampleLesson.examples.forEach((ex) => {
			cy.contains(ex).should('exist')
		})
	})

	it('shows "Start Quiz" and "Back" buttons', () => {
		cy.mount(
			<MemoryRouter initialEntries={[`/lessons/${sampleLesson.id}`]}>
				<Routes>
					<Route path="/lessons/:id" element={<LessonDetail />} />
				</Routes>
			</MemoryRouter>
		)

		cy.contains('← Back').should('exist')
		cy.contains('Start Quiz').should('exist')
	})

	it('shows error message for invalid lesson ID', () => {
		cy.mount(
			<MemoryRouter initialEntries={['/lessons/invalid-id']}>
				<Routes>
					<Route path="/lessons/:id" element={<LessonDetail />} />
				</Routes>
			</MemoryRouter>
		)

		cy.contains('Lesson not found.').should('exist')
	})
})
