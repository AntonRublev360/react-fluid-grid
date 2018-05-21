import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
const { peerDependencies } = require('./package.json')

export default {
  input: 'src/FluidGrid',
  plugins: [
    resolve({
      jsnext: true,
      extensions: ['.js', '.jsx']
    }),
    babel({
      ignore: [
        'node_modules/**'
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            loose: true
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from'
      ],
      babelrc: false
    }),
    commonjs()
  ],
  output: [
    { file: 'dist/index.cjs.js', format: 'cjs', exports: 'named' },
    { file: 'dist/index.es.js', format: 'es', exports: 'named' }
  ],
  external: id => Object.keys(peerDependencies).includes(id)
}
