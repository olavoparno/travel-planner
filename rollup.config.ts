import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import sass from 'rollup-plugin-sass'
import copyPlugin from 'rollup-copy-plugin';
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const pkg = require('./package.json')
const libraryName = 'index'

export default {
  input: `src/${libraryName}.tsx`,
  output: [
    {
      file: pkg.main,
      name: libraryName,
      format: 'iife',
      sourcemap: true
    }
  ],
  external: [],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  },
  plugins: [
    sass({
      output: 'build/bundle.css'
    }),
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PureComponent', 'createElement'],
        'node_modules/react-dom/index.js': ['render', 'createPortal', 'findDOMNode']
      }
    }),
    resolve({
      jsnext: true,
      preferBuiltins: true,
      browser: true
    }),
    sourceMaps(),
    copyPlugin({
        'public/index.html': 'build/index.html',
        'public/favicon.ico': 'build/favicon.ico'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    serve('build'),
    livereload()
  ],
}
