import { MemoryRouter } from 'react-router-dom'
import Home from '../../src/pages/Home'

describe('<Home />', () => {
	it('shows the welcome message', () => {
		cy.mount(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		)
		cy.contains('Welcome to Kabyle Learner')
		cy.get('a').should('have.attr', 'href', '/lessons')
	})
})
