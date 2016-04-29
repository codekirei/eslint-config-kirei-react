'use strict'

// node modules ----------------------------------------------------------------

const assert = require('assert')

// npm modules -----------------------------------------------------------------

const diff = require('lodash.difference')
const jsxPlugin = require('eslint-plugin-jsx-a11y')
const reactPlugin = require('eslint-plugin-react')

// local modules ---------------------------------------------------------------

const localReact = require('../rules/react')
const localJsx = require('../rules/jsx-a11y')

// setup -----------------------------------------------------------------------

const getPluginRules = plugin => Object.keys(plugin.rules)
const getLocalPluginRules = plugin => getPluginRules(plugin).map(rule => rule.split('/')[1])

const localReactRules = getLocalPluginRules(localReact)
const reactRules = getPluginRules(reactPlugin)

const localJsxRules = getLocalPluginRules(localJsx)
const jsxRules = getPluginRules(jsxPlugin)

// cases -----------------------------------------------------------------------

exports['eslint-config-kirei-react'] = {

  'all react rules are configured': () => {
    assert.deepEqual(
      diff(reactRules, localReactRules),
      // unconfigured deprecated rules
      [
        'jsx-sort-prop-types',
      ]
    )
  },

  'only react rules are configured': () => {
    assert.deepEqual(diff(localReactRules, reactRules), [])
  },

  'all jsx-a11y rules are configured': () => {
    assert.deepEqual(diff(jsxRules, localJsxRules), [])
  },

  'only jsx-a11y rules are configured': () => {
    assert.deepEqual(diff(localJsxRules, jsxRules), [])
  },

}
