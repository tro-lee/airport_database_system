import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['/components/ui/*'],
}, {
  rules: {
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'style/max-statements-per-line': 'off',
    'curly': 'off',
  },
})
