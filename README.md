# Netlify CMS Widget Starter Rollup

A boilerplate for creating Netlify CMS widgets.

## Feature

* umd, commonjs and es6 module bundle.
* using global `createClass` and `h` functions from `netlify-cms` in umd bundle.
* remove `PropTypes` and `ImmutablePropTypes` in umd bundle.

## Getting Started

Clone or [download](https://github.com/ekoeryanto/netlify-cms-widget-starter-rollup/archive/master.zip) this repository, then install depedencies.

```bash
git clone https://github.com/ekoeryanto/netlify-cms-widget-starter-rollup.git project

cd project

npm ci
```

## Development

Run npm `start` script

```bash
npm start
```

Open http://localhost:10001 in your browser and it will reload whenever file in `src` changes.

## Tips

Use es5 class component (`create-react-class`) instead of es6 for small bundle size if you plan to use the widget with _script tag method / umd_ as we'll borrow the global `window.createClass` and `window.h` from `netlify-cms` in umd bundle

## License

MIT
