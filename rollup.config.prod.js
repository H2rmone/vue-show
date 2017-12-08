import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: './src/index.js',
  name: 'vue-show',
  output: {
    file: './dist/index.js',
    format: 'umd',
  },
  plugins: [
    babel(),
    uglify(),
  ],
}
