'use strict'

module.exports = {
  extends: [
    'kirei-es6',
    './rules/react',
    './rules/jsx-a11y',
  ].map(require.resolve),
}
