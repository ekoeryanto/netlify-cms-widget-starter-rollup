import resolvePlugin from 'rollup-plugin-node-resolve';
import commonJsPlugin from 'rollup-plugin-commonjs';
import babelPlugin from 'rollup-plugin-babel';
import replacePlugin from 'rollup-plugin-replace';
import stripPlugin from 'rollup-plugin-strip';
import postcssPlugin from 'rollup-plugin-postcss';
import uglifyPlugin from 'rollup-plugin-uglify';
import servePlugin from 'rollup-plugin-serve';
import livereloadPlugin from 'rollup-plugin-livereload';

import pkg from './package.json';

const environment = process.env.NODE_ENV || 'development';
const prod = environment === 'production';
const watch = process.env.ROLLUP_WATCH;

const globals = {
  'netlify-cms': 'CMS',
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  immutable: 'Immutable',
  'react-immutable-proptypes': 'ImmutablePropTypes',
  'create-react-class': 'createClass',
};

const external = Object.keys(globals);

const formats = watch ? ['umd'] : ['umd', 'cjs', 'es'];

const createOutput = (format = 'umd') => ({
  sourcemap: prod,
  name: pkg.library || pkg.name,
  file: `lib/${format}/${pkg.name}.${prod ? 'min.js' : 'js'}`,
  format,
  globals,
});

const withPropTypes = format => format === 'umd';

export default formats.map(format => ({
  input: 'src/index.js',
  output: createOutput(format),
  external,
  plugins: [
    replacePlugin({
      'process.env.NODE_ENV': JSON.stringify(environment),
    }),
    resolvePlugin(),
    commonJsPlugin({
      include: ['node_modules/**'],
    }),
    babelPlugin({
      exclude: ['node_modules/**'],
      plugins: [
        withPropTypes(format) && [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
            additionalLibraries: ['react-immutable-proptypes'],
          },
        ],
      ].filter(Boolean),
    }),
    postcssPlugin({
      sourcemap: prod,
      minimize: prod,
    }),
  ]
    .concat(prod ? [stripPlugin(), uglifyPlugin()] : [])
    .concat(watch ? [servePlugin({ contentBase: ['public', 'lib/umd'] }), livereloadPlugin()] : []),
}));
