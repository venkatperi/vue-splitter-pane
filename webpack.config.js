const path = require( 'path' )
const run = require( './webpack' )

const modules = [
  'vue',
  'ts',
  'style',
  'img',
  'ext',
  'devServer',
  'misc',
  'dev',
  'prod',
  'hardSource',
  // 'analyze',
]
const variants = ['lib', 'umd']

module.exports = run( variants, modules, ( config ) => {
  config
    .entry( 'vue-splitter-pane' )
    .add( './src/index.ts' )

  config.output
    .path( path.resolve( __dirname, './dist' ) );
} )

