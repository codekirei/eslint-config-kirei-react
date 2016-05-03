'use strict'

// modules ---------------------------------------------------------------------

// npm
const assert = require('assert')

// node
const a11yPlugin = require('eslint-plugin-jsx-a11y')
const diff = require('lodash.difference')
const eslint = require('eslint')
const reactPlugin = require('eslint-plugin-react')

// local
const reactConf = require('..')

// setup -----------------------------------------------------------------------

const getPluginRules = plugin => Object.keys(plugin.rules)
const getConfRules = rules => Object.keys(reactConf[rules]).map(rule => rule.split('/')[1])

const reactRules = getPluginRules(reactPlugin)
const reactConfRules = getConfRules('reactRules')

const a11yRules = getPluginRules(a11yPlugin)
const a11yConfRules = getConfRules('a11yRules')

// cases -----------------------------------------------------------------------

exports['eslint-config-kirei-react'] = {

  'all react rules are configured': () => {
    assert.deepEqual(
      diff(reactRules, reactConfRules),
      // unconfigured deprecated rules
      [
        'jsx-sort-prop-types',
      ]
    )
  },

  'only react rules are configured': () => {
    assert.deepEqual(diff(reactConfRules, reactRules), [])
  },

  'all jsx-a11y rules are configured': () => {
    assert.deepEqual(diff(a11yRules, a11yConfRules), [])
  },

  'only jsx-a11y rules are configured': () => {
    assert.deepEqual(diff(a11yConfRules, a11yRules), [])
  },

  'config does not throw': () => {
    const linter = new eslint.CLIEngine({
      useEslintrc: false,
      configFile: './index.js',
    })
    assert.doesNotThrow(() => linter.executeOnText(''))
  },

}
