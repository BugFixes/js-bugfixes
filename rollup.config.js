import commonjs from '@rollup/plugin-commonjs'

const typescript = require('@rollup/plugin-typescript')
const {
  babel
} = require('@rollup/plugin-babel')
const pkg = require('./package.json')

const common = {
  external: [
    /@babel\/runtime/,
    /core-js/,
    /@bugfixes\//,
    'chalk'
  ]
}

module.exports = [
  {
    ...common,
    input: './src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [
      typescript(),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        extensions: [
          '.ts',
          '.tsx'
        ],
        presets: [
          [
            '@bugfxies',
            {
              useRuntimeESModules: false
            }
          ]
        ]
      })
    ]
  },
  {
    ...common,
    input: './src/index.ts',
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      typescript(),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        extensions: [
          '.ts',
          '.tsx'
        ],
        presets: [
          [
            '@bugfixes',
            {
              useRuntimeESModules: true
            }
          ]
        ]
      })
    ]
  }
]
