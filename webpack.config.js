const path = require( 'path' )
const { run } = require( '@venkatperi/webpack-helper' )

const modules = [
  'mode',
  'vue',
  'ts',
  ['style', {
    cssLoader: {
      modules: true,
      localIdentName: '[folder]-[name]-[local]',
    },
  }],
  'img',
  'ext',
  'devServer',
  'misc',
  'dev',
  'prod',
]
const variants = [
  'cjs',
  'umd',
]

let cwd = __dirname

module.exports = run( { variants, modules, cwd }, ( config ) => {
  config
    .entry( 'vue-splitter-pane' )
    .add( './src/index.ts' )

  config.output
    .path( path.resolve( __dirname, './dist' ) );

} )

