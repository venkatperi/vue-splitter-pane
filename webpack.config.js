const Config = require( 'webpack-chain' )
const path = require( 'path' )
const { inspect } = require( 'util' )

function base() {
  const config = new Config()

  config
    .entry( 'vue-splitter-pane' )
    .add( './src/index.ts' )

  config.output
    .path( path.resolve( __dirname, './dist' ) );

  [
    'vue',
    'ts',
    'style',
    'img',
    'ext',
    'devServer',
    'misc',
    'dev',
    'prod',
    // 'hardSource',
    // 'analyze',
  ].forEach( x => require( `./webpack/${x}` )( config ) );

  return config
}

let configs = [
  'lib',
  'umd'
].map( x => {
  let c = base()
  require( `./webpack/${x}` )( c )
  return c
} )

let cfg = configs.map( x => x.toConfig() )
// console.log( inspect( cfg, { depth: 10, colors: true } ) )
module.exports = cfg
