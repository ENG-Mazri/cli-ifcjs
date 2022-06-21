import resolve from '@rollup/plugin-node-resolve';
import css from'rollup-plugin-css-only'
export default {
  input: './src/index.js',
  output: [
    {
      format: 'esm',
      file: './dist/bundle.js',
      inlineDynamicImports: true
    },
  ],
  plugins: [
    resolve(),
    css({output:'bundle.css'})
  ]
};