//  Copyright 2018, Venkat Peri.
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to permit
//  persons to whom the Software is furnished to do so, subject to the
//  following conditions:
//
//  The above copyright notice and this permission notice shall be included
//  in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
//  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
//  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
//  USE OR OTHER DEALINGS IN THE SOFTWARE.

const exec = require( 'child_process' ).exec;
const path = require( 'path' );
const { readdirp } = require( './index' )

function npmInstall( packages, opts = {} ) {
  if ( packages.length === 0 || !packages || !packages.length ) {
    return Promise.reject( 'No packages found' );
  }

  if ( typeof packages === 'string' ) packages = [packages];

  const cmdString = 'npm install '
    + packages.join( ' ' ) + ' '
    + (opts.global ? ' -g' : '')
    + (opts.save ? ' --save' : '')
    + (opts.saveDev ? ' --save-dev' : '')
    + (opts.legacyBundling ? ' --legacy-bundling' : '')
    + (opts.noOptional ? ' --no-optional' : '')
    + (opts.ignoreScripts ? ' --ignore-scripts' : '');

  console.log(cmdString)
  return new Promise( function ( resolve, reject ) {
    const cmd = exec( cmdString, {
      cwd: opts.cwd ? opts.cwd : '/',
      maxBuffer: opts.maxBuffer ? opts.maxBuffer : 200 * 1024,
    }, ( error ) => {
      if ( error ) {
        reject( error );
      } else {
        resolve( true );
      }
    } );

    if ( opts.output ) {
      cmd.stdout.pipe( process.stdout );
      cmd.stderr.pipe( process.stderr );
    }
  } );
}

function installDeps( modules ) {
  let deps = ['webpack', 'webpack-cli', 'webpack-chain']
  for ( let m of modules ) {
    let c = require( `../${m}` )
    if ( c.__deps )
      deps.push( ...c.__deps )
  }

  // console.log( `Installing ${deps.join( ', ' )}` )
  return npmInstall( deps, {
    saveDev: true,
    verbose:true,
    output: true,
    cwd: path.resolve( __dirname, '../..' ),
  } )
}

async function run() {
  try {
    let files = await readdirp( path.resolve( __dirname, '..' ) )
    const list = files.filter( file => !file.startsWith( '_' ) && file.endsWith( '.js' ) && file !== 'index.js' )
    let res = await installDeps( list )
    console.log( res )
  } catch ( e ) {
    console.log( e )
  }
}


module.exports = run()
