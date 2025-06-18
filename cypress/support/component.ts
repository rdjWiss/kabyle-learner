import { mount } from 'cypress/react'
import '../../src/index.css' // Make sure Tailwind styles are loaded

Cypress.Commands.add('mount', mount)

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount
		}
	}
}
