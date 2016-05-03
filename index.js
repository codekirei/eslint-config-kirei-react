'use strict'

// modules ---------------------------------------------------------------------

const a11yRules = require('./rules/jsx-a11y')
const reactRules = require('./rules/react')

// config ----------------------------------------------------------------------

module.exports = {
  extends: 'kirei-es6',
  plugins: [
    'jsx-a11y',
    'react',
  ],
  rules: Object.assign(
    {},
    a11yRules,
    reactRules
  ),
  a11yRules,
  reactRules,
}
