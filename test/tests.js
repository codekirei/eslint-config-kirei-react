'use strict'

// node modules ----------------------------------------------------------------

const fs = require('fs')
const path = require('path')
const assert = require('assert')

// node modules ----------------------------------------------------------------

const diff = require('lodash.difference')

// local modules ---------------------------------------------------------------

const kireiReactRules = Object.keys(require('../rules/react').rules)
  .map(rule => rule.split('/')[1])
const kireiJsxRules = Object.keys(require('../rules/jsx-a11y').rules)
  .map(rule => rule.split('/')[1])

// setup -----------------------------------------------------------------------

let reactRules
let jsxRules

// cases -----------------------------------------------------------------------

exports['eslint-config-kirei-react'] = {

  'before': () => {
    reactRules = fs.readdirSync('./node_modules/eslint-plugin-react/lib/rules')
      .map(rule => path.basename(rule, '.js'))

    jsxRules = fs.readdirSync('./node_modules/eslint-plugin-jsx-a11y/lib/rules')
      .map(rule => path.basename(rule, '.js'))
  },

  'all react rules are configured': () => {
    assert.deepEqual(diff(reactRules, kireiReactRules), ['jsx-sort-prop-types'])
  },

  'only react rules are configured': () => {
    assert.deepEqual(diff(kireiReactRules, reactRules), [])
  },

  'all jsx-a11y rules are configured': () => {
    assert.deepEqual(diff(jsxRules, kireiJsxRules), [])
  },

  'only jsx-a11y rules are configured': () => {
    assert.deepEqual(diff(kireiJsxRules, jsxRules), [])
  },

}
