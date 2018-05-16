import igniter from 'module-igniter';
import { mapValues } from 'lodash';

import pkg from './package.json';

const plug = igniter({ prefix: 'rollup-plugin-' });
const environment = process.env.NODE_ENV || 'development';
const prod = environment === 'production';
const watch = process.env.ROLLUP_WATCH;

const globals = {
  'netlify-cms': 'CMS',
  'create-react-class': 'createClass',
};
const external = Object.keys(globals);
const WATCH_FORMAT = process.env.WATCH_FORMAT || 'umd';
const formats = ['umd', 'iife', 'cjs', 'es'];
const isBrowser = format => format === 'umd' || format === 'iife';
const createOutput = (format = 'umd') => ({
  sourcemap: prod,
  name: pkg.library || pkg.name,
  file: `lib/${format}/index.${prod ? 'min.js' : 'js'}`,
  format,
  globals: format === 'iife' ? mapValues(globals, o => `window['${o}']`) : globals,
});

export default (watch ? [WATCH_FORMAT] : formats).map(format => ({
  input: 'src/index.js',
  output: createOutput(format),
  external,
  plugins: [
    ...plug({
      replace: { 'process.env.NODE_ENV': JSON.stringify(environment) },
      'node-resolve': true,
      commonjs: {
        include: ['node_modules/**'],
      },
      babel: {
        exclude: ['node_modules/**'],
        plugins: [
          isBrowser(format) && [
            'transform-react-jsx',
            {
              pragma: 'h',
            },
          ],
          isBrowser(format) && [
            'transform-react-remove-prop-types',
            {
              removeImport: true,
              additionalLibraries: ['react-immutable-proptypes'],
            },
          ],
        ].filter(Boolean),
      },
      postcss: {
        sourcemap: prod,
        minimize: prod,
      },
    }),
    ...plug('strip', 'uglify', prod),
    ...plug(
      {
        serve: {
          contentBase: ['public', `lib/${WATCH_FORMAT}`],
          historyApiFallback: true,
        },
        livereload: true,
      },
      watch,
    ),
  ],
}));
