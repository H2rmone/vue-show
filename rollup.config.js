import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default {
  entry: 'docs/src/main.js',
  dest: 'docs/dist/build.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    vue({
      compileTemplate: true,
      css: 'docs/dist/build.css',
    }),
    babel(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: [ '.js', '.vue' ],
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    livereload(),
    serve({
      contentBase: 'docs',
      port: '6027',
      open: true,
    }),
  ]
}
