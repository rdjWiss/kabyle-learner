import { MemoryRouter } from 'react-router-dom'
import Lessons from '../../src/pages/Lessons'
import { lessons } from '../../src/data/lessons'

describe('<Lessons />', () => {
	it('renders all lesson titles', () => {
		cy.mount(
			<MemoryRouter>
				<Lessons />
			</MemoryRouter>
		)

		lessons.forEach((lesson) => {
			cy.contains(lesson.title).should('exist')
		})
	})

	it('has a back button to home', () => {
		cy.mount(
			<MemoryRouter>
				<Lessons />
			</MemoryRouter>
		)

		cy.contains('← Back').should('have.text', '← Back')
	})

	it('renders "View Lesson" and "Take Quiz" links for each lesson', () => {
		cy.mount(
			<MemoryRouter>
				<Lessons />
			</MemoryRouter>
		)

		cy.get('a').contains('View Lesson').should('have.length', lessons.length)
		cy.get('a').contains('Take Quiz').should('have.length', lessons.length)
	})
})
