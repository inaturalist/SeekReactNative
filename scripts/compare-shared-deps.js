const fs = require( "fs" );
const chalk = require( "chalk" );

// === Load package.json files ===
const seek = JSON.parse( fs.readFileSync( "../package.json", "utf-8" ) );
const inat = JSON.parse( fs.readFileSync( "./package.json", "utf-8" ) );

// === Combine dependencies and devDependencies ===
const mergeDeps = ( pkg ) => ( {
  ...pkg.dependencies,
  ...pkg.devDependencies
} );

const seekDeps = mergeDeps( seek );
const inatDeps = mergeDeps( inat );

// === Find shared dependencies and compare versions ===
const sharedDeps = Object.keys( seekDeps ).filter( ( dep ) => inatDeps[dep] );

console.log( chalk.bold( "\n📦 Shared dependencies between Seek and iNat:\n" ) );
console.log(
  `${" ".repeat( 2 )}${chalk.bold( "Match" )}  ${chalk.bold( "Package".padEnd( 35 ) )}  ${chalk.bold( "Seek Version".padEnd( 15 ) )}  ${chalk.bold( "iNat Version" )}`
);

sharedDeps.sort().forEach( ( dep ) => {
  const seekVer = seekDeps[dep];
  const inatVer = inatDeps[dep];
  const isMatch = seekVer === inatVer;
  const mark = isMatch ? chalk.green( "✓" ) : chalk.red( "✗" );
  const seekOut = isMatch ? chalk.green( seekVer ) : chalk.red( seekVer );
  const inatOut = isMatch ? chalk.green( inatVer ) : chalk.red( inatVer );

  console.log(
    `${" ".repeat( 2 )}${mark}    ${dep.padEnd( 35 )}  ${seekOut.padEnd( 15 )}  ${inatOut}`
  );
} );
