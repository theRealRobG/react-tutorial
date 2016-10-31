# React Tutorial

This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).

I have used this example to convert a small React app into TypeScript,
so as to see the various difficulties that might arise in doing so.
I've documented some gotchas I came across below.

## To use
Run
```
npm start
```

## TS + React + Webpack Setup Gotchas

#### Webpack config `resolve.extensions`
You will need to include `.ts` and `.tsx` in the `resolve.extensions` of the `webpack.config.js`.
This is so that `ts` and `tsx` files will be included when resolving modules.
Your `resolve.extensions` will at least look like this:
```js
resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
}
```

#### Webpack necessary loaders
You will need a couple of loaders for Webpack:
  - `babel-loader` for compiling down from es6 to es5
  - `ts-loader` for compiling TypeScript into es6

It is important to include the `ts-loader` after the `babel-loader` in the loaders array.
i.e.
```js
{test: /\.ts(x?)$/, exclude: /node_modules/, loaders: ['babel', 'ts-loader']}
```
This is because if it is included as `['ts-loader', 'babel']`,
it will run the code through the `babel-loader` first and obviously confuse everything.

#### Babel config and necessary presets
You will need to have a `.babelrc` file with at least the following presets:
  - `react` ( run `npm i babel-preset-react` )
  - `es2015` ( run `npm i babel-preset-es2015` )

The `.babelrc` file should include at least this:
```js
{
    "presets": [
        "react",
        "es2015"
    ]
}
```

#### TypeScript config
You will need a `tsconfig.json` file.
There are some gotchas specifically related to this.
The following properties need to be considered and/or included.
I have given an example setting for each.

### `jsx`
```json
"jsx": "react"
```
The possible options are `react` or `preserve`.
Documentation can be found [here](https://www.typescriptlang.org/docs/handbook/jsx.html)
Basically, this decides whether TS will compile React tags to the react specific method calls,
or whether it will leave the tag notation as is for another compiler to sort out.

### `allowSyntheticDefaultImports`
```json
"allowSyntheticDefaultImports": true
```
This allows default imports from modules with no default export.
This does not affect code emit, just typechecking.

It is useful to set this to true,
as the React module from NPM does not have a default export at the time of writing.

### `module`
```json
"module": "es6"
```
The module style you're using.
I prefer es6 style modules.

### `target`
```json
"target": "es6"
```
Tis sets the target version of JS to compile to.

I let Babel compile from es6 to es5.
I believe it does a better job.
