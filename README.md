# Netlify CMS Widget Starter Rollup

A boilerplate for creating Netlify CMS widgets.

## Feature

* umd, iife, commonjs and es6 module bundle.
* using global `createClass` and `h` functions from `netlify-cms` in browser module ^.
* remove `PropTypes` and `ImmutablePropTypes` in browser module ^.

_^ `umd` and `iife`_
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

Use es5 class component (`create-react-class`) instead of es6 for small bundle size if you plan to use the widget with _script tag method_ as we'll borrow the global `window.createClass` and `window.h` from `netlify-cms` in umd or iife bundle

## License

MIT
