const {defineConfig} = require('cypress')
const path = require('path')

module.exports = defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
		indexHtmlFile: 'cypress/support/component-index.html',
	},
})
